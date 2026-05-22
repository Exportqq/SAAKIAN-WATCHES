<template>
  <DesktopHeader />

  <div class="px-4 flex justify-center mt-[40px]">
    <div class="w-full border rounded-[24px] max-w-[1400px] p-6 space-y-5">
      <div class="text-[24px] font-bold">Способ доставки</div>

      <div class="flex gap-3">
        <button
          class="px-5 py-3 rounded-full font-semibold transition-all"
          :class="deliveryType === 'cdek' ? 'bg-black text-white' : 'bg-gray-200'"
          @click="deliveryType = 'cdek'"
        >
          СДЭК
        </button>

        <button
          class="px-5 py-3 rounded-full font-semibold transition-all"
          :class="deliveryType === 'yandex' ? 'bg-black text-white' : 'bg-gray-200'"
          @click="deliveryType = 'yandex'"
        >
          Яндекс Маркет
        </button>
      </div>

      <div>
        <label class="text-[14px] text-gray-500">Адрес пункта выдачи</label>
        <input
          v-model="address"
          type="text"
          class="w-full mt-1 px-4 py-3 border rounded-[14px]"
          placeholder="Введите адрес ПВЗ"
        />
      </div>

      <div>
        <label class="text-[14px] text-gray-500">Телефон</label>
        <input
          v-model="phone"
          @input="formatPhone"
          type="text"
          class="w-full mt-1 px-4 py-3 border rounded-[14px]"
          placeholder="+7 (___) ___ __-__"
        />
      </div>

      <div>
        <label class="text-[14px] text-gray-500">ФИО</label>
        <input
          v-model="fio"
          type="text"
          class="w-full mt-1 px-4 py-3 border rounded-[14px]"
          placeholder="Иванов Иван Иванович"
        />
      </div>

      <div>
        <label class="text-[14px] text-gray-500">Комментарий (необязательно)</label>
        <textarea
          v-model="comment"
          class="w-full mt-1 px-4 py-3 border rounded-[14px] min-h-[100px]"
          placeholder="Комментарий к заказу"
        />
      </div>

      <button
        class="w-full py-4 rounded-[14px] font-bold transition-all"
        :class="canContinue ? 'bg-black text-white hover:opacity-80' : 'bg-gray-300 text-gray-600 cursor-not-allowed'"
        :disabled="!canContinue"
        @click="nextStep"
      >
        Далее
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const deliveryType = ref<'cdek' | 'yandex'>('cdek');
const address = ref('');
const phone = ref('');
const fio = ref('');
const comment = ref('');

const canContinue = computed(() => {
  return (
    deliveryType.value &&
    address.value.trim().length > 5 &&
    phone.value.replace(/\D/g, '').length === 11 &&
    fio.value.trim().length > 3
  );
});

const formatPhone = () => {
  let value = phone.value.replace(/\D/g, '');

  if (value.startsWith('8')) value = '7' + value.slice(1);
  if (!value.startsWith('7')) value = '7' + value;

  let formatted = '+7 ';

  if (value.length > 1) formatted += '(' + value.slice(1, 4);
  if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
  if (value.length >= 7) formatted += ' ' + value.slice(7, 9);
  if (value.length >= 9) formatted += '-' + value.slice(9, 11);

  phone.value = formatted;
};

const nextStep = () => {
  console.log({
    deliveryType: deliveryType.value,
    address: address.value,
    phone: phone.value,
    fio: fio.value,
    comment: comment.value,
  });
};
</script>
