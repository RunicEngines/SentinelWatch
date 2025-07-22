<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import logoSrc from '~/assets/logo.png'
const Project_items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'add',
      icon: 'i-lucide-plus',
      to: "/projects/create",
      type: 'link'
    },
    {
      label:"delete",
      icon:"i-lucide-delete",
      to:"/projects/delete"
    }
  ]
])

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex flex-row bg-gray-900 w-full h-20 items-center gap-3.5 border-b-2 border-white px-4">
      <NuxtLink to="/" :prefetch="true" class="flex items-center space-x-4">
        <img class="w-16 filter invert" :src="logoSrc" alt="Logo">
        <div class="text-3xl text-white">SENTINELWATCH</div>
      </NuxtLink>

      <nav class="ml-10 flex-grow">
        <NuxtLink to="/projects" class="text-3xl text-white hover:text-blue-400 transition-colors">
          Projects
        </NuxtLink>
        <UDropdownMenu :items="Project_items" :ui="{
          content: 'w-48'
        }">
          <UButton icon="i-lucide-arrow-down" color="neutral" variant="outline" />
        </UDropdownMenu>
      </nav>

      <div class="flex space-x-4  ">
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

    <main class="flex-grow bg-gray-800 w-full">
      <slot />
    </main>

    <footer class="text-white bg-gray-900 h-16 flex items-center justify-center">
      © Sentinel Inc. {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style scoped>
/* Optional additional styling */
</style>