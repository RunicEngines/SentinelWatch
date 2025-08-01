<template>
    <div>
        <div class=" flex  flex-col w-full  justify-center">
            <div class=" m-auto  w-4xl">
                <div class=" flex   mt-10 justify-start    ">
                    <div class=" flex">
                        <img class=" h-7 rounded-lg" :src="avatar">
                        <p class="   ml-2  text-2xl">{{ response.data.name }}</p>
                    </div>
                </div>
                <div class="     border w-full"> </div>
                <div class="">
                    <div class=" text-lg flex w-full">
                        <p class=" p-1.5">Environments</p>
                        <NuxtLink :to="`/environments/${projectId}-create`" class=" ml-auto border flex  p-1 w-fit bg-blue-500 rounded-lg">
                            <p class=" mr-1">environment</p>
                            <FolderPlus />       
                        </NuxtLink>
                    </div>
                    <div>
                        <environment-table></environment-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'
import { FolderPlus } from 'lucide-vue-next';


const route = useRoute()
const projectId = route.params.id
const response = ref(null)
const avatar = ref(null)

const environement = await useFetch("/api/environments/get_by_projectId", {
    query: { id: projectId }
})

response.value = await useFetch("/api/projects/get_id", {
    query: { id: projectId }
})
avatar.value = createAvatar(identicon, {
    seed: response.value.data.name,
    size: 100,
    colors: ['#9be9a8', '#40c463', '#30a14e', '#216e39']
}).toDataUri()



</script>