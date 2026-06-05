<template>
  <DesktopHeader />

  <section class="px-[100px] max-md:px-[20px] py-[80px] max-md:pt-[50px] max-md:pb-[20px]">
    <div class="max-w-[1400px] mx-auto">
      <!-- Заголовок -->
      <p class="text-[11px] uppercase tracking-[0.18em] text-[#999] mb-3 font-sans">Документ</p>
      <h2 class="text-[42px] max-md:text-[30px] font-serif font-normal leading-[1.15] tracking-tight text-[#111] mb-3">
        Возврат<em>и споры</em>
      </h2>
      <p class="text-[14px] text-[#888] mb-12">
        Мы продаём только оригинальные часы и несём полную ответственность за их состояние до момента передачи в службу
        доставки.
      </p>

      <!-- Баннер: главное условие -->
      <div
        class="flex items-start gap-5 bg-[#F9F9F9] border border-[#ECECEC] border-l-[3px] border-l-[#111] rounded-r-[10px] rounded-l-none px-6 py-5 mb-10"
      >
        <svg class="w-6 h-6 shrink-0 fill-[#111] mt-0.5" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <div>
          <p class="text-[15px] font-medium text-[#111] mb-1">Основание для возврата</p>
          <p class="text-[13px] text-[#555] leading-relaxed">
            Возврат рассматривается только при наличии видеодоказательства: если на записи сборки и упаковки вашего
            заказа зафиксирован дефект товара, повреждение пломбы, несоответствие комплектации или иное нарушение.
          </p>
        </div>
      </div>

      <!-- Карточки: когда возможен и когда невозможен -->
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-10">
        <div class="relative bg-white border border-[#ECECEC] rounded-[14px] p-6 overflow-hidden">
          <span class="absolute top-4 right-5 text-[52px] font-bold text-[#F0F0F0] leading-none select-none">✓</span>
          <p class="text-[12px] uppercase tracking-[0.1em] text-[#999] mb-3">Возврат возможен</p>
          <ul class="space-y-2.5">
            <li v-for="item in canReturn" :key="item" class="flex items-start gap-2.5">
              <svg class="w-4 h-4 fill-[#111] shrink-0 mt-0.5" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span class="text-[13px] text-[#444] leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="relative bg-white border border-[#ECECEC] rounded-[14px] p-6 overflow-hidden">
          <span class="absolute top-4 right-5 text-[52px] font-bold text-[#F0F0F0] leading-none select-none">✕</span>
          <p class="text-[12px] uppercase tracking-[0.1em] text-[#999] mb-3">Возврат невозможен</p>
          <ul class="space-y-2.5">
            <li v-for="item in cannotReturn" :key="item" class="flex items-start gap-2.5">
              <svg class="w-4 h-4 fill-[#BBB] shrink-0 mt-0.5" viewBox="0 0 24 24">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
              <span class="text-[13px] text-[#888] leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-[#ECECEC] my-10"></div>

      <!-- Процесс возврата -->
      <div class="space-y-6 mb-10">
        <p class="text-[11px] uppercase tracking-[0.1em] text-[#999]">Как подать заявку</p>

        <div class="space-y-3">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="flex items-start gap-5 p-5 rounded-[14px] border border-[#ECECEC]"
          >
            <span class="text-[13px] font-mono text-[#BBB] shrink-0 mt-0.5 w-5">{{
              String(i + 1).padStart(2, '0')
            }}</span>
            <div>
              <p class="text-[14px] font-medium text-[#111] mb-1">{{ step.title }}</p>
              <p class="text-[13px] text-[#666] leading-relaxed">{{ step.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-[#ECECEC] my-10"></div>

      <!-- Важно знать -->
      <div class="space-y-4 mb-10">
        <p class="text-[11px] uppercase tracking-[0.1em] text-[#999]">Важно знать</p>
        <p class="text-[14px] text-[#555] leading-[1.8]">
          Каждый заказ снимается на видео в момент сборки и запечатывания. Эта запись является единственным и
          достаточным доказательством состояния товара при отправке. Именно поэтому мы предлагаем отправить вам видео на
          контактный номер — просто укажите это в комментарии к заказу.
        </p>
        <p class="text-[14px] text-[#555] leading-[1.8]">
          Мы не несём ответственности за повреждения, возникшие в процессе доставки по вине транспортной компании. В
          таком случае мы поможем вам оформить претензию напрямую к перевозчику — Яндекс Доставке или СДЭК.
        </p>
        <p class="text-[14px] text-[#555] leading-[1.8]">
          Срок рассмотрения заявки на возврат — до 5 рабочих дней с момента получения вашего обращения и
          видеодоказательства. Мы свяжемся с вами и сообщим о решении.
        </p>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-[#ECECEC] my-10"></div>

      <!-- Контакты -->
      <div class="space-y-3">
        <p class="text-[11px] uppercase tracking-[0.1em] text-[#999]">Написать по возврату</p>
        <p class="text-[14px] text-[#555] leading-[1.75]">
          Свяжитесь с нами удобным способом — опишите ситуацию и приложите видео с дефектом.
        </p>
        <div class="flex flex-wrap gap-3 pt-1">
          <a
            href="https://t.me/lilexport"
            target="_blank"
            class="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-[#ECECEC] hover:border-black transition group"
          >
            <img src="/telegram.webp" alt="Telegram" class="w-4 h-4 object-contain" />
            <span class="text-[13px] text-[#444] group-hover:text-black transition">@lilexport</span>
          </a>
          <a
            href="mailto:smg05892@gmail.com"
            class="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-[#ECECEC] hover:border-black transition group"
          >
            <svg class="w-4 h-4 fill-[#888] group-hover:fill-black transition" viewBox="0 0 24 24">
              <path
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <span class="text-[13px] text-[#444] group-hover:text-black transition">smg05892@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <Contacts />
</template>

<script setup lang="ts">
import DesktopHeader from '~/pages/Header/DesktopHeader.vue';
import Contacts from '../Contacts.vue';

const canReturn = [
  'На видео упаковки виден заводской дефект товара',
  'На записи зафиксировано повреждение или вскрытие пломбы до отправки',
  'Товар в посылке не соответствует тому, что показано на видео сборки',
  'Комплектация не совпадает с заявленной и это подтверждено видеозаписью',
];

const cannotReturn = [
  'Товар получен в надлежащем виде, видео не фиксирует нарушений',
  'Повреждения возникли в процессе доставки по вине перевозчика',
  'Покупатель передумал или нашёл дешевле — это не является основанием',
  'Заявка подана без предоставления видеодоказательства',
  'Прошло более 7 дней с момента получения заказа',
];

const steps = [
  {
    title: 'Запросите видео упаковки',
    text: 'Если вы не указывали это при заказе — напишите нам, и мы предоставим видеозапись сборки вашего заказа в течение 24 часов.',
  },
  {
    title: 'Зафиксируйте проблему',
    text: 'Просмотрите видео и укажите тайм-код или опишите момент, в котором виден дефект, повреждение пломбы или несоответствие.',
  },
  {
    title: 'Свяжитесь с нами',
    text: 'Напишите в Telegram (@lilexport) или на почту smg05892@gmail.com. Укажите номер заказа, опишите ситуацию и приложите видео или скриншот с временной меткой.',
  },
  {
    title: 'Ожидайте решения',
    text: 'Мы рассмотрим обращение в течение 5 рабочих дней и свяжемся с вами для согласования дальнейших шагов.',
  },
];
</script>
