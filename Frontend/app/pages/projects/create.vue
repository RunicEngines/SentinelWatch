<template>
    <div class="">
        <div class="justify-center flex m-32">
            <form class="w-fit justify-center flex flex-col">
                <h1 class="text-2xl p-1 font-bold">Add a Project</h1>
                <div class="border"></div>
                <div class="flex justify-center">
                    <div class="flex flex-col">
                        <div class="flex">
                            <label class="pl-2 font-extrabold">Owner</label>
                            <p class="text-red-500">*</p>
                        </div>
                        <input v-model="owner" placeholder="add owner of project" required
                            class="hover:border-blue-500 p-2 border m-1.5 rounded-lg bg-gray-800">
                    </div>
                    <p class="text-5xl px-2 py-7">/</p>
                    <div class="flex flex-col">
                        <div class="flex">
                            <label class="font-extrabold">Project</label>
                            <p class="text-red-500">*</p>
                        </div>
                        <input v-model="repo" placeholder="add name of project" required
                            class="border p-2 m-1.5 rounded-lg bg-gray-800 hover:border-blue-500">
                    </div>
                </div>
                <div class="flex flex-col">
                    <div>
                        <label class="pl-2 pr-2 font-extrabold">Description</label>
                        <label class="text-gray-600">(optional)</label>
                    </div>
                    <textarea v-model="description" placeholder="Description of Project"
                        class="mx-2 border rounded-lg hover:border-blue-500 p-2"></textarea>
                </div>
                <div class="mt-4">
                    <URadioGroup class="mx-2" color="info" variant="card" v-model="value" :items="items" />
                </div>
                <button type="button" @click="Submit()" class="hover:bg-blue-400 mt-1.5 border rounded-lg bg-blue-500">
                    Add Repo
                </button>
                <div class="text-green-600" v-if="message === 'success'">
                    Project added successfully
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



interface ProjectRequest {
    "description": string
    "enabled": boolean
    "name": string
}

definePageMeta({
    layout: 'forms'
})

const items = ref<RadioGroupItem[]>([
    {
        label: 'Enable',
        value: 'enable',
        description: "Enables AI to review your code for everyone"
    },
    {
        label: 'Disable',
        value: 'disable',
        description: 'Disables AI to review code for everyone'
    }
])

const value = ref<RadioGroupValue>('enable')
const enabled = ref(true)
const owner = ref('')
const repo = ref('')
const description = ref('')
const message = ref<string | null>(null)
const error_message = ref<string | null>(null)
const body = ref<ProjectRequest>({
    description: description.value,
    enabled: enabled.value,
    name: `${owner.value}/${repo.value}`
})
function Submit() {
    try {
        if (!description.value) {
            description.value = `Description for ${owner.value}/${repo.value}`
        }

        enabled.value = value.value === 'enable'
        body.value = {
            description: description.value,
            enabled: enabled.value,
            name: `${owner.value}/${repo.value}`
        }

        let {data,error} = useFetch('/api/projects/post', {
            method: "POST",
            body: body
        })
        message.value = "success"
        navigateTo(`/`)
    } catch (err: any) {
        message.value = err.message || 'An unexpected error occurred'
    }
}

</script>