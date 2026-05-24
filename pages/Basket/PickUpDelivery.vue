<template>
  <DesktopHeader />

  <div class="px-4 flex justify-center mt-[40px] pb-[100px]">
    <div
      class="w-full max-w-[900px] bg-white border border-[#ECECEC] rounded-[28px] p-8 space-y-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
    >
      <div>
        <div class="text-[28px] font-extrabold">Способ доставки</div>
        <div class="text-[13px] text-[#777] mt-1">Укажите данные для доставки заказа</div>
      </div>

      <div class="flex gap-3">
        <button
          class="px-6 py-3 rounded-full font-semibold transition-all"
          :class="deliveryType === 'cdek' ? 'bg-black text-white' : 'bg-[#F3F3F3] text-black'"
          @click="deliveryType = 'cdek'"
        >
          СДЭК
        </button>

        <button
          class="px-6 py-3 rounded-full font-semibold transition-all"
          :class="deliveryType === 'yandex' ? 'bg-black text-white' : 'bg-[#F3F3F3] text-black'"
          @click="deliveryType = 'yandex'"
        >
          Яндекс Маркет
        </button>
      </div>

      <div class="space-y-5">
        <div>
          <label class="text-[13px] text-gray-500">Адрес пункта выдачи</label>
          <input
            v-model="address"
            type="text"
            class="w-full mt-1 px-4 py-3 border border-[#EAEAEA] rounded-[14px] bg-[#FAFAFA] focus:border-black outline-none transition"
            placeholder="Введите адрес ПВЗ"
          />
        </div>

        <div>
          <label class="text-[13px] text-gray-500">Телефон</label>
          <input
            v-model="phone"
            @input="formatPhone"
            type="text"
            class="w-full mt-1 px-4 py-3 border border-[#EAEAEA] rounded-[14px] bg-[#FAFAFA] focus:border-black outline-none transition"
            placeholder="+7 (___) ___ __-__"
          />
        </div>

        <div>
          <label class="text-[13px] text-gray-500">ФИО</label>
          <input
            v-model="fio"
            type="text"
            class="w-full mt-1 px-4 py-3 border border-[#EAEAEA] rounded-[14px] bg-[#FAFAFA] focus:border-black outline-none transition"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        <div>
          <label class="text-[13px] text-gray-500">Комментарий (необязательно)</label>
          <textarea
            v-model="comment"
            class="w-full mt-1 px-4 py-3 border border-[#EAEAEA] rounded-[14px] bg-[#FAFAFA] min-h-[110px] focus:border-black outline-none transition"
            placeholder="Комментарий к заказу"
          />
        </div>
      </div>

      <ButtonUI
        :text="'Далее'"
        :max-width="true"
        :rounded="62"
        :paddingX="8"
        :paddingY="10"
        :disabled="!canContinue"
        @click="nextStep"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonUI from '~/src/UI/ButtonUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const deliveryType = ref<'cdek' | 'yandex'>('cdek');
const address = ref('');
const phone = ref('');
const fio = ref('');
const comment = ref('');

const canContinue = computed(() => {
  return address.value.trim().length > 5 && phone.value.replace(/\D/g, '').length === 11 && fio.value.trim().length > 3;
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
