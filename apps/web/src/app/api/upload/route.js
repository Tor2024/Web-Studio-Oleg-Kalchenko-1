import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function action({ request }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file === 'string') {
      return Response.json({ error: 'No file' }, { status: 400 });
    }
    const ext = file.name.split('.').pop();
    const fileName = `img_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(join(UPLOAD_DIR, fileName), new Uint8Array(arrayBuffer));
    return Response.json({ url: `/uploads/${fileName}` }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
