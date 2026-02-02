<script setup lang="ts">
import { useLoginForm } from '../model/useLoginForm';

const { email, password, error, submit, goBack } = useLoginForm();
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Вход</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-bold mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Войти
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
