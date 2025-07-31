<template>
    <div>
        {{ projectId }}
        <div class=" flex  flex-col w-full ">
            <div class=" m-auto">
                <div class=" flex   justify-start   ">
                    <div class=" ">
                        <img>
                        <p class="    text-2xl">Project name</p>
                    </div>
                </div>
                <div class="     bg-gray-900 flex border w-3xl">
                    {{ response }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'

const route = useRoute()
const projectId = route.params.id
const response = ref(null)

response.value = useFetch("/api/projects/get_id", {
    query: { id: projectId }
})



</script>