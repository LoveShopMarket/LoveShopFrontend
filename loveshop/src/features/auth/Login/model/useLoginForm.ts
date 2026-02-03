import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/loginApi';

export function useLoginForm() {
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const error = ref('');

  const submit = async () => {
      await login(email.value, password.value);
      // router.push('/product'); // будущая страница
  };

  const goBack = () => router.back();

  return {
    email,
    password,
    error,
    submit,
    goBack,
  };
}
