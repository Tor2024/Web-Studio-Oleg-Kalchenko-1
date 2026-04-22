import { setAuthCookie } from '../../../utils/auth.js';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const password = typeof body?.password === 'string' ? body.password : '';
  if (!password) {
    return Response.json({ error: 'password is required' }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return Response.json(
      { error: 'ADMIN_PASSWORD is not configured on the server' },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return Response.json({ error: 'Неверный пароль' }, { status: 401 });
  }

  return Response.json(
    { success: true },
    { headers: { 'Set-Cookie': setAuthCookie() } }
  );
}
