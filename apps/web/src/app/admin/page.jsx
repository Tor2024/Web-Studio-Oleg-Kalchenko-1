import { useState } from 'react';
import { useNavigate } from 'react-router';
import AdminList from '../../components/AdminList';
import EditorForm from '../../components/EditorForm';
import Header from '../../components/Header';
import { useContentData } from '../../utils/useContentData';
import { requireAuthRedirect } from '../../utils/auth.js';

export async function loader({ request }) {
  return requireAuthRedirect(request) ?? null;
}

const TABS = [
  { key: 'news', label: 'Новости' },
  { key: 'portfolio', label: 'Портфолио' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('news');
  const [editing, setEditing] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [error, setError] = useState('');
  const { items, loading, refetch } = useContentData(activeTab);
  const navigate = useNavigate();

  async function refreshAndReset() {
    await refetch();
    setShowEditor(false);
    setEditing(null);
  }

  function handleEdit(item) {
    setEditing(item);
    setShowEditor(true);
    setError('');
  }

  function handleCreate() {
    setEditing(null);
    setShowEditor(true);
    setError('');
  }

  async function handleDelete(folder_name) {
    if (!confirm(`Удалить запись "${folder_name}"?`)) return;
    setError('');
    try {
      const response = await fetch(`/api/${activeTab}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_name }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Не удалось удалить запись');
        return;
      }
      await refreshAndReset();
    } catch (e) {
      setError(e.message || 'Сетевая ошибка при удалении');
    }
  }

  async function handleSave(obj) {
    setError('');
    const method = editing ? 'PUT' : 'POST';
    try {
      const response = await fetch(`/api/${activeTab}`, {
        method,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(obj),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Не удалось сохранить');
        return;
      }
      await refreshAndReset();
    } catch (e) {
      setError(e.message || 'Сетевая ошибка при сохранении');
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-caveat text-5xl text-[#2A2A2A]">Админка</h1>
            <p className="font-kalam text-[#666]">
              Сохранения коммитятся прямо в GitHub — через 20–60 сек Vercel обновит сайт.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="font-kalam border-2 border-[#2A2A2A] rounded-lg px-4 py-2 text-sm hover:bg-[#FF6B6B] hover:text-white transition-colors"
          >
            Выйти
          </button>
        </div>

        <div className="flex gap-3 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`font-caveat text-2xl px-5 py-2 rounded-lg border-2 border-[#2A2A2A] transition-colors ${
                activeTab === t.key
                  ? 'bg-[#2A2A2A] text-[#FEFEFE]'
                  : 'bg-white text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-[#FEFEFE]'
              }`}
              onClick={() => {
                setActiveTab(t.key);
                setShowEditor(false);
                setEditing(null);
                setError('');
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error ? (
          <p className="font-kalam text-red-600 mb-4">{error}</p>
        ) : null}

        {!showEditor ? (
          <AdminList
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            type={activeTab}
          />
        ) : (
          <EditorForm
            initialData={editing}
            onSave={handleSave}
            onCancel={() => {
              setShowEditor(false);
              setEditing(null);
            }}
            type={activeTab}
          />
        )}
        {loading && <div className="text-center mt-10 font-kalam">Загрузка…</div>}
      </div>
    </div>
  );
}
