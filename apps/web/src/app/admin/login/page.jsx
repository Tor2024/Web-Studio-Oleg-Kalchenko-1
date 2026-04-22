import { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../../components/Header';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        navigate('/admin');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Не удалось войти');
    } catch (err) {
      setError('Сеть недоступна');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="font-caveat text-4xl text-center mb-6 text-[#2A2A2A]">
            Вход в админку
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="font-semibold block mb-1"
              >
                Пароль
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                autoComplete="current-password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2 font-mono"
                required
              />
            </div>
            {error ? (
              <div className="text-red-600 text-sm">{error}</div>
            ) : null}
            <button
              type="submit"
              disabled={submitting || password.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg py-2 font-semibold"
            >
              {submitting ? 'Проверяем...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
