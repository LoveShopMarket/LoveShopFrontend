import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserRegisterDto } from './UserRegisterDto'
import { register } from '../api/registerApi'
import { PasswordError } from '@/shared/Errors/PasswordError'

export function useRegisterForm() {
  const router = useRouter()
  const submitted = ref(false)

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errors = reactive({
    password: [] as string[]
  })

  const submit = async () => {

    const result = UserRegisterDto.create(
      email.value,
      password.value,
      confirmPassword.value
    )

    if (!result.isSuccess) {
      errors.password = []

      result.getErrors.forEach(err => {
        if (err instanceof PasswordError) {
          errors.password.push(err.message)
        }
      })
      return
    }
    const Dto = result.getValue!

    await register(Dto.email, Dto.password)
    submitted.value = true
    router.back()
  }

  const goBack = () => router.back()

  return {
    email,
    password,
    confirmPassword,
    errors,
    submitted,
    submit,
    goBack
  }
}
