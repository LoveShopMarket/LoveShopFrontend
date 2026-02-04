import { ref } from 'vue';

export const accessToken = ref('');
export const isAuthenticated = ref(false);

export function setToken(token: string) {
  accessToken.value = token;
  isAuthenticated.value = !!token;
}
