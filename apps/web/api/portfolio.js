import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../src/utils/fileStorage.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const portfolio = await getPortfolioItems();
      res.status(200).json({ data: portfolio.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) });
    } else if (req.method === 'POST') {
      const item = req.body;
      if (!item.folder_name) {
        res.status(400).json({ error: 'folder_name is required' });
        return;
      }
      await addPortfolioItem(item);
      res.status(201).json({ success: true });
    } else if (req.method === 'PUT') {
      const item = req.body;
      if (!item.folder_name) {
        res.status(400).json({ error: 'folder_name is required' });
        return;
      }
      await updatePortfolioItem(item.folder_name, item);
      res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
      const { folder_name } = req.body;
      if (!folder_name) {
        res.status(400).json({ error: 'folder_name is required' });
        return;
      }
      await deletePortfolioItem(folder_name);
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
}
