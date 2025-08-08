<template>
    <div class="text-white">
        <div class="justify-center flex m-32">
            <form @submit.prevent="Submit" class="w-fit justify-center flex flex-col">
                <h1 class="text-2xl p-1 font-bold">Add a Project</h1>
                <div class="border"></div>
                <div class="flex justify-center">
                    <div class="flex flex-col">
                        <div class="flex">
                            <label class="pl-2 font-extrabold">Owner</label>
                            <p class="text-red-500">*</p>
                        </div>
                        <input 
                            v-model="owner" 
                            placeholder="add owner of project" 
                            required
                            class="hover:border-blue-500 p-2 border m-1.5 rounded-lg bg-gray-800"
                        >
                    </div>
                    <p class="text-5xl px-2 py-7">/</p>
                    <div class="flex flex-col">
                        <div class="flex">
                            <label class="font-extrabold">Project</label>
                            <p class="text-red-500">*</p>
                        </div>
                        <input 
                            v-model="repo" 
                            placeholder="add name of project" 
                            required
                            class="border p-2 m-1.5 rounded-lg bg-gray-800 hover:border-blue-500"
                        >
                    </div>
                </div>
                <div class="flex flex-col">
                    <div>
                        <label class="pl-2 pr-2 font-extrabold">Description</label>
                        <label class="text-gray-600">(optional)</label>
                    </div>
                    <textarea 
                        v-model="description" 
                        placeholder="Description of Project"
                        class="mx-2 border rounded-lg bg-gray-800 hover:border-blue-500 p-2"
                    ></textarea>
                </div>
                <div class="mt-4 mx-2">
                    <RadioGroup v-model="value" class="space-y-2">
                        <RadioGroupLabel class="text-sm font-medium">Project Status</RadioGroupLabel>
                        <div class="flex space-x-2">
                            <RadioGroupOption 
                                v-for="item in items" 
                                :key="item.value" 
                                :value="item.value"
                                v-slot="{ checked }" 
                                class="flex-1"
                            >
                                <div 
                                    :class="[
                                        checked ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300',
                                        'p-3 rounded-lg cursor-pointer border'
                                    ]"
                                >
                                    <RadioGroupLabel as="p" class="font-medium">
                                        {{ item.label }}
                                    </RadioGroupLabel>
                                    <RadioGroupDescription as="p" class="text-xs opacity-70">
                                        {{ item.description }}
                                    </RadioGroupDescription>
                                </div>
                            </RadioGroupOption>
                        </div>
                    </RadioGroup>
                </div>
                <button 
                    type="submit" 
                    class="hover:bg-blue-400 mt-1.5 border rounded-lg bg-blue-500 p-2"
                    :disabled="isLoading"
                >
                    {{ isLoading ? 'Adding...' : 'Add Repo' }}
                </button>
                <div v-if="message" class="mt-2 p-2">
                    <div 
                        v-if="message === 'success'"
                        class="text-green-600 bg-green-100/10 p-2 rounded"
                    >
                        Project added successfully
                    </div>
                    <div 
                        v-else
                        class="border-2 rounded-lg border-red-600 text-red-600 p-2"
                    >
                        {{ message }}
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription
} from '@headlessui/vue'
import { ref } from 'vue'

definePageMeta({
    layout: 'forms'
})

// Interfaces
interface ProjectRequest {
    description: string
    enabled: boolean
    name: string
}

interface RadioItem {
    label: string
    value: string
    description: string
}

// Constants
const items: RadioItem[] = [
    {
        label: 'Enable',
        value: 'enable',
        description: "Enables AI to review your code"
    },
    {
        label: 'Disable',
        value: 'disable',
        description: 'Disables AI to review code'
    }
]

// Reactive references
const value = ref('enable')
const enabled = ref(true)
const owner = ref('')
const repo = ref('')
const description = ref('')
const message = ref<string | null>(null)
const isLoading = ref(false)

// Methods
const validateForm = (): boolean => {
    if (!owner.value.trim()) {
        message.value = "Owner name is required"
        return false
    }
    if (!repo.value.trim()) {
        message.value = "Project name is required"
        return false
    }
    return true
}

const resetForm = () => {
    owner.value = ''
    repo.value = ''
    description.value = ''
    value.value = 'enable'
    message.value = null
}

async function Submit() {
    try {
        if (!validateForm()) return

        isLoading.value = true
        message.value = null

        if (!description.value) {
            description.value = `Description for ${owner.value}/${repo.value}`
        }

        enabled.value = value.value === 'enable'
        
        const requestBody: ProjectRequest = {
            "description": description.value,
            "enabled": enabled.value,
            "name": `${owner.value}/${repo.value}`
        }

        const { data, error } = await useFetch('/api/projects/post', {
            method: 'POST',
            body: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (error.value) {
            throw new Error(error.value.message || 'Failed to add project')
        }

        message.value = "success"
        resetForm()
        navigateTo("/")

    } catch (err) {
        console.error('Submit error:', err)
        message.value = err instanceof Error ? err.message : 'An unexpected error occurred'
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

input:focus, textarea:focus {
    outline: none;
    border-color: #3b82f6;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>