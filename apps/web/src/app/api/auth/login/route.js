import { verifyPassword, buildLoginCookie } from '../../../../utils/auth.js';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  let password;
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      const body = await request.json();
      password = body.password;
    } else {
      const form = await request.formData();
      password = form.get('password');
    }
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (!verifyPassword(password)) {
    return Response.json({ error: 'Неверный пароль' }, { status: 401 });
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': buildLoginCookie(),
    },
  });
}
