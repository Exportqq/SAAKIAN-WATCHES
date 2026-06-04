// composables/useAuth.ts
import { ref } from 'vue';
import { useApi } from './useApi';

interface IUser {
  id: string;
  username: string;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

export const useAuth = () => {
  const { request } = useApi();

  const user = ref<IUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isClient = typeof window !== 'undefined';

  const register = async (username: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      // register не возвращает токен — сразу логиним
      await request('/auth/register', {
        method: 'POST',
        body: { username, password },
      });

      return await login(username, password);
    } catch (e: any) {
      error.value = e?.data?.detail || 'Register failed';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      const res = await request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: { username, password },
      });

      user.value = res.user;

      if (isClient) {
        localStorage.setItem('token', res.token); // было res.access_token
        localStorage.setItem('user', JSON.stringify(res.user));
      }

      return res.user;
    } catch (e: any) {
      error.value = e?.data?.detail || 'Login failed';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const getMe = async () => {
    try {
      const token = isClient ? localStorage.getItem('token') : null;

      if (!token) return null;

      const res = await request<{ id: string }>('/auth/me');

      // Бэкенд возвращает только ID, поэтому берем остальные данные из localStorage
      if (import.meta.client) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          user.value = JSON.parse(savedUser);
        }
      }

      return user.value;
    } catch (e: any) {
      error.value = e?.data?.detail || 'Failed to fetch user';
      return null;
    }
  };

  const init = () => {
    if (isClient) {
      const u = localStorage.getItem('user');
      if (u) user.value = JSON.parse(u);
    }
  };

  const logout = () => {
    user.value = null;

    if (isClient) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return { user, loading, error, register, login, getMe, init, logout };
};
