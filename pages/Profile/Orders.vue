<template>
  <DesktopHeader />

  <div class="max-w-[1000px] mx-auto px-4 py-10">
    <h1 class="text-[32px] font-bold mb-8">Мои заказы</h1>

    <div v-if="orders.length" class="flex flex-col gap-4">
      <div v-for="order in orders" :key="order.id" class="border border-[#E7E7E7] rounded-[24px] p-6 bg-white">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-[18px]">Заказ №{{ order.id.slice(0, 8) }}</p>

            <p class="text-[#777] text-[14px] mt-1">
              {{ formatDate(order.created_at) }}
            </p>
          </div>

          <div>
            <span :class="statusClass(order.status)" class="px-4 py-2 rounded-full text-[14px] font-semibold">
              {{ statusText(order.status) }}
            </span>
          </div>
        </div>

        <button
          class="mt-5 h-[46px] px-6 rounded-full border border-black hover:bg-black hover:text-white transition"
          @click="selectedOrder = selectedOrder?.id === order.id ? null : order"
        >
          {{ selectedOrder?.id === order.id ? 'Скрыть детали' : 'Подробнее' }}
        </button>

        <div v-if="selectedOrder?.id === order.id" class="mt-6 border-t pt-6">
          <div class="space-y-2 mb-6">
            <p><b>Получатель:</b> {{ order.fio }}</p>
            <p><b>Телефон:</b> {{ order.phone }}</p>
            <p><b>Адрес:</b> {{ order.address }}</p>

            <p v-if="order.comment"><b>Комментарий:</b> {{ order.comment }}</p>
          </div>

          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.watch_id" class="flex gap-4 border rounded-[16px] p-4">
              <img :src="item.images?.[0]" class="w-[90px] h-[90px] object-cover rounded-[12px]" />

              <div>
                <p class="font-bold">
                  {{ item.title }}
                </p>

                <p class="text-[#666]">
                  {{ item.brand }}
                </p>

                <p class="mt-2">{{ item.quantity }} × {{ item.price }} ₽</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-[#777]">У вас пока нет заказов</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useGlobalLoader } from '~/src/composables/useGlobalLoader';
import { useOrder } from '~/src/composables/useOrder';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { getMyOrders } = useOrder();
const { show, hide } = useGlobalLoader();

const orders = ref<any[]>([]);
const selectedOrder = ref<any | null>(null);

const statusText = (status: string) => {
  switch (status) {
    case 'processing':
      return 'Обработка';

    case 'waiting_payment':
      return 'Ожидает оплату';

    case 'paid':
      return 'Оплачен';

    case 'completed':
      return 'Завершён';

    default:
      return status;
  }
};

const statusClass = (status: string) => {
  switch (status) {
    case 'processing':
      return 'bg-[#FFF7E6] text-[#B7791F]';

    case 'waiting_payment':
      return 'bg-[#EEF6FF] text-[#2B6CB0]';

    case 'paid':
      return 'bg-[#EAFBF3] text-[#2F855A]';

    case 'completed':
      return 'bg-[#F3F0FF] text-[#6B46C1]';

    default:
      return 'bg-[#F7F7F7] text-[#666]';
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('ru-RU');
};

onMounted(async () => {
  try {
    show();
    orders.value = await getMyOrders();
  } finally {
    hide();
  }
});
</script>
