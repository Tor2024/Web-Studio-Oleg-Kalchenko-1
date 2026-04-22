import { useState, useRef } from 'react';
import WysiwygEditor from './WysiwygEditor';
import { useUpload } from '../utils/useUpload';

const LANGS = ['en', 'ru', 'de'];

const CATEGORIES = [
  { value: 'webDesign', label: 'Web Design' },
  { value: 'development', label: 'Development' },
  { value: 'branding', label: 'Branding' },
];

function emptyLangMap() {
  return { en: '', ru: '', de: '' };
}

export default function EditorForm({ initialData, onSave, onCancel, type }) {
  const data = initialData || {};
  const [cover, setCover] = useState(data.cover || '');
  const [title, setTitle] = useState(data.title || emptyLangMap());
  const [content, setContent] = useState(data.content || emptyLangMap());
  const [date, setDate] = useState(
    data.date || new Date().toISOString().substring(0, 10),
  );
  const [category, setCategory] = useState(data.category || 'webDesign');
  const [lang, setLang] = useState('ru');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const folderName = data.folder_name || null;
  const [upload] = useUpload();
  const coverInputRef = useRef(null);

  const imgCount = (content[lang].match(/<img /g) || []).length;

  async function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploadingCover(true);
    const res = await upload({ file });
    setUploadingCover(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setCover(res.url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!title.en || !title.ru || !title.de) {
      setError('Заполните названия на всех трёх языках');
      return;
    }
    if (!Object.values(content).some((v) => v.trim().length > 0)) {
      setError('Добавьте хотя бы один текст публикации');
      return;
    }
    setSaving(true);
    let newFolderName = folderName;
    if (!folderName) {
      const ts = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
      newFolderName = `${type}_${ts}`;
    }
    const obj = {
      folder_name: newFolderName,
      slug: newFolderName,
      cover,
      title,
      content,
      date,
      ...(type === 'portfolio' && { category }),
    };
    await onSave(obj);
    setSaving(false);
  }

  const fieldBox =
    'font-kalam w-full border-2 border-[#2A2A2A] rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-2xl p-6 md:p-8 relative"
      style={{
        boxShadow:
          '0 0 0 1.5px #2A2A2A, 3px 3px 0 1.5px #2A2A2A, 6px 6px 0 0 rgba(42,42,42,0.1)',
      }}
    >
      <h2 className="font-caveat text-3xl text-[#2A2A2A]">
        {folderName ? 'Редактировать' : 'Создать'}{' '}
        {type === 'news' ? 'новость' : 'работу портфолио'}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="font-kalam block mb-1">Дата</label>
          <input
            type="date"
            className={fieldBox}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {type === 'portfolio' && (
          <div>
            <label className="font-kalam block mb-1">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={fieldBox}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="font-kalam block mb-1">Обложка</label>
        <div className="flex items-start gap-4">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="font-kalam"
          />
          {uploadingCover && <span className="font-kalam text-sm text-[#666]">Загружаем…</span>}
        </div>
        {cover && (
          <img
            src={cover}
            alt="cover preview"
            className="mt-3 max-w-xs rounded-lg border-2 border-[#2A2A2A]"
          />
        )}
      </div>

      <div>
        <div className="flex gap-2 mb-2">
          {LANGS.map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setLang(l)}
              className={`font-caveat text-xl px-3 py-1 rounded-lg border-2 border-[#2A2A2A] transition-colors ${
                lang === l ? 'bg-[#2A2A2A] text-[#FEFEFE]' : 'bg-white text-[#2A2A2A]'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <label className="font-kalam block mb-1">Заголовок ({lang.toUpperCase()})</label>
        <input
          className={`${fieldBox} mb-4`}
          value={title[lang]}
          onChange={(e) => setTitle((t) => ({ ...t, [lang]: e.target.value }))}
        />
        <label className="font-kalam block mb-1">
          Текст ({imgCount}/5 изображений)
        </label>
        <WysiwygEditor
          value={content[lang]}
          onChange={(val) => {
            if ((val.match(/<img /g) || []).length <= 5) {
              setContent((c) => ({ ...c, [lang]: val }));
            }
          }}
        />
        <p className="font-kalam text-xs text-[#666] mt-1">
          Можно вставить не более 5 изображений в текст на каждом языке.
        </p>
      </div>

      {error && <p className="font-kalam text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploadingCover}
          className="font-caveat text-2xl bg-[#2A2A2A] text-[#FEFEFE] px-6 py-2 rounded-lg hover:bg-[#FF6B6B] transition-colors disabled:opacity-50"
        >
          {saving ? 'Сохраняем…' : 'Сохранить'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-caveat text-2xl border-2 border-[#2A2A2A] text-[#2A2A2A] px-6 py-2 rounded-lg hover:bg-[#2A2A2A] hover:text-[#FEFEFE] transition-colors"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}
