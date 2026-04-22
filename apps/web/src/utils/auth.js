// Minimal cookie-based admin auth.
// Stores a value + HMAC-SHA256 signature in a single `admin_token` cookie.
// Validated by API write routes and by the /admin loader.

import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSION_VALUE = 'admin';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return secret;
}

function sign(value) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

function safeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
  } catch {
    return false;
  }
}

function readCookies(request) {
  const header = request.headers.get('cookie') || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

export function isAuthenticated(request) {
  try {
    const token = readCookies(request)[COOKIE_NAME];
    if (!token) return false;
    const [value, sig] = token.split('.');
    if (value !== SESSION_VALUE || !sig) return false;
    return safeEqualHex(sig, sign(value));
  } catch {
    return false;
  }
}

export function verifyPassword(attempt) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return String(attempt ?? '') === expected;
}

export function buildLoginCookie() {
  const value = SESSION_VALUE;
  const token = `${value}.${sign(value)}`;
  const attrs = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
  ];
  if (process.env.NODE_ENV === 'production') attrs.push('Secure');
  return attrs.join('; ');
}

export function buildLogoutCookie() {
  const attrs = [`${COOKIE_NAME}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (process.env.NODE_ENV === 'production') attrs.push('Secure');
  return attrs.join('; ');
}

// Used by loader functions on /admin to redirect unauthenticated users to login.
export function requireAuthRedirect(request) {
  if (isAuthenticated(request)) return null;
  return new Response(null, {
    status: 302,
    headers: { Location: '/admin/login' },
  });
}

// Used by action functions on write API routes to reject unauthenticated writes.
export function requireAuth(request) {
  if (isAuthenticated(request)) return null;
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
