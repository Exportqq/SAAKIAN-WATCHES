// src/composables/useOrder.ts
import { useBasket } from './AddBasket';
import { user } from './useAuth';
import { useGlobalLoader } from './useGlobalLoader';

const API_URL = 'https://saakianwatches-lilexport.amvera.io';

export const useOrder = () => {
  const { show, hide } = useGlobalLoader();
  const { basket } = useBasket();

  const createOrder = async (data: {
    delivery_type: string;
    address: string;
    phone: string;
    fio: string;
    comment?: string;
    use_bonus?: boolean;
  }) => {
    show();

    try {
      const body: Record<string, any> = {
        delivery_type: data.delivery_type,
        address: data.address,
        phone: data.phone,
        fio: data.fio,
        comment: data.comment || '',
        use_bonus: data.use_bonus ?? false,
      };

      // Бэкенд не проверяет Authorization-заголовок — единственный способ
      // связать заказ с пользователем это передать user_id прямо в теле.
      // Именно из-за отсутствия этого поля бонусы не начислялись:
      // заказ уходил "гостевым" (order.user_id = null), и бэкенд
      // физически не мог найти пользователя для начисления бонуса.
      if (user.value?.id) {
        body.user_id = user.value.id;
      } else {
        // Гость — своей серверной корзины нет, передаём позиции прямо в запросе
        body.items = basket.value.map((item) => ({
          custom_id: item.watch.custom_id,
          quantity: item.quantity,
        }));
      }

      console.log('Creating order with data:', body);

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      console.log('Order created:', result);

      if (!res.ok) {
        console.error('CREATE ORDER ERROR:', result);
        throw new Error(result?.detail || 'Ошибка создания заказа');
      }

      if (!user.value?.id && typeof window !== 'undefined') {
        localStorage.removeItem('guest_cart_v1');
      }
      basket.value = [];

      return result;
    } catch (e) {
      console.error('createOrder exception:', e);
      throw e;
    } finally {
      hide();
    }
  };

  const getMyOrders = async () => {
    show();

    try {
      if (!user.value?.id) {
        // У гостя нет истории заказов на сервере — отдаём пустой список
        return [];
      }

      const res = await fetch(`${API_URL}/orders/my?user_id=${encodeURIComponent(user.value.id)}`);
      const result = await res.json();

      if (!res.ok) {
        console.error('GET ORDERS ERROR:', result);
        throw new Error(result?.detail || 'Ошибка получения заказов');
      }

      return result;
    } catch (e) {
      console.error('getMyOrders exception:', e);
      return [];
    } finally {
      hide();
    }
  };

  return {
    createOrder,
    getMyOrders,
  };
};
