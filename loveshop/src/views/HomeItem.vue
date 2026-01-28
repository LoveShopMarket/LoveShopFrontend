<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-800">LoveShop</h1>
      <p class="text-gray-600 text-lg">Добро пожаловать!</p>
      <button
        @click="goToLogin"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
      >
        Войти
      </button>
      <button
        @click="goToRegister"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition"
      >
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>
