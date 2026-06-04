<template>
  <DesktopHeader />

  <div class="px-4 flex justify-center mt-[40px] pb-[100px]">
    <div class="w-full max-w-[560px] space-y-4">
      <div class="mb-2">
        <h1 class="text-[28px] font-extrabold">Доставка</h1>
        <p class="text-[14px] text-[#888] mt-1">Укажите данные для получения заказа</p>
      </div>

      <div class="border border-[#ECECEC] rounded-[20px] overflow-hidden bg-white">
        <button
          class="w-full flex items-center gap-4 px-5 py-4 transition-all"
          :class="
            deliveryType === 'cdek'
              ? 'bg-gradient-to-r from-[#00B33C]/20 to-[#00B33C]/5 text-[#007A29]'
              : 'hover:bg-[#F9F9F9]'
          "
          @click="deliveryType = 'cdek'"
        >
          <div
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            :class="deliveryType === 'cdek' ? 'border-[#00B33C] bg-[#00B33C]' : 'border-[#CCC]'"
          >
            <div v-if="deliveryType === 'cdek'" class="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div class="text-left">
            <p class="text-[15px] font-semibold">СДЭК</p>
            <p class="text-[13px] mt-0.5" :class="deliveryType === 'cdek' ? 'text-[#00B33C]/60' : 'text-[#999]'">
              Доставка до пункта выдачи
            </p>
          </div>
        </button>

        <div class="border-t border-[#ECECEC]" />

        <button
          class="w-full flex items-center gap-4 px-5 py-4 transition-all"
          :class="
            deliveryType === 'yandex'
              ? 'bg-gradient-to-r from-[#FC3F1D]/15 to-[#FC3F1D]/5 text-[#C4300F]'
              : 'hover:bg-[#F9F9F9]'
          "
          @click="deliveryType = 'yandex'"
        >
          <div
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            :class="deliveryType === 'yandex' ? 'border-[#FC3F1D] bg-[#FC3F1D]' : 'border-[#CCC]'"
          >
            <div v-if="deliveryType === 'yandex'" class="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div class="text-left">
            <p class="text-[15px] font-semibold">Яндекс Маркет</p>
            <p class="text-[13px] mt-0.5" :class="deliveryType === 'yandex' ? 'text-[#FC3F1D]/60' : 'text-[#999]'">
              Доставка до пункта выдачи
            </p>
          </div>
        </button>
      </div>

      <div class="border border-[#ECECEC] rounded-[20px] overflow-hidden bg-white divide-y divide-[#F0F0F0]">
        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#999] uppercase tracking-wide">Адрес ПВЗ</label>
          <input
            v-model="address"
            type="text"
            class="w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#CCC]"
            placeholder="Введите адрес пункта выдачи"
          />
        </div>

        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#999] uppercase tracking-wide">ФИО</label>
          <input
            v-model="fio"
            type="text"
            class="w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#CCC]"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#999] uppercase tracking-wide">Телефон</label>
          <input
            v-model="phone"
            @input="formatPhone"
            @keydown="handleKeydown"
            type="tel"
            inputmode="numeric"
            class="w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#CCC]"
            placeholder="+7 (___) ___ __-__"
          />
        </div>

        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#999] uppercase tracking-wide">
            Комментарий <span class="normal-case font-normal text-[#BBB]">— необязательно</span>
          </label>
          <textarea
            v-model="comment"
            class="h-[150px] w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#CCC] resize-none"
            placeholder="Например: позвонить за час до доставки"
            rows="2"
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
import { computed, nextTick, ref } from 'vue';
import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal.js';
import { bonus } from '~/src/composables/useBonus';
import { useOrder } from '~/src/composables/useOrder.js';

import ButtonUI from '~/src/UI/ButtonUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const deliveryType = ref<'cdek' | 'yandex'>('cdek');
const address = ref('');
const phone = ref('');
const fio = ref('');
const comment = ref('');

const { basket } = useBasket();
const { createOrder } = useOrder();
const { redirectCatalog } = globalRouting();

const canContinue = computed(() => {
  return address.value.trim().length > 5 && phone.value.replace(/\D/g, '').length === 11 && fio.value.trim().length > 3;
});

const totalPrice = computed(() => {
  return basket.value.reduce((acc, i) => acc + i.watch.price * i.quantity, 0);
});

const maxBonusUse = computed(() => totalPrice.value * 0.3);

const bonusToUse = computed(() => {
  const balance = bonus.value?.balance || 0;
  return Math.min(balance, maxBonusUse.value);
});

/* ================= PHONE FORMAT ================= */

const applyFormat = (digits: string): string => {
  if (digits.length === 0) return '';
  let formatted = '+7';
  if (digits.length > 0) formatted += ' (' + digits.slice(0, 3);
  if (digits.length >= 3) formatted += ') ' + digits.slice(3, 6);
  if (digits.length >= 6) formatted += ' ' + digits.slice(6, 8);
  if (digits.length >= 8) formatted += '-' + digits.slice(8, 10);
  return formatted;
};

const getDigits = (value: string): string => {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (digits.startsWith('7')) digits = digits.slice(1);
  return digits.slice(0, 10);
};

const formatPhone = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const digits = getDigits(phone.value);
  phone.value = applyFormat(digits);

  nextTick(() => {
    input.setSelectionRange(phone.value.length, phone.value.length);
  });
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'Backspace') return;
};

/* ================= ORDER ================= */

const nextStep = async () => {
  try {
    const balance = bonus.value?.balance || 0;
    const max = totalPrice.value * 0.3;
    const use = Math.min(balance, max);

    await createOrder({
      delivery_type: deliveryType.value,
      address: address.value,
      phone: phone.value,
      fio: fio.value,
      comment: comment.value || undefined,

      use_bonus: use > 0,
      bonus_to_use: use,
    });

    redirectCatalog?.();
  } catch (e) {
    console.log('Ошибка при создании заказа', 'error');
  }
};
</script>
