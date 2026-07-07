// src/composables/useOrder.ts
import { useBasket } from './AddBasket';
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
      const token = localStorage.getItem('token');

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Не шлём заголовок вообще, если токена нет — иначе бэк получит
      // буквально "Bearer null" и посчитает это невалидным токеном
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const body: Record<string, any> = {
        delivery_type: data.delivery_type,
        address: data.address,
        phone: data.phone,
        fio: data.fio,
        comment: data.comment || '',
        use_bonus: data.use_bonus ?? false,
      };

      // Гость: своей корзины на сервере нет — передаём позиции прямо в запросе
      if (!token) {
        body.items = basket.value.map((item) => ({
          custom_id: item.watch.custom_id,
          quantity: item.quantity,
        }));
      }

      // Для отладки - выведи что отправляется
      console.log('Creating order with data:', body);

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const result = await res.json();

      // Для отладки - что вернул бэк
      console.log('Order created:', result);

      if (!res.ok) {
        console.error('CREATE ORDER ERROR:', result);
        throw new Error(result?.detail || 'Ошибка создания заказа');
      }

      // После гостевого заказа локальная корзина больше не нужна — очищаем
      if (!token && import.meta.client) {
        localStorage.removeItem('guest_cart_v1');
        basket.value = [];
      }

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
      const token = localStorage.getItem('token');

      if (!token) {
        // У гостя нет истории заказов на сервере — отдаём пустой список
        return [];
      }

      const res = await fetch(`${API_URL}/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
