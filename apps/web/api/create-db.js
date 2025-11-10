import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { type } = req.body;
  if (!type) {
    res.status(400).json({ error: 'Type required' });
    return;
  }
  try {
    if (type === 'portfolio') {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS portfolio (
          id SERIAL PRIMARY KEY,
          title_en TEXT,
          title_ru TEXT,
          title_de TEXT,
          content_en TEXT,
          content_ru TEXT,
          content_de TEXT,
          cover TEXT,
          date DATE,
          folder_name TEXT UNIQUE
        )
      `);
    } else if (type === 'news') {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS news (
          id SERIAL PRIMARY KEY,
          title_en TEXT,
          title_ru TEXT,
          title_de TEXT,
          content_en TEXT,
          content_ru TEXT,
          content_de TEXT,
          cover TEXT,
          date DATE,
          folder_name TEXT UNIQUE
        )
      `);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
