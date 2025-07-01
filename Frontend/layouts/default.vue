<script setup>
import logoSrc from '~/assets/logo.png'
</script>

<template>
    <header class="flex flex-row bg-gray-900 w-full h-20 gap-3.5 border-b-2 border-white">
        <NuxtLink to="/" :prefetch="true" class=" flex flex-row text-center items-center ">
            <img class=" w-22 filter invert" :src="logoSrc" alt="Logo">
            <div class=" text-3xl text-white justify-center mt-5 ">SENTINELWATCH</div>
        </NuxtLink>
        <div class="flex ml-auto  gap-0.5">
            <NuxtLink to="/user/auth/login" class="   flex  items-center ">
                <div
                    class="  flex items-center justify-center px-3 py-3  bg-blue-500 text-white border-2 border-white font-bold  w-24 rounded-xl  m-2.5 text-3xl h-12 hover:bg-blue-400  ">
                    <p>login</p>

                </div>
            </NuxtLink>
            <NuxtLink to="user/auth/sign-up" class="   flex   items-center ">
                <div
                    class="  flex items-center justify-center px-3 py-3  bg-blue-500 text-white border-2 border-white font-bold  w-35 rounded-xl  m-2.5 text-3xl h-12 hover:bg-blue-400  ">
                    <p>sign up</p>

                </div>
            </NuxtLink>
        </div>
    </header>
    <main class="bg-gray-800 w-full h-screen">
        <slot />
    </main>
    <footer class=" text-white  bg-gray-900">
        © sentinel Inc.
    </footer>
</template>