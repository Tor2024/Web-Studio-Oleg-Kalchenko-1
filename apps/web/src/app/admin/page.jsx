import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router";
import AdminList from "../../components/AdminList";
import EditorForm from "../../components/EditorForm";
import Header from "../../components/Header";
import { isAuthenticated } from "../../utils/auth.js";

const TABS = [
  { key: "news", label: "Новости" },
  { key: "portfolio", label: "Портфолио" },
];

export async function loader({ request }) {
  if (!isAuthenticated(request)) {
    throw redirect("/admin/login");
  }
  return null;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("news");
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function fetchAll() {
    setLoading(true);
    setError("");
    try {
      const endpoint = activeTab === "news" ? "/api/news" : "/api/portfolio";
      const response = await fetch(endpoint);
      if (response.status === 401) {
        navigate("/admin/login");
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      setItems(json.data || []);
      setShowEditor(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить список");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setShowEditor(true);
  }
  function handleCreate() {
    setEditing(null);
    setShowEditor(true);
  }

  async function handleDelete(folder_name) {
    const endpoint = activeTab === "news" ? "/api/news" : "/api/portfolio";
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_name }),
      });
      if (res.status === 401) {
        navigate("/admin/login");
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      fetchAll();
    } catch (err) {
      console.error(err);
      setError("Не удалось удалить запись");
    }
  }

  async function handleSave(obj) {
    const endpoint = activeTab === "news" ? "/api/news" : "/api/portfolio";
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (res.status === 401) {
        navigate("/admin/login");
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      fetchAll();
    } catch (err) {
      console.error(err);
      setError("Не удалось сохранить. Изменения на GitHub разворачиваются ~30–60 сек.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-10 px-2">
        <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
          <div className="flex gap-6">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`text-lg px-6 py-2 rounded-t bg-white shadow ${
                  activeTab === t.key
                    ? "border-b-4 border-blue-500 font-bold"
                    : "opacity-70"
                }`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Выйти
          </button>
        </div>
        {error ? (
          <div className="max-w-4xl mx-auto mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-200">
            {error}
          </div>
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
            type={activeTab}
          />
        )}
        {loading && (
          <div className="text-center mt-10">Загрузка...</div>
        )}
      </div>
    </div>
  );
}
