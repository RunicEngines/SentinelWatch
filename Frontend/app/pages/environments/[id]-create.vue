<template>
    <div class="bg-slate-900 text-white">
        <div class="justify-center flex m-32">
            <form @submit.prevent="handleSubmit" class="w-fit justify-center flex flex-col">
                <h1 class="text-2xl p-1 font-bold">Create Environment for Project</h1>
                <div class="border"></div>

                <div class="flex flex-col">
                    <div class="flex">
                        <label for="name" class="pl-2 font-extrabold">Name</label>
                        <span class="text-red-500">*</span>
                    </div>
                    <input 
                        id="name"
                        v-model.trim="name" 
                        placeholder="Enter environment name" 
                        required
                        class="hover:border-blue-500 p-2 border m-1.5 rounded-lg bg-gray-800"
                    >
                </div>

                <div class="flex flex-col">
                    <div>
                        <label for="description" class="pl-2 pr-2 font-extrabold">Description</label>
                        <span class="text-gray-600">(optional)</span>
                    </div>
                    <textarea 
                        id="description"
                        v-model.trim="description" 
                        placeholder="Description of Environment"
                        class="mx-2 border rounded-lg bg-gray-800 hover:border-blue-500 p-2"
                    ></textarea>
                </div>

                <div class="mt-4 mx-2">
                    <RadioGroup v-model="status" class="space-y-2">
                        <RadioGroupLabel class="text-sm font-medium">Environment Status</RadioGroupLabel>
                        <div class="flex space-x-2">
                            <RadioGroupOption 
                                v-for="item in statusOptions" 
                                :key="item.value" 
                                :value="item.value"
                                v-slot="{ checked }"
                                class="flex-1"
                            >
                                <div :class="[
                                    checked ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300',
                                    'p-3 rounded-lg cursor-pointer border'
                                ]">
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
                >
                    Create Environment
                </button>

                <!-- Status Messages -->
                <div v-if="message" :class="messageClass">
                    {{ message }}
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
import { ref, computed } from 'vue'

interface EnvironmentRequest {
    description?: string
    enabled: boolean
    name: string
    project_id: string
}

definePageMeta({
    layout: 'forms'
})

const route = useRoute()
const projectId = route.params.id as string

const statusOptions = [
    {
        label: 'Enable',
        value: 'enable',
        description: "Enables the environment"
    },
    {
        label: 'Disable',
        value: 'disable',
        description: 'Disables the environment'
    }
]

const status = ref('enable')
const name = ref('')
const description = ref('')
const message = ref('')

const messageClass = computed(() => ({
    'text-green-600': message.value === 'success',
    'border-2 rounded-b-lg border-red-600 text-red-600': message.value && message.value !== 'success'
}))

async function handleSubmit() {
    try {
        if (!name.value.trim()) {
            message.value = 'Name is required'
            return
        }

        const environmentData: EnvironmentRequest = {
            description: description.value.trim() || `Environment: ${name.value.trim()}`,
            enabled: status.value === 'enable',
            name: name.value.trim(),
            project_id: projectId
        }

        const { error } = await useFetch('/api/environments/post', {
            method: 'POST',
            body: environmentData
        })

        if (error.value) {
            message.value = error.value.message || 'An unexpected error occurred'
            return
        }

        message.value = 'success'
        resetForm()
        navigateTo(`/projects/${projectId}`)

    } catch (err: any) {
        message.value = err.message || 'An unexpected error occurred'
    }
}

function resetForm() {
    name.value = ''
    description.value = ''
    status.value = 'enable'
}
</script>