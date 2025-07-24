<script setup lang="ts">
import logoSrc from '~/assets/logo.png'

import { BookPlus } from 'lucide-vue-next';


</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex flex-row bg-gray-900 w-full h-20 items-center gap-3.5 border-b-2 border-white px-4">
      <NuxtLink to="/" :prefetch="true" class="flex items-center space-x-4">
        <img class="w-16 filter invert" :src="logoSrc" alt="Logo">
        <div class="text-3xl text-white">SENTINELWATCH</div>
      </NuxtLink>



      <div class="flex space-x-4    mr-auto   ">
        <div class="grid grid-cols-1 border rounded-2xl overflow-hidden">
          <NuxtLink to="/user/auth/login" class="px-4 py-2 text-white hover:bg-blue-400 transition-colors">
            Login
          </NuxtLink>
          <div class="border-t border-gray-700">
            <NuxtLink to="/user/auth/sign-up" class="px-4 py-2 text-white hover:bg-blue-400 transition-colors">
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
            <p class=" font-bold  rounded-lg p-2">your projects</p>
            <NuxtLink to="/projects/create"
              class=" ml-12 border flex  w-25 hover:bg-green-500   p-2  rounded-lg bg-green-600  font-semibold">
              <div>Project</div>
              <BookPlus />
            </NuxtLink>
          </div>
          <ViewProjects></ViewProjects>
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