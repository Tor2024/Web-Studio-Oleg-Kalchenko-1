import { buildLogoutCookie } from '../../../../utils/auth.js';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': buildLogoutCookie(),
    },
  });
}
