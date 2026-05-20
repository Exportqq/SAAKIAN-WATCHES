import { ref } from 'vue';
import type { Watch } from './GetWatch';
import { useApi } from './useApi';

export interface BasketItem {
  cart_item_id: string;
  quantity: number;
  watch: Watch;
}

export const basket = ref<BasketItem[]>([]);
export const basketLoading = ref(false);
export const basketError = ref<string | null>(null);

export const useBasket = () => {
  const { request } = useApi();

  const getBasket = async () => {
    basketLoading.value = true;

    try {
      const res = await request<BasketItem[]>('/cart');
      basket.value = res;
      return res;
    } finally {
      basketLoading.value = false;
    }
  };

  const addToBasket = async (custom_id: string, quantity: number = 1) => {
    basketLoading.value = true;

    try {
      const res = await request('/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          custom_id,
          quantity,
        }),
      });

      await getBasket();
      return res;
    } finally {
      basketLoading.value = false;
    }
  };

  const removeFromBasket = async (custom_id: string) => {
    basketLoading.value = true;

    try {
      const res = await request(`/cart/remove/${custom_id}`, {
        method: 'DELETE',
      });

      basket.value = basket.value.filter((item) => item.watch.custom_id !== custom_id);

      return res;
    } finally {
      basketLoading.value = false;
    }
  };

  return {
    basket,
    basketLoading,
    basketError,

    getBasket,
    addToBasket,
    removeFromBasket,
  };
};
