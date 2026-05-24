import { ref } from 'vue';
import type { Watch } from './GetWatch';
import { useApi } from './useApi';

export interface BasketItem {
  cart_item_id: string;
  quantity: number;
  watch: Watch;
}

export const basket = ref<BasketItem[]>([]);
export const basketError = ref<string | null>(null);

export const useBasket = () => {
  const { request } = useApi();

  const getBasket = async () => {
    try {
      const res = await request<BasketItem[]>('/cart');
      basket.value = res;
      return res;
    } catch (e: any) {
      basketError.value = e.message;
    }
  };

  const addToBasket = async (custom_id: string, quantity: number = 1) => {
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
    } catch (e: any) {
      basketError.value = e.message;
    }
  };

  const removeFromBasket = async (custom_id: string) => {
    try {
      const res = await request(`/cart/remove/${custom_id}`, {
        method: 'DELETE',
      });

      await getBasket();

      return res;
    } catch (e: any) {
      basketError.value = e.message;
    }
  };

  return {
    basket,
    basketError,
    getBasket,
    addToBasket,
    removeFromBasket,
  };
};
