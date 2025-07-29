<script setup>
import logoSrc from '~/assets/logo.png'
import { BookPlus } from 'lucide-vue-next';
import { ref } from 'vue'

const response = await useFetch("/api/projects/get")
const list_of_project = ref([])

if (response.data.value) {
  const cleanData = JSON.parse(JSON.stringify(response.data.value))
  for (let i = 0; i < cleanData.length; i++) {
    list_of_project.value.push({name:cleanData[i]["name"],id:cleanData[i]["id"]})
  }
}
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex flex-row bg-gray-900 w-full h-20 items-center justify-between border-b-2 border-white px-4">
      <NuxtLink to="/" :prefetch="true" class="flex items-center space-x-4">
        <img class="w-16 filter invert" :src="logoSrc" alt="Logo">
        <div class="text-3xl text-white">SENTINELWATCH</div>
      </NuxtLink>

      <div class="flex space-x-4">
        <div class="grid grid-cols-1 border rounded-2xl overflow-hidden">
          <div class="flex flex-col w-20 border rounded-2xl overflow-hidden">
            <NuxtLink to="/user/auth/login" class="flex justify-center text-white hover:bg-blue-500 py-2">
              Login
            </NuxtLink>

            <NuxtLink to="/user/auth/sign-up" class="flex justify-center text-white hover:bg-blue-500 py-2 border-t">
              Sign Up
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="flex bg-gray-800 w-full">

      <div>
        <div class=" bg-gray-900 border  w-75   h-screen">
          <div name="users"></div>
          <div class=" flex  my-1">
            <p class="   ml-2 font-bold  rounded-lg p-2">your projects</p>
            <NuxtLink to="/projects/create"
              class=" ml-12 border flex  w-25 hover:bg-blue-500   p-2  rounded-lg bg-blue-600  font-semibold">
              <div>Project</div>
              <BookPlus />
            </NuxtLink>
          </div>
          <ViewProjects :data="list_of_project"></ViewProjects>
        </div>
      </div>
      <div>

        <slot />
      </div>
    </main>

    <footer class="text-white bg-gray-900 h-16 flex items-center justify-center">
      © Sentinel Inc. {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style scoped>
/* Optional additional styling */
</style>