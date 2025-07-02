<template>
  <div class="grid justify-center ">
    <div class="border-2 w-95 h-auto text-white bg-gray-900 rounded-2xl border-white m-80">
      <div class="text-center">
        <p class="text-4xl m-4">Sign Up</p>
      </div>
      <form @submit.prevent="Click()">
        <div>
          <div class="m-3">
            <p class="my-2">Email</p>
            <input v-model="email" type="email" placeholder="enter email" class="border-2 rounded-3xl w-full p-1.5 h-10"
              :class="states.email.type === 'error' ? 'border-red-600' : 'border-white'">
            <p v-if="states.email.type === 'error'" class="text-red-600">
              {{ states.email.message }}
            </p>
          </div>

          <div class="m-3">
            <p class="my-2">Name</p>
            <input v-model="name" type="text" placeholder="enter name" class="border-2 rounded-3xl w-full p-1.5 h-10"
              :class="states.name.type === 'error' ? 'border-red-600' : 'border-white'">
            <p v-if="states.name.type === 'error'" class="text-red-600">
              {{ states.name.message }}
            </p>
          </div>

          <div class="m-3">
            <p class="my-2">Description (Optional)</p>
            <textarea v-model="description" placeholder="enter description"
              class="border-2 rounded-3xl w-full h-36 p-1.5"
              :class="states.description.type === 'error' ? 'border-red-600' : 'border-white'"></textarea>
            <p v-if="states.description.type === 'error'" class="text-red-600">
              {{ states.description.message }}
            </p>
          </div>

          <div class="m-3">
            <p class="my-2">Password</p>
            <input v-model="password" type="password" placeholder="enter password"
              class="border-2 rounded-3xl w-full p-1.5 h-10"
              :class="states.password.type === 'error' ? 'border-red-600' : 'border-white'">
            <p v-if="states.password.type === 'error'" class="text-red-600">
              {{ states.password.message }}
            </p>
          </div>
          <div class="m-3 text-center">
            <button type="submit" @click="Click"
              class="hover:bg-blue-400 bg-blue-500 text-white px-4 py-2 rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { options } from '#build/eslint.config.mjs'

definePageMeta({
  layout: 'login-signin'
})

const email = ref("")
const password = ref("")
const name = ref("")
const description = ref("")
const states = reactive<{ [key: string]: Toast }>({
  email: { message: "no error", type: "success" },
  password: { message: "no error", type: "success" },
  name: { message: "no error", type: "success" },
  description: { message: "no error", type: "success" }
})
check()
function check() {
  let states: { [key: string]: Toast } = {}
  const specialChars = [
    '!', '@', '#', '$', '%',
    '^', '&', '*', '(', ')',
    '-', '_', '+', '=',
    '[', ']', '{', '}',
    '|', '\\', ':', ';',
    '"', "'", '<', '>',
    ',', '.', '?', '/'
  ]

  let list_of_values = [email, password, name, description]
  let list_of_name = ["email", "password", "name", "description"]
  for (let i = 0; i < list_of_values.length; i++) {
    let name = list_of_name[i]
    let value = list_of_values[i]
    if (value.value !== "" || name == "description") {
      states[name] = { message: "success", type: "success" }
    } else {
      states[name] = { message: `enter ${name}`, type: "error" }
    }
  }
  if (states["description"].message.includes("error") && description.value.length > 300) {
    states["description"] = { message: "must be under 300 character", type: "error" }
  }
  if (states["password"].message.includes("error") && password.value.length > 8 && specialChars.some(char => password.value.includes(char))) {
    states["password"] = { message: "must have more than 8 characters and have special characters", type: "error" }

  }
  return states
}




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

function Click() {
  navigateTo("/")

  Object.assign(states, check())

  for (let key in states) {
    if (states[key].type === 'error') {
      showToast(states[key].message, states[key].type)
    }
  }

  useFetch('/api/user/sign-up', {
    method: "post",
    body: {
      "description": description,
      "email": email,
      "name": name,
      "secret": password,
      "enable": true
    }
  })

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