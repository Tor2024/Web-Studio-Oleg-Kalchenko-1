import { getItems, addItem, updateItem, deleteItem } from '../../../utils/fileStorage.js';

export async function loader() {
  try {
    const portfolio = await getItems('portfolio');
    const sorted = portfolio.sort(
      (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
    );
    return Response.json({ data: sorted });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return Response.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function action({ request }) {
  const method = request.method.toUpperCase();
  try {
    if (method === 'POST') {
      const item = await request.json();
      if (!item.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await addItem('portfolio', item);
      return Response.json({ success: true }, { status: 201 });
    }
    if (method === 'PUT') {
      const item = await request.json();
      if (!item.folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await updateItem('portfolio', item.folder_name, item);
      return Response.json({ success: true });
    }
    if (method === 'DELETE') {
      const { folder_name } = await request.json();
      if (!folder_name) {
        return Response.json({ error: 'folder_name is required' }, { status: 400 });
      }
      await deleteItem('portfolio', folder_name);
      return Response.json({ success: true });
    }
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    console.error('Error mutating portfolio:', error);
    return Response.json({ error: 'Failed to mutate portfolio' }, { status: 500 });
  }
}
