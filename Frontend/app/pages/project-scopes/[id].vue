<template>
    <div class=" flex flex-col">
        <TopBar :id="projectId"></TopBar>
        <div class="  w-full flex ">
            <div class="  m-auto ">
                <div class="flex mt-10 justify-start text-white">
                    <div class="flex items-center">
                        <img class="h-7 rounded-lg mr-2" :src="avatar">
                        <p class="text-2xl">{{ projectName }}</p>
                    </div>
                </div>

                <div class="border w-full my-4"></div>

                <div class="text-lg flex w-full items-center mb-4">
                    <p class="p-1.5 text-white">Project Scopes</p>
                    <NuxtLink :to="`/project-scopes/${projectId}-create`"
                        class="ml-auto border flex items-center hover:bg-blue-400 px-2 h-7 bg-blue-500 rounded-lg">
                        <p class="mr-1">Add scopes</p>
                        <FolderPlus />
                    </NuxtLink>
                </div>
                <ProjectScopesTable :id="projectId" />
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