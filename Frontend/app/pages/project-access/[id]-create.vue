<template>
    <div class="bg-slate-900 text-white">
        <div class="justify-center flex m-32">
            <form @submit.prevent="Submit" class="w-fit justify-center flex flex-col">
                <h1 class="text-2xl p-1 font-bold">Create Project Access</h1>
                <div class="border"></div>
                <div class="flex flex-col">


                    <div class="m-1 text-lg mt-4">Select Environment</div>
                    <div class="text-white">
                        <Listbox v-model="selectedEnvironment" as="div" class="relative"
                            v-if="environments && environments.length">
                            <ListboxButton
                                class="relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                {{ selectedEnvironment?.name || 'Select Environment' }}
                            </ListboxButton>
                            <ListboxOptions
                                class="absolute  z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                <ListboxOption v-for="env in environments" :key="env.id" :value="env"
                                    class="relative cursor-default select-none py-2 pl-10 pr-4 ui-active:bg-blue-100 ui-active:text-blue-900 ui-disabled:opacity-50">
                                    {{ env.name }}
                                </ListboxOption>
                            </ListboxOptions>
                        </Listbox>
                        <div v-else class="text-white">Loading environments...</div>
                    </div>

                    <div class="m-1 text-lg mt-4">Select Service Account</div>
                    <div class="text-white">
                        <Listbox v-model="selectedServiceAccount" as="div" class="relative"
                            v-if="serviceAccounts && serviceAccounts.length">
                            <ListboxButton
                                class="relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                {{ selectedServiceAccount?.name || 'Select Service Account' }}
                            </ListboxButton>
                            <ListboxOptions
                                class="   absolute  mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm  z-10">
                                <ListboxOption v-for="account in serviceAccounts" :key="account.id" :value="account"
                                    class="relative  cursor-default select-none py-2 pl-10 pr-4 ui-active:bg-blue-100 ui-active:text-blue-900 ui-disabled:opacity-50">
                                    {{ account.name }}
                                </ListboxOption>
                            </ListboxOptions>
                        </Listbox>
                        <div v-else class="text-white">Loading service accounts...</div>

                    </div>
                    <div class="mt-4 mx-2">
                        <RadioGroup v-model="enabled" class="space-y-2">
                            <RadioGroupLabel class="text-sm font-medium">Project Access Status</RadioGroupLabel>
                            <div class="flex space-x-2">
                                <RadioGroupOption v-for="item in statusOptions" :key="item.value" :value="item.value"
                                    v-slot="{ checked }" class="flex-1 ">
                                    <div :class="[
                                        checked ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300',
                                        'p-3 rounded-lg cursor-pointer border h-20'
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
                    <button type="submit" class="hover:bg-blue-400 mt-1.5 border rounded-lg bg-blue-500 p-2">
                        Create Project Access
                    </button>

                </div>

            </form>
        </div>

        {{ message }}
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription
} from '@headlessui/vue'

definePageMeta({
    layout: 'forms'
})

const route = useRoute()
const projectId = route.params.id

const statusOptions = [
    {
        label: 'Enable',
        value: true,
        description: "Enables the project access"
    },
    {
        label: 'Disable',
        value: false,
        description: 'Disables the project access'
    }
]

// Refs
const environments = ref([])
const selectedEnvironment = ref(null)
const serviceAccounts = ref([])
const selectedServiceAccount = ref(null)
const enabled = ref(true)
const message = ref(null)




// Fetch Environments
const fetchEnvironments = async () => {
    try {
        const { data, error } = await useFetch("/api/environments/get_by_projectId", {
            query: { id: projectId }
        })
        if (error.value) {
            message.value = error.value.message || 'Failed to fetch environments'
            environments.value = []
            return
        }
        environments.value = data.value || []
    } catch (error) {
        message.value = error.message || 'An unexpected error occurred'
        environments.value = []
    }
}

// Fetch Service Accounts
const fetchServiceAccounts = async () => {
    try {
        const { data, error } = await useFetch("/api/service-account/get")
        if (error.value) {
            message.value = error.value.message || 'Failed to fetch service accounts'
            serviceAccounts.value = []
            return
        }
        serviceAccounts.value = data.value || []
    } catch (error) {
        message.value = error.message || 'An unexpected error occurred'
        serviceAccounts.value = []
    }
}

const Submit = async () => {
    if (!selectedEnvironment.value || !selectedServiceAccount.value) {
        message.value = 'Please select an environment and service account'
        return
    }

        const { data, error } = await useFetch("/api/project-access/post", {
            method: "POST",
            query: { id: projectId },
            body: {
                "enabled": enabled.value,
                "environment_id": selectedEnvironment.value.id,
                "project_id": projectId,
                "service_account_id": selectedServiceAccount.value.id
            }
        })
        
        if (error.value) {
            return
        }

        message.value = 'success'
        navigateTo(`/project-access/${projectId}`)
        message.value = error.message || 'An unexpected error occurred'
}

fetchEnvironments()
fetchServiceAccounts()
</script>