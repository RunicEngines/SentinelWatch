<template>
    <div class="">
        <div class="justify-center flex m-32">
            <form class="w-fit justify-center flex flex-col">
                <h1 class="text-2xl p-1 font-bold">Create Environment for Project</h1>
                <div class="border"></div>
                <div class="flex flex-col">
                    <div class="flex">
                        <label class="pl-2 font-extrabold">Name</label>
                        <p class="text-red-500">*</p>
                    </div>
                    <input v-model="name" placeholder="Enter environment name" required
                        class="hover:border-blue-500 p-2 border m-1.5 rounded-lg bg-gray-800">
                </div>
                <div class="flex flex-col">
                    <div>
                        <label class="pl-2 pr-2 font-extrabold">Description</label>
                        <label class="text-gray-600">(optional)</label>
                    </div>
                    <textarea v-model="description" placeholder="Description of Environment"
                        class="mx-2 border rounded-lg hover:border-blue-500 p-2"></textarea>
                </div>
                <div class="mt-4 mx-2">
                    <RadioGroup v-model="value" class="space-y-2">
                        <RadioGroupLabel class="text-sm font-medium">Environment Status</RadioGroupLabel>
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
                                    <RadioGroupDescription 
                                        as="p" 
                                        class="text-xs opacity-70"
                                    >
                                        {{ item.description }}
                                    </RadioGroupDescription>
                                </div>
                            </RadioGroupOption>
                        </div>
                    </RadioGroup>
                </div>
                <button type="button" @click="Submit()" class="hover:bg-blue-400 mt-1.5 border rounded-lg bg-blue-500">
                    Create Environment
                </button>
                <div class="text-green-600" v-if="message === 'success'">
                    Environment added successfully
                </div>
                <div class="border-2 rounded-b-lg border-red-600 text-red-600"
                    v-else-if="message && message !== 'success'">
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
const id = route.params.id

const items = [
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

const value = ref('enable')
const name = ref('')
const description = ref('')
const message = ref<string | null>(null)

async function Submit() {
    try {
        if (!name.value) {
            message.value = 'Name is required'
            return
        }
        const body = ref<EnvironmentRequest>({
            description: description.value || `Environment: ${name.value}`,
            enabled: value.value === 'enable',
            name: name.value,
            project_id: id as string
        })
        const { data, error } = await useFetch('/api/environments/post', {
            method: "POST",
            body: body.value
        })
        if (error.value) {
            message.value = error.value.message || 'An unexpected error occurred'
        } else {
            message.value = 'success'
            name.value = ''
            description.value = ''
            navigateTo(`/project/${id}`)
        }
    } catch (err: any) {
        message.value = err.message || 'An unexpected error occurred'
    }
}


function definePageMeta(arg0: { layout: string }) {
    throw new Error('Function not implemented.')
}
</script>