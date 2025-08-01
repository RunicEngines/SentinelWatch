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
                <div class="mt-4">
                    <URadioGroup class="mx-2" color="info" variant="card" v-model="value" :items="items" />
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
import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui'

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


const items = ref<RadioGroupItem[]>([
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
])

const value = ref<RadioGroupValue>('enable')
const name = ref('')
const description = ref('')
const message = ref<string | null>(null)


async function Submit() {
    try {
        if (!name.value) {
            message.value = 'Name is req(""uired'
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
</script>