<template>
  <DesktopHeader />

  <section class="px-[100px] max-md:px-[20px] py-[80px] max-md:pt-[50px] max-md:pb-[20px]">
    <div class="max-w-[1400px] mx-auto">
      <!-- Заголовок -->
      <p class="text-[11px] uppercase tracking-[0.18em] text-[#999] mb-3 font-sans">Документ</p>
      <h2 class="text-[42px] max-md:text-[30px] font-serif font-normal leading-[1.15] tracking-tight text-[#111] mb-3">
        Политика <em>конфиденциальности</em>
      </h2>
      <p class="text-[14px] text-[#888] mb-2">Последнее обновление — {{ lastUpdated }}</p>
      <p class="text-[14px] text-[#888] mb-12">
        Мы уважаем вашу приватность и обязуемся защищать персональные данные, которые вы нам передаёте.
      </p>

      <!-- Разделы -->
      <div class="space-y-2">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="border border-[#ECECEC] rounded-[14px] overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#FAFAFA] transition"
            @click="toggle(index)"
          >
            <div class="flex items-center gap-4">
              <span class="text-[13px] font-mono text-[#BBB] w-6 shrink-0">{{
                String(index + 1).padStart(2, '0')
              }}</span>
              <span class="text-[15px] font-medium text-[#111]">{{ section.title }}</span>
            </div>
            <svg
              class="w-4 h-4 fill-[#999] shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          <Transition name="expand">
            <div v-if="openIndex === index" class="px-6 pb-6">
              <div class="border-t border-[#F0F0F0] pt-5 ml-10">
                <p class="text-[14px] text-[#555] leading-[1.8]" v-html="section.content"></p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-[#ECECEC] my-10"></div>

      <!-- Контакт -->
      <div class="space-y-3">
        <p class="text-[11px] uppercase tracking-[0.1em] text-[#999]">Остались вопросы?</p>
        <p class="text-[14px] text-[#555] leading-[1.75]">
          Если у вас есть вопросы по обработке персональных данных — свяжитесь с нами удобным способом.
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
import { ref } from 'vue';
import DesktopHeader from '~/pages/Header/DesktopHeader.vue';
import Contacts from '../Contacts.vue';

const openIndex = ref<number | null>(0);

const lastUpdated = new Date().toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const sections = [
  {
    title: 'Какие данные мы собираем',
    content:
      'При оформлении заказа мы собираем следующие данные: имя, контактный номер телефона, адрес электронной почты (при наличии), а также адрес пункта выдачи для организации доставки. Мы не собираем платёжные данные — оплата производится через защищённые сторонние сервисы.',
  },
  {
    title: 'Как мы используем ваши данные',
    content:
      'Ваши данные используются исключительно для: обработки и выполнения заказов, связи с вами по вопросам заказа, отправки информации о статусе доставки, а также передачи видеозаписи упаковки на ваш контактный номер — если вы указали такое пожелание в комментарии к заказу.',
  },
  {
    title: 'Передача данных третьим лицам',
    content:
      'Мы передаём ваши данные (имя, телефон, адрес пункта выдачи) службам доставки — Яндекс Доставке или СДЭК — исключительно в целях доставки заказа. Мы не продаём и не передаём ваши персональные данные иным третьим лицам в маркетинговых или иных целях.',
  },
  {
    title: 'Хранение данных',
    content:
      'Ваши данные хранятся только в течение срока, необходимого для выполнения заказа и возможного рассмотрения спорных ситуаций с доставкой. После закрытия заказа данные удаляются или обезличиваются. Видеозаписи упаковки хранятся в течение 30 дней с момента отправки заказа.',
  },
  {
    title: 'Ваши права',
    content:
      'Вы вправе в любое время запросить доступ к своим данным, потребовать их исправления или удаления. Для этого свяжитесь с нами через Telegram или электронную почту, указанные ниже. Мы обработаем ваш запрос в течение 5 рабочих дней.',
  },
  {
    title: 'Файлы cookie',
    content:
      'Наш сайт использует технические файлы cookie, необходимые для корректной работы. Мы не используем рекламные или аналитические cookie-файлы, передающие данные третьим лицам. Продолжая использовать сайт, вы соглашаетесь с использованием технических cookie.',
  },
  {
    title: 'Изменения в политике',
    content:
      'Мы можем обновлять эту политику в случае изменений в законодательстве или в нашей деятельности. Дата последнего обновления всегда указана в начале документа. При существенных изменениях мы уведомим вас через доступные каналы связи.',
  },
];
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
