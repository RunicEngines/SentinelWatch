<template>
    <div class="text-white">
        <div class="flex flex-col w-full justify-center">
            <div class="m-auto w-4xl">
                <div class="flex mt-10 justify-start">
                    <div class="flex items-center">
                        <img class="h-7 rounded-lg mr-2" :src="avatar">
                        <p class="text-2xl">{{ projectName }}</p>
                    </div>
                </div>

                <div class="border w-full my-4"></div>

                <div>
                    <div class="text-lg flex w-full items-center mb-4">
                        <p class="p-1.5">Environments</p>
                        <NuxtLink :to="`/environments/${projectId}-create`"
                            class="ml-auto border flex items-center hover:bg-blue-400 px-2 h-7 bg-blue-500 rounded-lg">
                            <p class="mr-1">Add Environment</p>
                            <FolderPlus />
                        </NuxtLink>
                    </div>

                    <EnvironmentTable :id="projectId" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'
import { FolderPlus } from 'lucide-vue-next'

const route = useRoute()
const projectId = route.params.id

const { data: projectData } = await useFetch("/api/projects/get_id", {
    query: { id: projectId }
})



const projectName = projectData.value?.name || 'Project'
const avatar = createAvatar(identicon, {
    seed: projectName,
    size: 100,
    colors: ['#9be9a8', '#40c463', '#30a14e', '#216e39']
}).toDataUri()
</script>