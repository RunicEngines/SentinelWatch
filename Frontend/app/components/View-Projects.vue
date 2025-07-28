<template>
    <div>
        <div class="flex">
            <input 
                v-model="search"
                class="border-l-2 border-t-2 border-b-2 bg-gray-800 p-1 border-gray-700 rounded-l-lg"
                placeholder="Search here"
            >
            <Search 
                class="h-10 w-8 border-t-2 border-b-2 border-r-2 rounded-r-lg border-gray-700 bg-gray-800" 
            />
        </div>
        <div class="p-2">
            <div 
                v-for="project in filteredProjects" 
                :key="project" 
                class="flex items-center mb-2"
            >
                <div class="flex items-center">
                    <img 
                        v-if="projectImages[project]" 
                        :src="projectImages[project]" 
                        class="w-5 h-5 mr-2 rounded-full"
                        alt="Project Avatar"
                    >
                    <div>{{ project }}</div>
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

const fetchProjectImages = () => {
    props.data.forEach(project => {
        const avatar = createAvatar(identicon, {
            seed: project,
            size: 100,
            colors: ['#9be9a8', '#40c463', '#30a14e', '#216e39']
        }).toDataUri()
        
        projectImages[project] = avatar
    })
}

onMounted(() => {
    fetchProjectImages()
})
</script>