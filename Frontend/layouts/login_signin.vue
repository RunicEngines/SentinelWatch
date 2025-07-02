<script setup>
import logoSrc from '~/assets/logo.png'
</script>

<template>
    <header class="flex flex-row bg-gray-900 w-full h-20 gap-3.5 border-b-2 border-white">
        <NuxtLink to="/" :prefetch="true" class=" flex flex-row text-center items-center ">
            <img class=" w-22 filter invert" :src="logoSrc" alt="Logo">
            <div class=" text-3xl text-white justify-center mt-5 ">SENTINELWATCH</div>
        </NuxtLink>

    </header>
    <main class="bg-gray-800 w-full h-screen">
        <slot />
    </main>
    <footer class=" text-white  bg-gray-900">
        © sentinel Inc.
    </footer>
</template>