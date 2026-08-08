import { ref } from 'vue';
import type { Watch } from './GetWatch';
import { useApi } from './useApi';
import { useAuth } from './useAuth';

export interface BasketItem {
  cart_item_id: string;
  quantity: number;
  watch: Watch;
}

export const basket = ref<BasketItem[]>([]);
export const basketError = ref<string | null>(null);

const GUEST_CART_KEY = 'guest_cart_v1';

interface GuestCartEntry {
  custom_id: string;
  quantity: number;
}

const isClient = typeof window !== 'undefined';

const readGuestCart = (): GuestCartEntry[] => {
  if (!isClient) return [];
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items: GuestCartEntry[]) => {
  if (!isClient) return;
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

export const useBasket = () => {
  const { request } = useApi();
  const { user } = useAuth();

  // Единственный источник правды об id пользователя — useAuth,
  // а не "Bearer токен", который бэкенд не проверяет
  const getUserId = () => user.value?.id ?? null;

  // GET /watches/{custom_id} отдаёт товар напрямую (не обёрнут в {items, total, has_more},
  // как это делает /watches?search=...) — поэтому используем именно его
  const findWatchByCustomId = async (custom_id: string): Promise<Watch | null> => {
    try {
      return await request<Watch>(`/watches/${encodeURIComponent(custom_id)}`);
    } catch {
      return null;
    }
  };

  const getGuestBasket = async () => {
    const entries = readGuestCart();

    const items: BasketItem[] = [];
    for (const entry of entries) {
      const watch = await findWatchByCustomId(entry.custom_id);
      if (watch) {
        items.push({
          cart_item_id: `guest-${entry.custom_id}`,
          quantity: entry.quantity,
          watch,
        });
      }
    }

    basket.value = items;
    return items;
  };

  const getBasket = async () => {
    const userId = getUserId();

    if (!userId) {
      return getGuestBasket();
    }

    try {
      // user_id обязателен как query-параметр
      const res = await request<BasketItem[]>(`/cart?user_id=${encodeURIComponent(userId)}`);
      basket.value = res;
      return res;
    } catch (e: any) {
      basketError.value = e.message;
    }
  };

  const addToGuestBasket = async (custom_id: string, quantity: number) => {
    const entries = readGuestCart();
    const existing = entries.find((e) => e.custom_id === custom_id);

    if (existing) {
      existing.quantity += quantity;
      if (existing.quantity <= 0) {
        writeGuestCart(entries.filter((e) => e.custom_id !== custom_id));
      } else {
        writeGuestCart(entries);
      }
    } else if (quantity > 0) {
      entries.push({ custom_id, quantity });
      writeGuestCart(entries);
    }

    await getGuestBasket();
  };

  const addToBasket = async (custom_id: string, quantity: number = 1) => {
    const userId = getUserId();

    if (!userId) {
      return addToGuestBasket(custom_id, quantity);
    }

    try {
      // CartDTO.user_id обязателен в теле запроса
      const res = await request('/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          custom_id,
          quantity,
          user_id: userId,
        }),
      });

      await getBasket();

      return res;
    } catch (e: any) {
      basketError.value = e.message;
    }
  };

  const removeFromGuestBasket = async (custom_id: string) => {
    const entries = readGuestCart().filter((e) => e.custom_id !== custom_id);
    writeGuestCart(entries);
    await getGuestBasket();
  };

  const removeFromBasket = async (custom_id: string) => {
    const userId = getUserId();

    if (!userId) {
      return removeFromGuestBasket(custom_id);
    }

    try {
      // user_id обязателен как query-параметр
      const res = await request(`/cart/remove/${custom_id}?user_id=${encodeURIComponent(userId)}`, {
        method: 'DELETE',
      });

      await getBasket();

      return res;
    } catch (e: any) {
      basketError.value = e.message;
    }
  };

  // Переносим гостевую корзину на сервер сразу после входа/регистрации
  const mergeGuestBasket = async () => {
    const userId = getUserId();
    if (!userId) return;

    const entries = readGuestCart();
    if (!entries.length) {
      await getBasket();
      return;
    }

    for (const entry of entries) {
      try {
        await request('/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            custom_id: entry.custom_id,
            quantity: entry.quantity,
            user_id: userId,
          }),
        });
      } catch (e) {
        // если конкретный товар не перенёсся (например, его уже нет в наличии) —
        // не прерываем перенос остальных позиций
        console.error('Guest cart merge item failed:', entry.custom_id, e);
      }
    }

    writeGuestCart([]);
    await getBasket();
  };

  return {
    basket,
    basketError,
    getBasket,
    addToBasket,
    removeFromBasket,
    mergeGuestBasket,
  };
};
