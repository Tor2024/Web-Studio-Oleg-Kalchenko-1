import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  return process.env.AUTH_SECRET || 'dev-only-unsafe-secret-do-not-use-in-prod';
}

export function makeAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error('ADMIN_PASSWORD is not set');
  }
  return createHmac('sha256', getSecret()).update(password).digest('hex');
}

export function parseCookies(request) {
  const header = request.headers.get('cookie') || '';
  const out = {};
  for (const part of header.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    try {
      out[key] = decodeURIComponent(value);
    } catch {
      out[key] = value;
    }
  }
  return out;
}

export function isAuthenticated(request) {
  const cookies = parseCookies(request);
  const provided = cookies[COOKIE_NAME];
  if (!provided) return false;
  if (!process.env.ADMIN_PASSWORD) return false;
  try {
    const expected = makeAdminToken();
    const a = Buffer.from(provided, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length || a.length === 0) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function setAuthCookie() {
  const token = makeAdminToken();
  const isProd = process.env.NODE_ENV === 'production';
  const parts = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
  ];
  if (isProd) parts.push('Secure');
  return parts.join('; ');
}

export function clearAuthCookie() {
  return [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=0',
  ].join('; ');
}

export function requireAuth(request) {
  if (!isAuthenticated(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
