<script setup lang="ts">
defineProps<{ show: boolean }>();
const emit = defineEmits<{ close: []; login: []; guest: [] }>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="show" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-card">
          <button class="modal-close" @click="emit('close')" aria-label="Закрыть">×</button>

          <span class="modal-accent" />

          <h2 class="modal-title">Войдите, чтобы продолжить</h2>

          <p class="modal-text">
            Чтобы оформить заказ, нужно войти или создать аккаунт. Все товары останутся в корзине — ничего не пропадёт.
          </p>

          <div class="modal-actions">
            <button class="modal-btn-primary" @click="emit('login')">Войти или зарегистрироваться</button>
            <button class="modal-btn-guest" @click="emit('guest')">Продолжить без регистрации</button>
            <p class="modal-hint">Без аккаунта заказ оформится, но бонусы за покупку копиться не будут.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(21, 20, 19, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 28px 28px;
  position: relative;
  box-shadow: 0 30px 60px -20px rgba(21, 20, 19, 0.3);
}

.modal-accent {
  display: block;
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background: #c9a24b;
  margin-bottom: 20px;
}

.modal-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 21px;
  color: #151413;
}

.modal-text {
  font-family: 'Inter', sans-serif;
  font-size: 14.5px;
  line-height: 22px;
  color: #7a7a75;
  margin-top: 10px;
}

.modal-actions {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9c9c96;
  font-size: 20px;
  line-height: 1;
  background: transparent;
}
.modal-close:hover {
  background: #f5f4f1;
}

.modal-btn-guest {
  height: 44px;
  border-radius: 62px;
  background: transparent;
  border: 1px solid #ededea;
  color: #151413;
  font-size: 14px;
  font-weight: 500;
}

.modal-hint {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 17px;
  color: #9c9c96;
  text-align: center;
  margin-top: 2px;
}
.modal-btn-primary {
  height: 50px;
  border-radius: 62px;
  background: #151413;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .modal-card {
  transform: scale(0.96) translateY(6px);
}
</style>
