<template>
  <div class="min-h-screen bg-[#F7F7F7] px-4 py-10">
    <div class="max-w-[1000px] mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-[28px] font-extrabold">Заказы</h1>
          <p class="text-[14px] text-[#888] mt-1">Всего: {{ orders.length }}</p>
        </div>

        <button
          class="px-5 py-2.5 rounded-full border border-[#E5E5E5] text-[14px] font-semibold hover:bg-white transition"
          @click="logout"
        >
          Выйти
        </button>
      </div>

      <div v-if="orders.length" class="space-y-3">
        <div v-for="order in orders" :key="order.id" class="bg-white border border-[#ECECEC] rounded-[20px] p-5">
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div class="space-y-1">
              <p class="text-[15px] font-semibold">{{ order.fio }}</p>
              <p class="text-[13px] text-[#888]">{{ order.phone }}</p>
              <p class="text-[13px] text-[#888]">{{ order.address }}</p>

              <p class="text-[13px] text-[#888]">
                {{ order.delivery_type === 'cdek' ? 'СДЭК' : 'Яндекс Маркет' }}
              </p>

              <p v-if="order.comment" class="text-[13px] text-[#AAA] italic">
                {{ order.comment }}
              </p>

              <p class="text-[12px] text-[#BBB] mt-1">
                {{ formatDate(order.created_at) }}
              </p>
            </div>

            <div class="flex flex-col items-end gap-3">
              <select
                :value="order.status"
                class="text-[13px] font-semibold px-4 py-2 rounded-full border border-[#E5E5E5] bg-white focus:outline-none cursor-pointer"
                :class="statusClass(order.status)"
                @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
              >
                <option value="processing">В обработке</option>
                <option value="waiting_payment">Ждёт оплаты</option>
                <option value="paid">Оплачен</option>
                <option value="shipped">Передан в доставку</option>
                <option value="completed">Выполнен</option>
              </select>

              <p class="text-[15px] font-bold">{{ totalPrice(order.items).toLocaleString() }} ₽</p>
            </div>
          </div>

          <div class="mt-4 border-t border-[#F0F0F0] pt-4 space-y-2">
            <div v-for="item in order.items" :key="item.watch_id" class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-[10px] bg-[#F5F5F5] overflow-hidden shrink-0">
                <img v-if="item.images?.[0]" :src="item.images[0]" class="w-full h-full object-contain" />
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-semibold truncate">
                  {{ item.title }}
                </p>
                <p class="text-[12px] text-[#999]">{{ item.brand }}</p>
              </div>

              <div class="text-right shrink-0">
                <p class="text-[13px] font-semibold">{{ item.price.toLocaleString() }} ₽</p>
                <p class="text-[12px] text-[#999]">{{ item.quantity }} шт.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-[#888] text-[16px]">Заказов пока нет</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

const API_URL = 'https://watches-api-c9i5.onrender.com';

const router = useRouter();
const { show, hide } = useGlobalLoader();

const orders = ref<any[]>([]);

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const fetchOrders = async () => {
  show();
  try {
    const res = await fetch(`${API_URL}/admin/orders`, {
      headers: authHeaders(),
    });

    if (!res.ok) throw new Error();

    orders.value = await res.json();
  } catch {
    router.push('/auth');
  } finally {
    hide();
  }
};

const updateStatus = async (orderId: string, status: string) => {
  try {
    await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });

    const order = orders.value.find((o) => o.id === orderId);
    if (order) order.status = status;
  } catch {
    console.error('Ошибка обновления статуса');
  }
};

const totalPrice = (items: any[]) => {
  return items.reduce((acc, i) => acc + i.price * i.quantity, 0);
};

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const statusClass = (status: string) => {
  const map: Record<string, string> = {
    processing: 'text-[#888]',
    waiting_payment: 'text-[#C4300F]',
    paid: 'text-[#007A29]',
    shipped: 'text-[#1E63D6]',
    completed: 'text-[#555]',
  };

  return map[status] ?? '';
};

const logout = () => {
  localStorage.removeItem('token');
  router.push('/Auth/Auth');
};

onMounted(fetchOrders);
</script>
