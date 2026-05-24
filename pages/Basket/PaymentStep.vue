<template>
  <DesktopHeader />

  <div class="px-4 flex justify-center mt-[40px] pb-[100px]">
    <div class="w-full max-w-[650px] bg-white border rounded-[28px] p-8 space-y-6">
      <div>
        <div class="text-[28px] font-extrabold">Оплата</div>
        <div class="text-[13px] text-[#777]">Подтвердите заказ</div>
      </div>

      <div class="bg-[#F7F7F7] rounded-[18px] p-5 flex justify-between">
        <span>Итого</span>
        <span class="font-bold">{{ total }} ₽</span>
      </div>

      <button
        class="w-full h-[56px] bg-black text-white rounded-full font-semibold"
        @click="createOrder"
        :disabled="loading"
      >
        {{ loading ? 'Создание...' : 'Оплатить' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal';
import { useApi } from '~/src/composables/useApi';
import DesktopHeader from '../Header/DesktopHeader.vue';

const { basket } = useBasket();
const { request } = useApi();
const { redirectHome } = globalRouting();

const loading = ref(false);

const total = computed(() => basket.value.reduce((sum, i) => sum + i.watch.price * i.quantity, 0));

const createOrder = async () => {
  loading.value = true;

  try {
    await request('/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        delivery_type: 'cdek',
        address: '',
        phone: '',
        fio: '',
        comment: '',
      }),
    });

    redirectHome();
  } finally {
    loading.value = false;
  }
};
</script>
