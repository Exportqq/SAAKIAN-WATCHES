// src/composables/useAdminAuth.ts

const API_URL = 'https://saakianwatches-lilexport.amvera.io';

export const useAdminAuth = () => {
  const getRole = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  };

  const isAdmin = () => getRole() === 'admin';

  const adminLogin = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Неверные данные');

    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
  };

  return { isAdmin, getRole, adminLogin };
};
