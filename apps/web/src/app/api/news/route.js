import { getNewsItems, addNewsItem, updateNewsItem, deleteNewsItem } from '../../../utils/fileStorage.js';

export async function GET() {
  try {
    const news = await getNewsItems();
    return new Response(JSON.stringify({ data: news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }), { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400 });
    }
    await addNewsItem(item);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error('Error adding news item:', error);
    return new Response(JSON.stringify({ error: 'Failed to add news item' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400 });
    }
    await updateNewsItem(item.folder_name, item);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error updating news item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update news item' }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { folder_name } = await req.json();
    if (!folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400 });
    }
    await deleteNewsItem(folder_name);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting news item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete news item' }), { status: 500 });
  }
}
