<template>
  <Teleport to="body">
    <Transition name="success-fade">
      <div v-if="show" class="success-overlay">
        <div class="success-content">
          <div class="ring-wrap">
            <svg class="ring-svg" viewBox="0 0 100 100">
              <circle class="ring-track" cx="50" cy="50" r="46" />
              <circle
                class="ring-progress"
                cx="50"
                cy="50"
                r="46"
                :style="{
                  strokeDasharray: CIRCUMFERENCE,
                  strokeDashoffset: progressOffset,
                  transitionDuration: (duration ?? 10000) + 'ms',
                }"
              />
            </svg>

            <svg class="check-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12.5L9.5 18L20 6"
                stroke="#151413"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <p v-if="orderNumber" class="success-eyebrow">Заказ №{{ orderNumber }}</p>
          <h2 class="success-title">Заказ успешно создан</h2>
          <p class="success-text">Мы свяжемся с вами в течение дня, чтобы подтвердить детали</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps<{
  show: boolean;
  duration?: number;
  orderNumber?: string;
}>();

const emit = defineEmits<{ complete: [] }>();

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const progressOffset = ref(0);
let completeTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.show,
  async (visible) => {
    if (completeTimer) clearTimeout(completeTimer);

    if (visible) {
      // Сбрасываем кольцо в полное состояние, затем на следующем кадре
      // запускаем CSS-переход до полного "опустошения" — так рисуется таймер
      progressOffset.value = 0;
      await nextTick();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressOffset.value = CIRCUMFERENCE;
        });
      });

      completeTimer = setTimeout(() => {
        emit('complete');
      }, props.duration ?? 10000);
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (completeTimer) clearTimeout(completeTimer);
});
</script>

<style scoped>
.success-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 360px;
}

.ring-wrap {
  position: relative;
  width: 104px;
  height: 104px;
  margin-bottom: 28px;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-track {
  fill: none;
  stroke: #ededea;
  stroke-width: 4;
}

.ring-progress {
  fill: none;
  stroke: #c9a24b;
  stroke-width: 4;
  stroke-linecap: round;
  transition-property: stroke-dashoffset;
  transition-timing-function: linear;
}

.check-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 34px;
  height: 34px;
  transform: translate(-50%, -50%);
}

.success-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9c9c96;
  margin-bottom: 10px;
}

.success-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 26px;
  color: #151413;
}

.success-text {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 22px;
  color: #7a7a75;
  margin-top: 10px;
}

.success-fade-enter-active,
.success-fade-leave-active {
  transition: opacity 0.25s ease;
}
.success-fade-enter-from,
.success-fade-leave-to {
  opacity: 0;
}
</style>
