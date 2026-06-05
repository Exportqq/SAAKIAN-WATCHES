<template>
  <DesktopHeader />

  <div class="px-4 flex justify-center mt-[40px] pb-[100px]">
    <div class="w-full max-w-[560px] space-y-4">
      <div class="mb-2">
        <h1 class="text-[28px] font-extrabold">Доставка</h1>
        <p class="text-[14px] text-[#888] mt-1">Укажите данные для получения заказа</p>
      </div>

      <div class="border border-[#D8D8D8] rounded-[20px] overflow-hidden bg-white divide-y divide-[#ECECEC]">
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

        <button
          class="w-full flex items-center gap-4 px-5 py-4 transition-all"
          :class="
            deliveryType === 'yandex'
              ? 'bg-gradient-to-r from-[#FFB800]/20 to-[#FFB800]/5 text-[#A07800]'
              : 'hover:bg-[#F9F9F9]'
          "
          @click="deliveryType = 'yandex'"
        >
          <div
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            :class="deliveryType === 'yandex' ? 'border-[#FFB800] bg-[#FFB800]' : 'border-[#CCC]'"
          >
            <div v-if="deliveryType === 'yandex'" class="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div class="text-left">
            <p class="text-[15px] font-semibold">Яндекс Маркет</p>
            <p class="text-[13px] mt-0.5" :class="deliveryType === 'yandex' ? 'text-[#FFB800]/80' : 'text-[#999]'">
              Доставка до пункта выдачи
            </p>
          </div>
        </button>
      </div>

      <div class="border border-[#D8D8D8] rounded-[20px] overflow-hidden bg-white divide-y divide-[#ECECEC]">
        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Адрес ПВЗ</label>
          <input
            v-model="address"
            type="text"
            class="w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#AAAAAA]"
            placeholder="Введите адрес пункта выдачи"
          />
        </div>

        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#666] uppercase tracking-wide">ФИО</label>
          <input
            v-model="fio"
            type="text"
            class="w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#AAAAAA]"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#666] uppercase tracking-wide">Телефон</label>
          <input
            v-model="phone"
            @input="formatPhone"
            @keydown="handleKeydown"
            type="tel"
            inputmode="numeric"
            class="w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#AAAAAA]"
            placeholder="+7 (___) ___ __-__"
          />
        </div>

        <div class="px-5 py-4">
          <label class="text-[12px] font-semibold text-[#666] uppercase tracking-wide">
            Комментарий <span class="normal-case font-normal text-[#BBB]">— необязательно</span>
          </label>
          <textarea
            v-model="comment"
            class="h-[150px] w-full mt-1 bg-transparent focus:outline-none text-[15px] placeholder:text-[#AAAAAA] resize-none"
            placeholder="Например: позвонить за час до доставки"
            rows="2"
          />
        </div>
      </div>

      <div class="flex items-start gap-3 cursor-pointer select-none">
        <div
          class="mt-0.5 w-5 h-5 rounded-[6px] border-2 shrink-0 flex items-center justify-center transition-all"
          :class="agreed ? 'bg-black border-black' : 'border-[#CCC]'"
          @click="agreed = !agreed"
        >
          <svg v-if="agreed" class="w-3 h-3 text-white" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="text-[13px] text-[#666] leading-relaxed">
          Я согласен(а) на
          <button
            type="button"
            class="underline underline-offset-2 text-black hover:opacity-70 transition"
            @click="pdModal = true"
          >
            обработку персональных данных
          </button>
          в соответствии с Федеральным законом №152-ФЗ
        </span>
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

  <Transition name="fade">
    <div
      v-if="pdModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      @click.self="pdModal = false"
    >
      <div class="bg-white w-full max-w-[480px] rounded-[28px] p-7 space-y-4 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <h2 class="text-[18px] font-extrabold">Обработка персональных данных</h2>
          <button
            class="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#eee] transition shrink-0"
            @click="pdModal = false"
          >
            <span class="text-[18px] leading-none text-[#555]">×</span>
          </button>
        </div>

        <div class="text-[13px] text-[#555] space-y-3 leading-relaxed">
          <p>
            Настоящим вы даёте согласие на обработку своих персональных данных (ФИО, номер телефона, адрес доставки) в
            целях оформления и исполнения заказа.
          </p>
          <p>
            Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О
            персональных данных».
          </p>
          <p>
            Ваши данные не передаются третьим лицам, за исключением служб доставки (СДЭК, Яндекс Маркет), необходимых
            для исполнения заказа.
          </p>
          <p>Вы вправе отозвать согласие в любое время, направив письменное обращение.</p>
        </div>

        <button
          class="w-full h-[50px] rounded-full bg-black text-white font-semibold text-[15px] hover:opacity-80 transition"
          @click="pdModal = false"
        >
          Понятно
        </button>
      </div>
    </div>
  </Transition>

  <PopupUI
    :message="popupMessage"
    :type="popupType"
    :show="popupVisible"
    :duration="2000"
    @close="popupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { useBasket } from '~/src/composables/AddBasket';
import { globalRouting } from '~/src/composables/globbal.js';
import { useBonusState } from '~/src/composables/useBonusState';
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';
import { useOrder } from '~/src/composables/useOrder.js';
import ButtonUI from '~/src/UI/ButtonUI.vue';
import PopupUI from '~/src/UI/PopupUI/PopupUI.vue';
import DesktopHeader from '../Header/DesktopHeader.vue';

const deliveryType = ref<'cdek' | 'yandex'>('cdek');
const address = ref('');
const phone = ref('');
const fio = ref('');
const comment = ref('');
const agreed = ref(false);
const pdModal = ref(false);

const popupVisible = ref(false);
const popupMessage = ref('');
const popupType = ref<'success' | 'error' | 'warning'>('success');

const { basket } = useBasket();
const { createOrder } = useOrder();
const { redirectOrder } = globalRouting();
const { show, hide } = useGlobalLoader();
const { useBonusToggle } = useBonusState();

const canContinue = computed(() => {
  return (
    address.value.trim().length > 5 &&
    phone.value.replace(/\D/g, '').length === 11 &&
    fio.value.trim().length > 3 &&
    agreed.value
  );
});

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
  const digits = getDigits(phone.value);
  if (digits.length === 0) {
    phone.value = '';
    return;
  }
  // Удаляем последнюю цифру и переформатируем
  const newDigits = digits.slice(0, -1);
  phone.value = applyFormat(newDigits);
  e.preventDefault();
  nextTick(() => {
    const input = e.target as HTMLInputElement;
    input.setSelectionRange(phone.value.length, phone.value.length);
  });
};

const nextStep = async () => {
  show();
  try {
    await createOrder({
      delivery_type: deliveryType.value,
      address: address.value,
      phone: phone.value,
      fio: fio.value,
      comment: comment.value || undefined,
      use_bonus: useBonusToggle.value,
    });

    popupMessage.value = 'Заказ успешно создан!';
    popupType.value = 'success';
    popupVisible.value = true;

    setTimeout(() => {
      redirectOrder?.();
    }, 1000);
  } catch (e: any) {
    popupMessage.value = e?.message || 'Ошибка при создании заказа';
    popupType.value = 'error';
    popupVisible.value = true;
  } finally {
    hide();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
