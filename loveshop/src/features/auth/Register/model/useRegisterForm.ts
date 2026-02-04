import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserRegisterDTO as UserRegisterDTO } from './UserRegisterDTO'
import { register } from '../api/registerApi'
import { PasswordError } from '@/shared/Errors/PasswordError'

export function useRegisterForm() {
  const router = useRouter()
  const submitted = ref(false)

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errors = reactive({
    error: [] as string[]
  })

  const submit = async () => {

    const userRegisterDTO = UserRegisterDTO.create(
      email.value,
      password.value,
      confirmPassword.value
    )

    if (!userRegisterDTO.isSuccess) {
      errors.error = []

      userRegisterDTO.getErrors.forEach(err => {
        if (err instanceof PasswordError) {
          errors.error.push(err.message)
        }
      })
      return
    }
    const userRegisterDTOValue = userRegisterDTO.getValue!

    const registerResult = await register(userRegisterDTOValue.email, userRegisterDTOValue.password)
    if (registerResult.isSuccess) {
      submitted.value = true
      router.back()
    }
    else {
      errors.error = []
      registerResult.getErrors.forEach(err => {
          errors.error.push(err.message)
      })
    }
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
