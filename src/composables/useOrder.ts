// src/composables/useOrder.ts
import { useGlobalLoader } from './useGlobalLoader';

const API_URL = 'https://saakianwatches-lilexport.amvera.io';

export const useOrder = () => {
  const { show, hide } = useGlobalLoader();

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

      // Для отладки - выведи что отправляется
      console.log('Creating order with data:', {
        delivery_type: data.delivery_type,
        address: data.address,
        phone: data.phone,
        fio: data.fio,
        comment: data.comment || '',
        use_bonus: data.use_bonus ?? false,
      });

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          delivery_type: data.delivery_type,
          address: data.address,
          phone: data.phone,
          fio: data.fio,
          comment: data.comment || '',
          use_bonus: data.use_bonus ?? false,
        }),
      });

      const result = await res.json();

      // Для отладки - что вернул бэк
      console.log('Order created:', result);

      if (!res.ok) {
        console.error('CREATE ORDER ERROR:', result);
        throw new Error(result?.detail || 'Ошибка создания заказа');
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
