import { useRef, useEffect, useCallback, useState } from 'react';
import { useUpload } from '../utils/useUpload';

export default function WysiwygEditor({ value, onChange }) {
  const ref = useRef();
  const [upload, { loading: uploading }] = useUpload();
  const lastValueRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (ref.current && value !== lastValueRef.current) {
      ref.current.innerHTML = value || '';
      lastValueRef.current = value;
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [value]);

  useEffect(() => {
    if (!value) {
      setUploadedImages([]);
      return;
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    const imgs = div.querySelectorAll('img');
    setUploadedImages(Array.from(imgs).map((img) => img.src));
  }, [value]);

  const insertImageAtCursor = useCallback(
    (url) => {
      const editor = ref.current;
      if (!editor) return;
      editor.focus();
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      img.style.width = '100%';
      img.style.height = 'auto';
      range.insertNode(img);
      range.setStartAfter(img);
      range.setEndAfter(img);
      selection.removeAllRanges();
      selection.addRange(range);
      setTimeout(() => {
        if (editor) onChange(editor.innerHTML);
      }, 0);
    },
    [onChange],
  );

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = async (e) => {
      const files = Array.from(e.target.files || []);
      setUploadError('');
      for (const file of files) {
        const res = await upload({ file });
        if (res.error) {
          setUploadError(res.error);
          continue;
        }
        insertImageAtCursor(res.url);
      }
    };
    input.click();
  };

  const deleteImage = useCallback(
    (url) => {
      if (!ref.current) return;
      const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const html = ref.current.innerHTML.replace(
        new RegExp(`<img[^>]*src="${escaped}"[^>]*>`, 'g'),
        '',
      );
      ref.current.innerHTML = html;
      onChange(html);
    },
    [onChange],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={uploading}
          className="font-caveat text-xl bg-[#2A2A2A] text-[#FEFEFE] px-4 py-1.5 rounded-lg hover:bg-[#FF6B6B] transition-colors disabled:opacity-50"
        >
          {uploading ? 'Загружаем…' : 'Вставить изображения'}
        </button>
        {uploadError && <span className="font-kalam text-red-600 text-sm">{uploadError}</span>}
      </div>

      {uploadedImages.length > 0 && (
        <div className="mb-4 p-3 bg-[#FAFAFA] rounded-lg border-2 border-[#2A2A2A]/20">
          <div className="font-kalam text-sm text-[#666] mb-2">
            Уже в тексте. Нажмите × чтобы удалить.
          </div>
          <div className="flex flex-wrap gap-2">
            {uploadedImages.map((url, index) => (
              <div key={`${url}-${index}`} className="relative">
                <img
                  src={url}
                  alt=""
                  className="w-20 h-20 object-cover rounded border-2 border-[#2A2A2A]"
                />
                <button
                  type="button"
                  onClick={() => deleteImage(url)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B6B] text-white rounded-full text-sm leading-none"
                  aria-label="Удалить изображение"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        ref={ref}
        className="font-kalam min-h-[200px] border-2 border-[#2A2A2A] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          const html = e.currentTarget.innerHTML;
          lastValueRef.current = html;
          onChange(html);
        }}
      />
    </div>
  );
}
