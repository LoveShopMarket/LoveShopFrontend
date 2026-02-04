import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { login } from '../api/loginApi';


export function useLoginForm() {
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const goBack = () => router.back();
  const errors = ref<string[]>([])
  const submit = async () => {
    const loginResult = await login(email.value, password.value);
    if (loginResult.isSuccess) {
      goBack()
    }
    else {
      errors.value = []
      errors.value = loginResult.getErrors.map(err => err.message);
    }
  }
  // router.push('/product'); // будущая страница
  return {
    email,
    password,
    errors,
    submit,
    goBack,
  };
}
