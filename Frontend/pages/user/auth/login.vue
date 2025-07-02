<template>
  <div class="flex justify-center items-center">
    <div class="border-2 w-95 h-75 text-white bg-gray-900 rounded-2xl border-white m-80">
      <div class="text-center">
        <p class="text-4xl m-4">Login</p>
      </div>
      <form @submit.prevent="onSubmit">
        <div>
          <div class="m-3">
            <p class="my-2">Email</p>
            <input v-model="email" type="email" placeholder="enter email" class="border-2 rounded-3xl w-full p-1.5 h-10"
              :class="email ? 'border-red-500' : ''">
          </div>
          <div class="m-3">
            <p class="my-2">Password</p>
            <input v-model="password" type="password" placeholder="enter password"
              class="border-2 rounded-3xl w-full p-1.5 h-10" :class="password ? 'border-red-500' : ''">
          </div>
          <div class="m-3 text-center">
            <button type="submit" class="hover:bg-blue-400 bg-blue-500 text-white px-4 py-2 rounded-full">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="toast.message" class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300"
      :class="{
        'bg-green-500 text-white': toast.type === 'success',
        'bg-red-500 text-white': toast.type === 'error'
      }">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '~/store/sessionStore'
const password = ref("")
const email = ref("")


definePageMeta({
  layout: 'login-signin'
})


interface Toast {
  message: string
  type: 'success' | 'error'
}

const toast = reactive<Toast>({
  message: '',
  type: 'success'
})

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.message = message
  toast.type = type
  setTimeout(() => {
    toast.message = ''
  }, 3000)
}

function onSubmit() {

}



</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>