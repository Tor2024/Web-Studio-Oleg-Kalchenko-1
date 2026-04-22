import { uploadAsset } from '../../../utils/storage.js';
import { backendName } from '../../../utils/storage.js';
import { requireAuth } from '../../../utils/auth.js';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  const authError = await requireAuth(request);
  if (authError) return authError;
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file === 'string') {
      return Response.json({ error: 'No file' }, { status: 400 });
    }
    const ext = (file.name?.split('.').pop() || 'bin').toLowerCase();
    const fileName = `img_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const result = await uploadAsset({
      fileName,
      buffer: new Uint8Array(arrayBuffer),
    });
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      {
        error: 'Upload failed',
        backend: backendName(),
        detail: error?.message ?? String(error),
        status: error?.status ?? null,
      },
      { status: 500 },
    );
  }
}
