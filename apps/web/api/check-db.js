import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  if (!type) {
    res.status(400).json({ error: 'Type required' });
    return;
  }
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      )
    `, [type]);
    const exists = result.rows[0].exists;
    res.status(200).json({ exists });
  } catch (error) {
    console.error('Error checking table:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
