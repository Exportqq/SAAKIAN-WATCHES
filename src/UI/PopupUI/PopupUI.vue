<template>
  <transition name="slide-down" appear>
    <div
      v-if="visible"
      :class="[
        'fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px] rounded-[14px] shadow-lg px-5 py-4 flex justify-center items-center',
        bgColor,
      ]"
    >
      <p class="text-center font-inter font-semibold text-[15px] text-white">
        {{ message }}
      </p>
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

const bgColor = computed(() => {
  if (props.type === 'success') return 'bg-green-600';
  if (props.type === 'error') return 'bg-red-600';
  if (props.type === 'warning') return 'bg-yellow-600';
  return 'bg-gray-800';
});
</script>

<style scoped>
.slide-down-enter-active {
  transition: all 0.22s ease-out;
}
.slide-down-leave-active {
  transition: all 0.18s ease-in;
}
.slide-down-enter-from {
  transform: translateY(-12px);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translateY(-12px);
  opacity: 0;
}
</style>
