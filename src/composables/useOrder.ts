import { useGlobalLoader } from './useGlobalLoader';

const API_URL = 'https://watches-api-c9i5.onrender.com';

export const useOrder = () => {
  const { show, hide } = useGlobalLoader();

  const createOrder = async (data: {
    delivery_type: string;
    address: string;
    phone: string;
    fio: string;
    comment?: string;
    use_bonus?: boolean;
    bonus_to_use?: number;
  }) => {
    show();

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          use_bonus: data.use_bonus ?? false,
          bonus_to_use: data.bonus_to_use ?? 0,
        }),
      });

      const result = await res.json();

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
