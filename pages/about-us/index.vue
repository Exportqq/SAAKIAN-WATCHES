<template>
  <Header />

  <div class="bg-[#F2F0F1]">
    <!-- Hero: pinned, часы вырастают и центрируются при скролле, текст уходит вверх и растворяется -->
    <section
      ref="heroRef"
      class="relative px-[100px] max-md:px-[20px] pt-[100px] max-md:pt-[56px] pb-[80px] max-md:pb-[48px] overflow-hidden min-h-[100vh] max-md:min-h-0 flex flex-col justify-center"
    >
      <div
        class="max-w-[1400px] w-full mx-auto grid grid-cols-[1fr_auto] max-md:grid-cols-1 gap-[40px] items-center relative z-10"
      >
        <div ref="heroTextRef">
          <p class="text-[13px] font-bold uppercase tracking-widest text-[#9C7A45] mb-[18px]">О бренде</p>

          <h1
            class="text-[#000000] font-extrabold text-[64px] max-md:text-[32px] leading-[68px] max-md:leading-[36px] max-w-[620px]"
          >
            Мы измеряем не время. Мы измеряем доверие.
          </h1>

          <p class="text-[#666666] font-medium text-[18px] max-md:text-[14px] leading-relaxed max-w-[480px] mt-[26px]">
            Каждая модель в нашем каталоге проходит проверку подлинности, прежде чем попасть на ваше запястье. Это не
            обещание маркетинга — это единственный принцип, на котором построен магазин.
          </p>

          <ButtonUI
            v-if="isDesktop"
            @click="redirectCatalog()"
            class="mt-[36px]"
            :text="'СМОТРЕТЬ КАТАЛОГ'"
            :max-width="false"
            :rounded="62"
            :paddingX="58"
            :paddingY="16"
          />
          <ButtonUI
            v-if="isMobile"
            @click="redirectCatalog()"
            class="mt-[28px]"
            :text="'СМОТРЕТЬ КАТАЛОГ'"
            :max-width="true"
            :rounded="62"
            :paddingYMobile="16"
          />
        </div>

        <div
          v-if="isDesktop"
          ref="watchRef"
          class="relative w-[300px] h-[300px] shrink-0 justify-self-end"
          aria-hidden="true"
        >
          <div class="absolute inset-0 rounded-full border border-[#DDD9D3] bg-white"></div>

          <div
            v-for="tick in ticks"
            :key="tick"
            class="absolute left-1/2 top-1/2 origin-bottom"
            :style="{ height: '128px', transform: `translate(-50%, -100%) rotate(${tick}deg)` }"
          >
            <div :class="tick % 90 === 0 ? 'w-[2px] h-[10px] bg-[#9C7A45]' : 'w-[1px] h-[6px] bg-[#DDD9D3]'"></div>
          </div>

          <div class="absolute left-1/2 top-1/2 w-[2px] h-[74px] bg-[#000000] origin-bottom hand-hour"></div>
          <div class="absolute left-1/2 top-1/2 w-[1.5px] h-[100px] bg-[#000000] origin-bottom hand-minute"></div>
          <div class="absolute left-1/2 top-1/2 w-[1px] h-[108px] bg-[#9C7A45] origin-bottom hand-second"></div>
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-[#000000]"
          ></div>
        </div>
      </div>
    </section>

    <!-- Манифест: pinned, слова "проявляются" построчно по мере скролла -->
    <section
      ref="manifestoRef"
      class="bg-[#14130F] px-[100px] max-md:px-[24px] py-[140px] max-md:py-[64px] min-h-[70vh] max-md:min-h-0 flex items-center"
    >
      <div class="max-w-[880px] mx-auto text-center">
        <div class="w-[40px] h-[1px] bg-[#9C7A45] mx-auto mb-[32px]"></div>

        <p class="quote-font text-[36px] max-md:text-[20px] leading-[46px] max-md:leading-[30px]">
          <span
            v-for="(word, i) in manifestoWords"
            :key="i"
            class="manifesto-word italic"
            :ref="(el) => setWordRef(el, i)"
            >{{ word }}&nbsp;</span
          >
        </p>

        <p class="text-[#8A887F] text-[13px] uppercase tracking-widest mt-[28px]">Основатели проекта</p>
      </div>
    </section>

    <!-- Числа: считаются вверх при появлении -->
    <section class="px-[100px] max-md:px-[20px] py-[90px] max-md:py-[56px]">
      <div
        class="max-w-[1400px] mx-auto flex max-md:flex-wrap gap-[64px] max-md:gap-x-[40px] max-md:gap-y-[36px] max-md:justify-center"
      >
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat-item flex flex-col max-md:items-center">
          <h2 class="text-[#000000] font-semibold text-[40px] max-md:text-[26px]">
            <span class="stat-number" :data-value="stat.value">0</span>{{ stat.suffix }}
          </h2>
          <p class="text-[#666666] font-regular text-[16px] max-md:text-[12px] mt-[4px]">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Процесс: горизонтальный pinned scroll на десктопе, вертикальный стек на мобиле -->
    <section ref="stepsPinRef" class="px-[100px] max-md:px-[20px] pb-[100px] max-md:pb-[56px] overflow-hidden">
      <div class="max-w-[1400px] mx-auto">
        <p class="text-[13px] font-bold uppercase tracking-widest text-[#9C7A45] mb-[14px] steps-heading">Процесс</p>
        <h2
          class="text-[#000000] font-extrabold text-[40px] max-md:text-[24px] leading-[46px] max-md:leading-[30px] max-w-[640px] steps-heading"
        >
          Как каждая пара часов попадает в каталог
        </h2>
      </div>

      <div ref="stepsTrackRef" class="flex max-md:flex-col gap-[24px] mt-[56px] max-w-[1400px] mx-auto max-md:mx-auto">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="step-card bg-white rounded-[20px] border border-[#ECECEC] p-[28px] flex flex-col gap-[18px] shrink-0 w-[340px] max-md:w-full"
        >
          <span class="text-[13px] font-bold text-[#9C7A45]">{{ step.index }}</span>
          <div>
            <p class="text-[#000000] font-semibold text-[17px] leading-tight">{{ step.title }}</p>
            <p class="text-[#666666] text-[14px] leading-relaxed mt-[10px]">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ценности -->
    <section class="px-[100px] max-md:px-[20px] pb-[100px] max-md:pb-[56px]">
      <div class="max-w-[1400px] mx-auto grid grid-cols-3 max-md:grid-cols-1 gap-[24px]">
        <div v-for="value in values" :key="value.title" class="value-card border-t border-[#000000] pt-[22px]">
          <p class="text-[#000000] font-semibold text-[19px]">{{ value.title }}</p>
          <p class="text-[#666666] text-[14px] leading-relaxed mt-[10px] max-w-[320px]">{{ value.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-[100px] max-md:px-[20px] pb-[120px] max-md:pb-[64px]">
      <div
        ref="ctaRef"
        class="relative overflow-hidden max-w-[1400px] mx-auto bg-[#000000] rounded-[32px] px-[70px] max-md:px-[24px] py-[70px] max-md:py-[44px] flex max-md:flex-col items-center justify-between gap-[24px]"
      >
        <div ref="ctaGlowRef" class="cta-glow"></div>

        <h2
          class="text-white font-extrabold text-[34px] max-md:text-[22px] leading-tight max-w-[480px] max-md:text-center relative z-10"
        >
          Найдите часы, которым будете доверять
        </h2>

        <ButtonUI
          @click="redirectCatalog()"
          :text="'СМОТРЕТЬ КАТАЛОГ'"
          :max-width="isMobile"
          :rounded="62"
          :paddingX="58"
          :paddingY="16"
          :paddingYMobile="16"
          class="relative z-10"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
/**
 * Требуется пакет gsap: npm install gsap
 * Все scroll-scrubbed эффекты работают только на десктопе (min-width: 768px)
 * и отключаются при prefers-reduced-motion — на мобиле и при reduced motion
 * секции просто появляются как обычный контент, без пиннинга.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { globalRouting } from '~/src/composables/globbal';
import useWindowSizes from '~/src/composables/window_size';
import ButtonUI from '~/src/UI/ButtonUI.vue';
import Header from '../header/header.vue';

gsap.registerPlugin(ScrollTrigger);

const { isDesktop, isMobile } = useWindowSizes();
const { redirectCatalog } = globalRouting();

const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

const stats = [
  { value: 12, suffix: ' лет', label: 'НА РЫНКЕ' },
  { value: 15000, suffix: '+', label: 'ПРОВЕРЕННЫХ ЧАСОВ' },
  { value: 0, suffix: '', label: 'ПОДДЕЛОК В ПРОДАЖЕ' },
];

const steps = [
  {
    index: '01',
    title: 'Отбор',
    description: 'Берём модели только у проверенных поставщиков и частных владельцев с полной историей.',
  },
  {
    index: '02',
    title: 'Экспертиза',
    description: 'Механизм, корпус и серийный номер проверяет часовщик с опытом более 10 лет.',
  },
  { index: '03', title: 'Сервис', description: 'При необходимости проводим чистку и настройку хода перед отправкой.' },
  {
    index: '04',
    title: 'Гарантия',
    description: 'Каждая модель уходит клиенту с документом о подтверждённой подлинности.',
  },
];

const values = [
  { title: 'Подлинность', description: 'Мы не продаём то, в чём не уверены сами. Точка.' },
  { title: 'Курирование', description: 'Каталог собран, а не свален в кучу — каждая модель отобрана вручную.' },
  { title: 'Честный сервис', description: 'Отвечаем на вопросы до покупки так же внимательно, как после.' },
];

const manifestoText =
  '«Часы не должны кричать о статусе. Они должны быть безупречны на ощупь, точны на ходу и честны в своей истории — от мастерской до вашего запястья»';
const manifestoWords = manifestoText.split(' ');
const wordRefs: HTMLElement[] = [];
const setWordRef = (el: HTMLElement | null, i: number) => {
  if (el) wordRefs[i] = el;
};

const heroRef = ref<HTMLElement | null>(null);
const heroTextRef = ref<HTMLElement | null>(null);
const watchRef = ref<HTMLElement | null>(null);
const manifestoRef = ref<HTMLElement | null>(null);
const stepsPinRef = ref<HTMLElement | null>(null);
const stepsTrackRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const ctaGlowRef = ref<HTMLElement | null>(null);

let triggers: ScrollTrigger[] = [];

onMounted(async () => {
  await nextTick();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Числа считаются вверх при появлении — работает на любом устройстве
  gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
    const target = Number(el.dataset.value);
    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: reducedMotion ? 0 : 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString('ru-RU');
          },
        });
      },
    });
    triggers.push(st);
  });

  // Простой fade-up для карточек ценностей — везде
  gsap.utils.toArray<HTMLElement>('.value-card').forEach((el, i) => {
    gsap.set(el, { opacity: 0, y: reducedMotion ? 0 : 24 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out' }),
    });
    triggers.push(st);
  });

  // CTA: мягкое появление и блик
  if (ctaRef.value) {
    gsap.set(ctaRef.value, { opacity: 0, y: reducedMotion ? 0 : 30 });
    const st = ScrollTrigger.create({
      trigger: ctaRef.value,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(ctaRef.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
    });
    triggers.push(st);
  }

  if (!isDesktop.value || reducedMotion) return;

  // ---- Только десктоп + не reduced-motion: тяжёлые scroll-scrubbed эффекты ----

  // Hero: часы вырастают и центрируются, текст уходит и растворяется, секция запиннена
  if (heroRef.value && watchRef.value && heroTextRef.value) {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: '+=90%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });
    heroTl.to(heroTextRef.value, { opacity: 0, y: -40, ease: 'none' }, 0).to(
      watchRef.value,
      {
        scale: 1.6,
        x: -220,
        rotate: 25,
        ease: 'none',
      },
      0,
    );
    triggers.push(heroTl.scrollTrigger as ScrollTrigger);
  }

  // Манифест: слова проявляются одно за другим по мере скролла, секция запиннена
  if (manifestoRef.value && wordRefs.length) {
    gsap.set(wordRefs, { opacity: 0.15 });
    const manifestoTl = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoRef.value,
        start: 'top top',
        end: '+=100%',
        scrub: 0.4,
        pin: true,
        anticipatePin: 1,
      },
    });
    manifestoTl.to(wordRefs, { opacity: 1, stagger: 1 / wordRefs.length, ease: 'none' });
    triggers.push(manifestoTl.scrollTrigger as ScrollTrigger);
  }

  // Процесс: карточки едут по горизонтали, пока пользователь скроллит вертикально
  if (stepsPinRef.value && stepsTrackRef.value) {
    const track = stepsTrackRef.value;
    const scrollDistance = () => track.scrollWidth - track.parentElement!.offsetWidth;

    const stepsTl = gsap.to(track, {
      x: () => -scrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: stepsPinRef.value,
        start: 'top top',
        end: () => `+=${scrollDistance()}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    triggers.push(stepsTl.scrollTrigger as ScrollTrigger);
  }
});

onBeforeUnmount(() => {
  triggers.forEach((t) => t.kill());
  triggers = [];
});
</script>

<style scoped>
.quote-font {
  font-family: 'Georgia', 'Times New Roman', serif;
  color: #f2f0f1;
}

.manifesto-word {
  display: inline-block;
}

.hand-hour {
  transform: translate(-50%, -100%) rotate(305deg);
}

.hand-minute {
  transform: translate(-50%, -100%) rotate(60deg);
}

.hand-second {
  animation: spin 60s linear infinite;
}

@keyframes spin {
  from {
    transform: translate(-50%, -100%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -100%) rotate(360deg);
  }
}

.cta-glow {
  position: absolute;
  top: -40%;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(156, 122, 69, 0.35) 0%, rgba(156, 122, 69, 0) 70%);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .hand-second {
    animation: none;
    transform: translate(-50%, -100%) rotate(0deg);
  }
}
</style>
