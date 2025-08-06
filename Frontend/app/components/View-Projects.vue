<template>
    <div class="w-full">
        <div class="flex">
            <input v-model="search"
                class="border-l-2 border-t-2 text-white border-b-2 bg-gray-800 p-1  ml-2 border-gray-700 rounded-l-lg"
                placeholder="Search here  ">
            <Search class="h-10 w-8 border-t-2 border-b-2 border-r-2 rounded-r-lg text-white border-gray-700 bg-gray-800" />
        </div>
        <div class="p-2 ">
            <div v-for="project in filteredProjects" :key="project.name" class="flex items-center mb-2">
                <div class="text-white w-full hover:bg-gray-800 rounded-lg pl-2">
                    <NuxtLink class="flex items-center min-w-0" :to="`projects/${project.id}`">
                        <img v-if="projectImages[project.name]" :src="projectImages[project.name]"
                            class="w-5 h-5 mr-2 rounded-full flex-shrink-0" alt="Project Avatar">
                        <div class="min-w-0 w-44 flex-1">
                            <div class="        truncate  text-gray-300 hover:text-gray-200">
                                {{ project.name }}
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { Search } from 'lucide-vue-next'
import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'

const props = defineProps({
    data: {
        type: Array,

    }
})

const search = ref('')

const projectImages = reactive({})

const filteredProjects = computed(() => {
    if (!search.value) {
        return [...props.data].sort()
    }
    return props.data
        .filter(project =>
            project.name.toString().toLowerCase().includes(search.value.toLowerCase())
        )
        .sort()
})

const fetchProjectImages = () => {
    for (let i = 0; i < props.data.length; i++) {
        let project = props.data[i]
        const avatar = createAvatar(identicon, {
            seed: project["name"],
            size: 100,
            colors: ['#9be9a8', '#40c463', '#30a14e', '#216e39']
        }).toDataUri()

        projectImages[project["name"]] = avatar
    }
}

onMounted(() => {
    fetchProjectImages()
})
</script>