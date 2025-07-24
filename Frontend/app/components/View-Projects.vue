<template>
    <div>
        <div class="flex">
            <input v-model="search"
                class="border-l-2 border-t-2 border-b-2 bg-gray-800 p-1 border-gray-700 rounded-l-lg"
                placeholder="Search here">
            <Search class="h-10 w-8 border-t-2 border-b-2 border-r-2 rounded-r-lg border-gray-700 bg-gray-800" />
        </div>
        <div class="p-2">
            <div v-for="project in filteredProjects" :key="project" class="flex items-center mb-2">
                <div class="flex">
                    <img v-if="projectImages[project]" :src="projectImages[project]" class="w-5 h-5 mr-2 rounded-full"
                        alt="Project Avatar">

                    <div class=" ">{{ project }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { Search } from 'lucide-vue-next'


const props = defineProps({
    data: {
        type: Array,
        default: () => [
            'refactorartist/buraq',
            'padawont/ERM',
            'RunicEngines/SentinelWatch',
            'padawont/pacman-ai',
            'padawont/magic-sqaure-solver',
            'padawont/python_pip',
            'padawont/sqlite',
            'padawont/salemanager',
            'padawont/sales_manager',
            'padawont/calculator',
            'padawont/SentinelGuard',
            'padawont/fun-with-classes',
            'padawont/tutorials'
        ]
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
            project.toString().toLowerCase().includes(search.value.toLowerCase())
        )
        .sort()
})

const fetchProjectImages = async () => {
    for (const project of props.data) {
        try {
            const response = await fetch(`https://api.github.com/repos/${project}`)
            const data = await response.json()

            if (data.owner && data.owner.avatar_url) {
                projectImages[project] = data.owner.avatar_url
            } else {
                projectImages[project] = 'https://via.placeholder.com/150'
            }
        } catch (error) {
            console.error(`Error fetching image for ${project}:`, error)
            projectImages[project] = 'https://via.placeholder.com/150'
        }
    }
}

onMounted(() => {
    fetchProjectImages()
})
</script>