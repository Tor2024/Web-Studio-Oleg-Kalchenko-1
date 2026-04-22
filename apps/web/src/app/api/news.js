import {
  getNewsItems,
  addNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from '../../utils/storage.js';

export async function loader() {
  try {
    const items = await getNewsItems();
    const data = items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/news failed:', error);
    return Response.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function action({ request }) {
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
      await addNewsItem(body);
      return Response.json({ success: true }, { status: 201 });
    }

    if (method === 'PUT') {
      if (!body.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await updateNewsItem(body.folder_name, body);
      return Response.json({ success: true });
    }

    if (method === 'DELETE') {
      if (!body.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await deleteNewsItem(body.folder_name);
      return Response.json({ success: true });
    }
  } catch (error) {
    console.error(`${method} /api/news failed:`, error);
    return Response.json({ error: 'Request failed' }, { status: 500 });
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
