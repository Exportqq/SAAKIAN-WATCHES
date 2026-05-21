<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="loading" class="overlay">
        <div class="loader">
          <div class="watch">
            <div class="hand hour" />
            <div class="hand minute" />
            <div class="center" />
          </div>

          <span class="text">ЗАГРУЗКА</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useGlobalLoader } from '~/src/composables/useGlobalLoader';

const { loading } = useGlobalLoader();
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.watch {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 9999px;
  border: 4px solid #ffffff;
  box-shadow:
    0 0 30px rgba(255, 255, 255, 0.08),
    inset 0 0 20px rgba(255, 255, 255, 0.04);
}

.hand {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform-origin: bottom center;
  border-radius: 999px;
}

.hour {
  width: 4px;
  height: 28px;
  background: #ffffff;
  margin-left: -2px;
  animation: rotateHour 4s linear infinite;
}

.minute {
  width: 3px;
  height: 42px;
  background: #ffffff;
  margin-left: -1.5px;
  opacity: 0.85;
  animation: rotateMinute 1s linear infinite;
}

.center {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text {
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.28em;
}

@keyframes rotateMinute {
  from {
    transform: translateX(-50%) rotate(0deg);
  }

  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes rotateHour {
  from {
    transform: translateX(-50%) rotate(0deg);
  }

  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
