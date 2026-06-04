<template>
  <footer
    class="mt-[100px] max-md:mt-[60px] border-t border-[#ECECEC] bg-white px-[100px] max-md:px-[20px] py-[60px] max-md:py-[40px]"
  >
    <div class="max-w-[1400px] mx-auto">
      <div class="grid grid-cols-3 max-md:grid-cols-1 gap-10">
        <div class="space-y-4">
          <img src="/logo.svg" alt="logo" class="h-[28px] w-auto" />
          <p class="text-[13px] text-[#888] leading-relaxed max-w-[260px]">
            Магазин оригинальных часов. Гарантия подлинности на все модели.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-[13px] font-bold uppercase tracking-widest text-[#999]">Поддержка</p>

          <div class="space-y-2">
            <button class="text-[14px] text-[#444] hover:text-black transition text-left" @click="supportModal = true">
              Помощь с заказом
            </button>

            <p class="text-[14px] text-[#444]">Возврат</p>
            <p class="text-[14px] text-[#444]">Доставка</p>
          </div>
        </div>

        <div class="space-y-3">
          <p class="text-[13px] font-bold uppercase tracking-widest text-[#999]">Мы в соцсетях</p>

          <div class="space-y-3">
            <a href="https://t.me/lilexport" target="_blank" class="flex items-center gap-3 group">
              <div
                class="w-9 h-9 rounded-full bg-[#F5F5F5] group-hover:bg-black transition flex items-center justify-center shrink-0"
              >
                <img src="/telegram.webp" alt="Telegram" class="w-6 h-6 object-contain" />
              </div>

              <span class="text-[14px] text-[#444] group-hover:text-black transition"> Telegram </span>
            </a>

            <a href="https://www.avito.ru/" target="_blank" class="flex items-center gap-3 group">
              <div
                class="w-9 h-9 rounded-full bg-[#F5F5F5] group-hover:bg-black transition flex items-center justify-center shrink-0"
              >
                <img src="/avito.svg" alt="Авито" class="w-7 h-7 object-contain" />
              </div>

              <span class="text-[14px] text-[#444] group-hover:text-black transition"> Авито </span>
            </a>
          </div>
        </div>
      </div>

      <div
        class="mt-[50px] pt-6 border-t border-[#F0F0F0] flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:text-center"
      >
        <p class="text-[13px] text-[#BBB']">© {{ new Date().getFullYear() }} Все права защищены</p>

        <p class="text-[13px] text-[#BBB]">Политика конфиденциальности</p>
      </div>
    </div>
  </footer>

  <Transition name="fade">
    <div
      v-if="supportModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      @click.self="supportModal = false"
    >
      <div class="bg-white w-full max-w-[420px] rounded-[28px] p-7 space-y-5">
        <div class="flex items-center justify-between">
          <h2 class="text-[20px] font-extrabold">Помощь с заказом</h2>

          <button
            class="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#eee] transition"
            @click="supportModal = false"
          >
            <span class="text-[18px] leading-none text-[#555]">×</span>
          </button>
        </div>

        <p class="text-[14px] text-[#777]">Выберите удобный способ связи — ответим как можно скорее.</p>

        <div class="space-y-3">
          <a
            href="https://t.me/lilexport"
            target="_blank"
            class="flex items-center gap-4 p-4 rounded-[18px] border border-[#ECECEC] hover:border-black transition group"
          >
            <div class="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
              <img src="/telegram.webp" alt="Telegram" class="w-6 h-6 object-contain" />
            </div>

            <div>
              <p class="text-[15px] font-semibold group-hover:text-black transition">Telegram</p>

              <p class="text-[13px] text-[#999]">@lilexport</p>
            </div>
          </a>

          <a
            href="mailto:smg05892@gmail.com"
            class="flex items-center gap-4 p-4 rounded-[18px] border border-[#ECECEC] hover:border-black transition group"
          >
            <div class="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 fill-[#555]" viewBox="0 0 24 24">
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
            </div>

            <div>
              <p class="text-[15px] font-semibold group-hover:text-black transition">Эл. почта</p>

              <p class="text-[13px] text-[#999]">smg05892@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const supportModal = ref(false);
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
