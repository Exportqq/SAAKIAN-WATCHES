import { ref } from 'vue';
import { useApi } from './useApi';

interface IUser {
  id: string;
  username: string;
}

interface AuthResponse {
  user: IUser;
  access_token: string;
  token_type: string;
}

export const useAuth = () => {
  const { request } = useApi();

  const user = ref<IUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const register = async (username: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      const res = await request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: {
          username,
          password,
        },
      });

      user.value = res.user;

      if (import.meta.client) {
        localStorage.setItem('token', res.access_token);

        localStorage.setItem('user', JSON.stringify(res.user));
      }

      return res.user;
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
        body: {
          username,
          password,
        },
      });

      user.value = res.user;

      if (import.meta.client) {
        localStorage.setItem('token', res.access_token);

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
      const token = import.meta.client ? localStorage.getItem('token') : null;

      if (!token) return null;

      const res = await request<IUser>('/auth/me');

      user.value = res;

      return res;
    } catch (e: any) {
      error.value = e?.data?.detail || 'Failed to fetch user';

      return null;
    }
  };

  const init = () => {
    if (import.meta.client) {
      const u = localStorage.getItem('user');

      if (u) {
        user.value = JSON.parse(u);
      }
    }
  };

  const logout = () => {
    user.value = null;

    if (import.meta.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return {
    user,
    loading,
    error,

    register,
    login,
    getMe,

    init,
    logout,
  };
};
