import { useState } from 'react';
import { useNavigate } from 'react-router';
import { isAuthenticated } from '../../../utils/auth.js';

export async function loader({ request }) {
  if (isAuthenticated(request)) {
    return new Response(null, { status: 302, headers: { Location: '/admin' } });
  }
  return null;
}

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Ошибка входа');
        return;
      }
      navigate('/admin');
    } catch {
      setError('Ошибка сети');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#FEFEFE]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl p-8 relative"
        style={{
          boxShadow:
            '0 0 0 1.5px #2A2A2A, 3px 3px 0 1.5px #2A2A2A, 6px 6px 0 0 rgba(42,42,42,0.1)',
        }}
      >
        <h1 className="font-caveat text-4xl text-[#2A2A2A] mb-1">Вход в админку</h1>
        <p className="font-kalam text-sm text-[#666] mb-6">
          Введите пароль, чтобы управлять новостями и портфолио.
        </p>
        <label htmlFor="password" className="font-kalam text-[#2A2A2A] block mb-2">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-kalam w-full border-2 border-[#2A2A2A] rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2"
        />
        {error ? (
          <p className="font-kalam text-red-600 mt-3 text-sm">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="font-caveat text-2xl mt-6 w-full bg-[#2A2A2A] text-[#FEFEFE] py-3 rounded-lg hover:bg-[#FF6B6B] transition-colors disabled:opacity-50"
        >
          {submitting ? 'Проверяем…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
