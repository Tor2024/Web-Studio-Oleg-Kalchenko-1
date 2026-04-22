import { clearAuthCookie } from '../../../utils/auth.js';

export async function action() {
  return Response.json(
    { success: true },
    { headers: { 'Set-Cookie': clearAuthCookie() } }
  );
}
