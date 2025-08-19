<template>
    <div class="text-white flex h-screen flex-col">
        <TopBar :id="projectId"></TopBar>
        <div class=" flex ">
        </div>
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
                        <p class="p-1.5">Project Access</p>
                        <NuxtLink :to="`/project-access/${projectId}-create`"
                            class="ml-auto border flex items-center hover:bg-blue-400 px-2 h-7 bg-blue-500 rounded-lg">
                            <p class="mr-1">Add Project Access</p>
                            <FolderPlus />
                        </NuxtLink>
                    </div>
                    <ProjectAccess :id="projectId"></ProjectAccess>
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