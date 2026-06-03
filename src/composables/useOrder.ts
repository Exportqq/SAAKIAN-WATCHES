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
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Ошибка создания заказа');

      return await res.json();
    } finally {
      hide();
    }
  };

  const getMyOrders = async () => {
    show();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Ошибка получения заказов');

      return await res.json();
    } finally {
      hide();
    }
  };

  return { createOrder, getMyOrders };
};
