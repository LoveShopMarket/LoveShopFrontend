<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserLoginDto } from '@/dtos/userLogin'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = reactive({
  email: '',
  password: [] as string[]
})

const handleRegister = () => {
  errors.email = ''
  errors.password = []
  const user = UserLoginDto.create(
    email.value,
    password.value,
    confirmPassword.value
  );

  if (!user.isSuccess) {
    const emailErrors = user.getErrors.filter(e => e.name === 'EmailError').map(e => e.message);
    errors.password  = user.getErrors.filter(e => e.name === 'PasswordError').map(e => e.message);
    errors.email = emailErrors.join('; ');
    return;
  }

  console.log('Register:', {
    email: email.value,
    password: password.value,
  })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Регистрация</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          <input
            id="email"
            v-model="email"
            :class="['input', errors.email ? 'border-red-500' : 'border-gray-300']"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-gray-700 font-bold mb-2">Пароль</label>
          <span
            v-for="err in errors.password"
            :key="err"
            class="text-red-500 text-sm block"
          >
            {{ err }}
          </span>
          <input
            id="password"
            v-model="password"
            :class="['input', errors.password ? 'border-red-500' : 'border-gray-300']"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-gray-700 font-bold mb-2"
            >Подтвердите пароль</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Зарегистрироваться
        </button>
      </form>

      <button
        @click="goBack"
        class="w-full mt-4 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
      >
        Назад
      </button>
    </div>
  </div>
</template>
