import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file) {
      res.status(400).json({ error: "No file" });
      return;
    }

    // генерируем уникальное имя файла
    const ext = file.name.split('.').pop();
    const fileName = `img_${Date.now()}_${Math.floor(Math.random()*10000)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(join(UPLOAD_DIR, fileName), new Uint8Array(arrayBuffer));

    // отдаём URL (относительно сайта)
    res.status(200).json({
      url: `/uploads/${fileName}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}
