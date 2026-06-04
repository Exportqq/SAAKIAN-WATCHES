<template>
  <DesktopHeader />

  <div class="max-w-[1000px] mx-auto px-4 py-10">
    <h1 class="text-[32px] font-bold mb-8">Мои заказы</h1>

    <div v-if="orders.length" class="flex flex-col gap-4">
      <div class="flex bg-[#F5F5F5] rounded-full p-1 mb-2">
        <button
          @click="filter = 'active'"
          class="flex-1 h-[42px] rounded-full text-[14px] font-semibold transition-all duration-200"
          :class="filter === 'active' ? 'bg-white shadow text-black' : 'text-[#888]'"
        >
          Активные
        </button>
        <button
          @click="filter = 'completed'"
          class="flex-1 h-[42px] rounded-full text-[14px] font-semibold transition-all duration-200"
          :class="filter === 'completed' ? 'bg-white shadow text-black' : 'text-[#888]'"
        >
          Завершённые
        </button>
      </div>

      <template v-if="filteredOrders.length">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="border border-[#E7E7E7] rounded-[24px] p-6 bg-white"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="font-bold text-[18px]">Заказ №{{ order.id.slice(0, 8) }}</p>
              <p class="text-[#777] text-[14px] mt-1">{{ formatDate(order.created_at) }}</p>
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
              <p><b>Доставка:</b> {{ order.delivery_type === 'cdek' ? 'СДЭК' : 'Яндекс Маркет' }}</p>
              <p v-if="order.comment"><b>Комментарий:</b> {{ order.comment }}</p>
            </div>

            <div class="space-y-4">
              <div v-for="item in order.items" :key="item.watch_id" class="flex gap-4 border rounded-[16px] p-4">
                <img :src="item.images?.[0]" class="w-[90px] h-[90px] object-cover rounded-[12px]" />
                <div>
                  <p class="font-bold">{{ item.title }}</p>
                  <p class="text-[#666]">{{ item.brand }}</p>
                  <p class="mt-2">{{ item.quantity }} × {{ item.price.toLocaleString() }} ₽</p>
                </div>
              </div>
            </div>

            <div class="mt-6 border-t pt-4 space-y-1">
              <div class="flex justify-between text-[15px] text-[#666]">
                <span>Сумма</span>
                <span>{{ order.total_price.toLocaleString() }} ₽</span>
              </div>

              <div v-if="order.bonus_used > 0" class="flex justify-between text-[15px] text-green-600">
                <span>Списано бонусами</span>
                <span>− {{ order.bonus_used.toLocaleString() }} ₽</span>
              </div>

              <div class="flex justify-between text-[17px] font-bold mt-2">
                <span>Итого</span>
                <span>{{ order.final_price.toLocaleString() }} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="text-center text-[#777] py-10">Заказов нет</div>
    </div>

    <div v-else class="text-center text-[#777]">У вас пока нет заказов</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useGlobalLoader } from '~/src/composables/useGlobalLoader';
import { useOrder } from '~/src/composables/useOrder';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { getMyOrders } = useOrder();
const { show, hide } = useGlobalLoader();

const orders = ref<any[]>([]);
const selectedOrder = ref<any | null>(null);
const filter = ref<'active' | 'completed'>('active');

const filteredOrders = computed(() => {
  if (filter.value === 'completed') {
    return orders.value.filter((o) => o.status === 'completed');
  }
  return orders.value.filter((o) => o.status !== 'completed');
});

const statusText = (status: string) => {
  switch (status) {
    case 'processing':
      return 'Обработка';
    case 'waiting_payment':
      return 'Ожидает оплату';
    case 'paid':
      return 'Оплачен';
    case 'shipped':
      return 'Доставка';
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
      return 'bg-[#FFF1F2] text-[#C2410C]';
    case 'paid':
      return 'bg-[#ECFDF5] text-[#166534]';
    case 'shipped':
      return 'bg-[#EFF6FF] text-[#1D4ED8]';
    case 'completed':
      return 'bg-[#F3F4F6] text-[#374151]';
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
