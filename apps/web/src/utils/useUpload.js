import * as React from 'react';

function useUpload() {
  const [loading, setLoading] = React.useState(false);

  const upload = React.useCallback(async (input) => {
    try {
      setLoading(true);
      if (!input || !('file' in input) || !input.file) {
        return { error: 'Поддерживается только загрузка файла' };
      }
      const formData = new FormData();
      formData.append('file', input.file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        if (response.status === 413) {
          return { error: 'Файл слишком большой' };
        }
        return { error: 'Не удалось загрузить файл' };
      }
      const data = await response.json();
      return { url: data.url, mimeType: data.mimeType || null };
    } catch (err) {
      console.error('Upload error:', err);
      return {
        error: err instanceof Error ? err.message : 'Не удалось загрузить файл',
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return [upload, { loading }];
}

export { useUpload };
export default useUpload;
