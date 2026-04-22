import { useCallback, useState } from 'react';

// Uploads a File via the /api/upload resource route. On success returns { url }.
// On failure returns { error }. Loading state is exposed as [upload, { loading }].
export function useUpload() {
  const [loading, setLoading] = useState(false);
  const upload = useCallback(async (input) => {
    try {
      setLoading(true);
      if (!input || !input.file) return { error: 'No file provided' };
      const formData = new FormData();
      formData.append('file', input.file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        if (response.status === 401) return { error: 'Требуется вход в админку' };
        if (response.status === 413) return { error: 'Файл слишком большой' };
        return { error: 'Не удалось загрузить файл' };
      }
      const data = await response.json();
      return { url: data.url };
    } catch (err) {
      return { error: err?.message || 'Не удалось загрузить файл' };
    } finally {
      setLoading(false);
    }
  }, []);

  return [upload, { loading }];
}

export default useUpload;
