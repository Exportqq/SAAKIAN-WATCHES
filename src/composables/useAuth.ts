// composables/useAuth.ts
import { ref } from 'vue';
import { useBasket } from './AddBasket';
import { useApi } from './useApi';

interface IUser {
  id: string;
  username: string;
}

// Бэкенд не выдаёт JWT — /auth/login возвращает только { user: {id, username} }.
// Поэтому в качестве "токена" в localStorage храним сам user.id
// и передаём его как user_id в запросах, которым он нужен (/auth/me, /cart, /orders...).
interface AuthResponse {
  user: IUser;
}

const isClient = typeof window !== 'undefined';

// ВАЖНО: состояние объявлено на уровне модуля, а не внутри useAuth().
// Так все компоненты и composable'ы (Header, useOrder, useBonus и т.д.)
// шарят один и тот же user — иначе каждый вызов useAuth() создавал
// свой изолированный ref(null), и заказы/бонусы "не видели" залогиненного
// пользователя, даже если он реально был авторизован в другом месте приложения.
export const user = ref<IUser | null>(null);
export const authLoading = ref(false);
export const authError = ref<string | null>(null);

export const useAuth = () => {
  const { request } = useApi();

  const register = async (username: string, password: string) => {
    try {
      authLoading.value = true;
      authError.value = null;

      // register не возвращает токен — сразу логиним
      await request('/auth/register', {
        method: 'POST',
        body: { username, password },
      });

      return await login(username, password);
    } catch (e: any) {
      const detail = e?.data?.detail;
      authError.value = detail === 'exists' ? 'Такой логин уже занят' : detail || 'Register failed';
      return null;
    } finally {
      authLoading.value = false;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      authLoading.value = true;
      authError.value = null;

      const res = await request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: { username, password },
      });

      user.value = res.user;

      if (isClient) {
        // token = user.id, поскольку сервер JWT не выдаёт
        localStorage.setItem('token', res.user.id);
        localStorage.setItem('user', JSON.stringify(res.user));
      }

      // Переносим товары, добавленные в корзину до входа, на сервер
      const { mergeGuestBasket } = useBasket();
      await mergeGuestBasket();

      return res.user;
    } catch (e: any) {
      const detail = e?.data?.detail;
      authError.value = detail === 'invalid' ? 'Неверный логин или пароль' : detail || 'Login failed';
      return null;
    } finally {
      authLoading.value = false;
    }
  };

  const getMe = async () => {
    try {
      const token = isClient ? localStorage.getItem('token') : null;

      if (!token) {
        user.value = null;
        return null;
      }

      // GET /auth/me требует user_id как обязательный query-параметр
      const res = await request<{ id: string; username: string }>(`/auth/me?user_id=${encodeURIComponent(token)}`);

      user.value = { id: res.id, username: res.username };

      if (isClient) {
        localStorage.setItem('user', JSON.stringify(user.value));
      }

      return user.value;
    } catch (e: any) {
      // token невалиден (например, пользователя удалили) — разлогиниваем
      authError.value = e?.data?.detail || 'Failed to fetch user';
      user.value = null;

      if (isClient) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      return null;
    }
  };

  const init = () => {
    if (user.value) return user.value; // уже восстановлено — не перетираем

    if (isClient) {
      const u = localStorage.getItem('user');
      if (u) user.value = JSON.parse(u);
    }

    return user.value;
  };

  const logout = () => {
    user.value = null;

    if (isClient) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return { user, loading: authLoading, error: authError, register, login, getMe, init, logout };
};
