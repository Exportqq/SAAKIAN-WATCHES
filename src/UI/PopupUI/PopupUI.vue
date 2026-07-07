<template>
  <transition name="slide-down" appear>
    <div v-if="visible" class="popup-card fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px]">
      <span class="popup-dot" :class="dotClass" />
      <p class="popup-text">{{ message }}</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  show?: boolean;
}>();

const emit = defineEmits(['close']);

const visible = ref(false);

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal;

    if (newVal && props.duration) {
      setTimeout(() => {
        visible.value = false;
        emit('close');
      }, props.duration);
    }
  },
);

const dotClass = computed(() => {
  if (props.type === 'success') return 'popup-dot-success';
  if (props.type === 'error') return 'popup-dot-error';
  if (props.type === 'warning') return 'popup-dot-warning';
  return 'popup-dot-neutral';
});
</script>

<style scoped>
.popup-card {
  background: #ffffff;
  border: 1px solid #ededea;
  border-radius: 16px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 16px 40px -20px rgba(21, 20, 19, 0.25);
}

.popup-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.popup-dot-success {
  background: #1fb35a;
}
.popup-dot-error {
  background: #e0453a;
}
.popup-dot-warning {
  background: #c9a24b;
}
.popup-dot-neutral {
  background: #9c9c96;
}

.popup-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14.5px;
  color: #151413;
  text-align: center;
}

.slide-down-enter-active {
  transition: all 0.22s ease-out;
}
.slide-down-leave-active {
  transition: all 0.18s ease-in;
}
.slide-down-enter-from {
  transform: translate(-50%, -12px);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translate(-50%, 0);
  opacity: 1;
}
.slide-down-leave-from {
  transform: translate(-50%, 0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translate(-50%, -12px);
  opacity: 0;
}
</style>
