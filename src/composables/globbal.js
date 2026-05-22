import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const globalRouting = () => {
  const router = useRouter();
  const route = useRoute();

  const isMainActive = computed(() => route.path === '/');

  const isBasketPVZ = computed(() => route.path === '/Basket/PickUpDelivery');

  const redirectMain = () => {
    router.push('/');
  };

  const redirectDelivery = () => {
    router.push('/Basket/PickUpDelivery');
  };

  const redirectChats = () => {
    router.push('/Chats/Chats');
  };

  const redirectProgress = () => {
    router.push('/Progress/Progress');
  };

  const redirectDiary = () => {
    router.push('/Profile/Profile');
  };

  const redirectRegister = () => {
    router.push('/Authentication/Register/Register');
  };

  const redirectAuthentication = () => {
    router.push('/Authentication/Authentication');
  };

  const redirectAuth = () => {
    router.push('/Authentication/Auth/Auth');
  };

  const redirectForgotPassword = () => {
    router.push('/Authentication/Forgot/ForgotPassword/ForgotPassword');
  };

  const redirectFriends = () => {
    router.push('/Profile/components/Frends');
  };

  const redirectSettings = () => {
    router.push('/Profile/components/Settings/Setting');
  };

  return {
    isMainActive,
    isBasketPVZ,

    redirectMain,
    redirectDelivery,
  };
};
