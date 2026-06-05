<template>
  <DesktopHeader />

  <section class="px-[100px] max-md:px-[20px] py-[80px] max-md:pt-[50px] max-md:pb-[20px]">
    <div class="max-w-[1400px] mx-auto">
      <!-- Заголовок -->
      <p class="text-[11px] uppercase tracking-[0.18em] text-[#999] mb-3 font-sans">Условия</p>
      <h2 class="text-[42px] max-md:text-[30px] font-serif font-normal leading-[1.15] tracking-tight text-[#111] mb-3">
        Доставка<em>по всей России</em>
      </h2>
      <p class="text-[14px] text-[#888] mb-12">Работаем с двумя надёжными службами — выбирайте удобную</p>

      <!-- Баннер: бесплатная доставка -->
      <div
        class="flex items-center gap-5 bg-[#F9F9F9] border border-[#ECECEC] border-l-[3px] border-l-[#111] rounded-r-[10px] rounded-l-none px-6 py-5 mb-10"
      >
        <svg class="w-7 h-7 shrink-0 fill-[#111]" viewBox="0 0 24 24">
          <path
            d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zm-.5 1.5L21.46 12H17V9.5h2.5zM6 18.5A1.5 1.5 0 1 1 7.5 17 1.5 1.5 0 0 1 6 18.5zm12 0A1.5 1.5 0 1 1 19.5 17a1.5 1.5 0 0 1-1.5 1.5z"
          />
        </svg>
        <div>
          <p class="text-[22px] font-medium text-[#111] leading-none mb-1">Доставка бесплатна</p>
          <p class="text-[13px] text-[#888]">Мы берём все расходы на доставку на себя — вы платите только за часы</p>
        </div>
      </div>

      <!-- Карточки служб -->
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-10">
        <!-- Яндекс Доставка -->
        <div class="relative bg-white border border-[#ECECEC] rounded-[14px] p-6 overflow-hidden">
          <span class="absolute top-4 right-5 text-[52px] font-bold text-[#F0F0F0] leading-none select-none"> 01 </span>
          <svg class="w-6 h-6 fill-[#888] mb-4" viewBox="0 0 24 24">
            <path
              d="M18.92 6.01L17.5 4.5A2 2 0 0 0 16 4H8a2 2 0 0 0-1.5.5L5.08 6.01A3 3 0 0 0 4 8v8a1 1 0 0 0 1 1h1a2 2 0 0 0 4 0h4a2 2 0 0 0 4 0h1a1 1 0 0 0 1-1V8a3 3 0 0 0-1.08-1.99zM8 17.5A1.5 1.5 0 1 1 9.5 16 1.5 1.5 0 0 1 8 17.5zm8 0A1.5 1.5 0 1 1 17.5 16 1.5 1.5 0 0 1 16 17.5zM6 10V8.24L7.24 6h9.52L18 8.24V10z"
            />
          </svg>
          <p class="text-[17px] font-medium text-[#111] mb-2">Яндекс Доставка</p>
          <p class="text-[13px] text-[#666] leading-relaxed">
            Доставка до ближайшего пункта выдачи. Отслеживание посылки в реальном времени через приложение Яндекс.
          </p>
        </div>

        <!-- СДЭК -->
        <div class="relative bg-white border border-[#ECECEC] rounded-[14px] p-6 overflow-hidden">
          <span class="absolute top-4 right-5 text-[52px] font-bold text-[#F0F0F0] leading-none select-none"> 02 </span>
          <svg class="w-6 h-6 fill-[#888] mb-4" viewBox="0 0 24 24">
            <path
              d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-9 13H5v-2h6v2zm8 0h-6v-2h6v2zm0-5H5V7h14v5z"
            />
          </svg>
          <p class="text-[17px] font-medium text-[#111] mb-2">СДЭК</p>
          <p class="text-[13px] text-[#666] leading-relaxed">
            Доставка до ближайшего пункта выдачи. Широкая сеть по всей стране, надёжная упаковка и страховка.
          </p>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-[#ECECEC] my-10"></div>

      <!-- Дисклеймер -->
      <div class="space-y-4">
        <p class="text-[11px] uppercase tracking-[0.1em] text-[#999]">Важно знать</p>
        <p class="text-[14px] text-[#555] leading-[1.75]">
          Мы тщательно проверяем каждый заказ перед отправкой и передаём его в службу доставки в надлежащем виде. Однако
          после передачи посылки курьерской службе ответственность за сроки, сохранность и возможные повреждения в пути
          лежит на транспортной компании. В спорных ситуациях мы поможем оформить претензию к перевозчику.
        </p>
        <p class="text-[14px] text-[#555] leading-[1.75]">
          Если хотите получить видео упаковки вашего заказа — укажите это в комментарии к заказу, и мы отправим его на
          ваш контактный номер. В случае возникновения проблем с доставкой видео упаковки предоставляется по запросу.
        </p>
      </div>

      <!-- Блок с видео -->
      <div class="mt-8 flex items-center gap-5 bg-[#F9F9F9] border border-[#ECECEC] rounded-[14px] px-6 py-5">
        <button
          class="w-11 h-11 rounded-full border border-[#DEDEDE] bg-white flex items-center justify-center shrink-0 hover:bg-black hover:border-black transition group"
          @click="videoModal = true"
          aria-label="Посмотреть видео упаковки"
        >
          <svg class="w-4 h-4 fill-[#333] group-hover:fill-white transition ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <div>
          <p class="text-[14px] font-medium text-[#111] mb-0.5">Видео: как мы упаковываем заказ</p>
          <p class="text-[13px] text-[#888]">
            Сомневаетесь в сохранности? Посмотрите, как каждый заказ собирается и опечатывается перед отправкой
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Модалка с видео -->
  <Transition name="fade">
    <div
      v-if="videoModal"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      @click.self="videoModal = false"
    >
      <div class="bg-white w-full max-w-[600px] rounded-[24px] overflow-hidden shadow-xl">
        <!-- Шапка -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
          <h3 class="text-[17px] font-semibold">Упаковка заказа</h3>
          <button
            class="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#eee] transition"
            @click="videoModal = false"
          >
            <span class="text-[18px] leading-none text-[#555]">×</span>
          </button>
        </div>

        <!-- Видео — замените src на ссылку вашего видео -->
        <div class="aspect-video bg-[#F5F5F5] flex items-center justify-center">
          <video class="w-full h-full object-cover" controls preload="metadata">
            <source src="" type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>

        <div class="px-6 py-4">
          <p class="text-[13px] text-[#888] leading-relaxed">
            Каждый заказ проверяется, бережно упаковывается и запечатывается защитной лентой — так вы можете убедиться,
            что товар не был вскрыт при доставке.
          </p>
        </div>
      </div>
    </div>
  </Transition>

  <Contacts />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DesktopHeader from '~/pages/Header/DesktopHeader.vue';
import Contacts from '../Contacts.vue';

const videoModal = ref(false);
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
