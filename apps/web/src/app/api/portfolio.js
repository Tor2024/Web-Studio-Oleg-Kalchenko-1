import {
  getPortfolioItems,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '../../utils/storage.js';
import { isAuthenticated } from '../../utils/auth.js';

export async function loader() {
  try {
    const items = await getPortfolioItems();
    const data = items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/portfolio failed:', error);
    return Response.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function action({ request }) {
  if (!isAuthenticated(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const method = request.method.toUpperCase();

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    if (method === 'POST') {
      if (!body.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await addPortfolioItem(body);
      return Response.json({ success: true }, { status: 201 });
    }

    if (method === 'PUT') {
      if (!body.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await updatePortfolioItem(body.folder_name, body);
      return Response.json({ success: true });
    }

    if (method === 'DELETE') {
      if (!body.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await deletePortfolioItem(body.folder_name);
      return Response.json({ success: true });
    }
  } catch (error) {
    console.error(`${method} /api/portfolio failed:`, error);
    return Response.json({ error: 'Request failed' }, { status: 500 });
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
