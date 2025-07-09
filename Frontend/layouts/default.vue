<script setup lang="ts">
import logoSrc from '~/assets/logo.png'


</script>

<template>
    <header class="flex flex-row bg-gray-900 w-full h-20 gap-3.5 border-b-2 border-white ">
        <NuxtLink to="/" :prefetch="true" class=" flex  flex-2/12 flex-row text-center items-center ">
            <img class=" w-22 filter invert" :src="logoSrc" alt="Logo">
            <div class=" text-3xl text-white justify-center mt-5 ">SENTINELWATCH</div>
        </NuxtLink>
        <div class=" flex  flex-1/2   m-4  bg-gray-800 rounded-3xl ">
            <NuxtLink to="/projects/" class="= ml-10  text-3xl text-white">
                projects
            </NuxtLink>

        </div>
        <div class=" ml-auto  grid  grid-cols-1 border  rounded-2xl  ">
            <NuxtLink to="/user/auth/login" class="hover:bg-blue-400   flex justify-center  items-center   rounded-t-2xl  ">
                <div
                    class="    flex  justify-center    text-white    font-bold      mx-1    ">
                    <p>login</p>

                </div>
            </NuxtLink>
            <NuxtLink to="user/auth/sign-up" class="hover:bg-blue-400    justify-center  items-center   rounded-b-2xl ">
                <div
                    class="  flex items-center justify-center    text-white  border-t-2  font-bold      mx-1  hover:bg-blue-400  ">
                    <p>sign up</p>

                </div>
            </NuxtLink>
        </div>
    </header>
    <main class="bg-gray-800 w-full h-screen">
        <slot />
    </main>
    <footer class=" text-white  bg-gray-900 h-3">
        © sentinel Inc.
    </footer>
</template>