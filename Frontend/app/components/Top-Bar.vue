<template>
    <div class="flex justify-center flex-row bg-gray-900 text-white border-y">
        <div class="flex ">
            <NuxtLink :to="`/projects/${props.id}`" class="mx-5 border hover:bg-blue-500 p-1 rounded-lg m-1">
                environments
            </NuxtLink>
            <NuxtLink :to="`/project-scopes/${props.id}`" class="mx-5 border hover:bg-blue-500 p-1 rounded-lg m-1">
                project scopes
            </NuxtLink>
            <NuxtLink :to="`/project-access/${props.id}`" class="mx-5 border hover:bg-blue-500 p-1 rounded-lg m-1">
                project access
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String
    }
})
</script>