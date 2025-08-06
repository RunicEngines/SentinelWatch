<template>
    <div>
        <table v-if="environments && environments.length" class="w-full border">
            <thead class="border text-white bg-gray-900">
                <tr>
                    <th>name</th>
                    <th>enabled</th>
                    <th>description</th>
                    <th>created_at</th>
                    <th>updated_at</th>
                    <th>_</th>
                </tr>
            </thead>
            <tbody class="text-white">
                <tr v-for="env in environments" :key="env.id" class="border hover:bg-gray-600">
                    <td class="border p-2">{{ env.name }}</td>
                    <td class="border px-4">
                        <span :class="env.enabled ? 'text-green-500' : 'text-red-500'">
                            {{ env.enabled ? 'Enabled' : 'Disabled' }}
                        </span>
                    </td>
                    <td class="border p-2 overflow-auto">{{ env.description }}</td>
                    <td class="border p-2">{{ TimestampsDifference(env.created_at) }}</td>
                    <td class="border p-2">{{ TimestampsDifference(env.updated_at) }}</td>
                    <td class="py-2 relative">
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton>
                                    <EllipsisVertical />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-out"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0">
                                <MenuItems
                                    class="flex flex-col absolute z-10 mt-2 w-20 origin-top-right divide-y rounded-md bg-gray-500 ring-1 ring-black/5 focus:outline-none">
                                    <MenuItem>
                                    <button class="flex flex-auto p-1 bg-red-500 hover:bg-red-400"
                                        @click="confirmDelete(env)">
                                        <Trash2 />
                                        Delete
                                    </button>
                                    </MenuItem>
                                    <MenuItem>
                                    <button @click="setIsOpen(true, env)"
                                        class="p-1 flex flex-auto bg-yellow-500 hover:bg-yellow-400">
                                        <Pencil />
                                        Patch
                                    </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-center text-2xl bg-red-500 rounded-lg" v-else>
            No Environments
        </div>
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="setIsOpen(false)" class="relative z-10">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black/25" />
                </TransitionChild>
                <div class="fixed inset-0 overflow-y-auto ">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel class="  bg-gray-800 w-full max-w-md transform overflow-hidden rounded-2xl 
                      p-6 text-left align-middle shadow-xl 
                     transition-all space-y-4">
                                <DialogTitle as="h3" class="text-lg font-semibold text-white">
                                    Change Data
                                </DialogTitle>
                                <DialogDescription class="text-sm text-white">
                                    Please confirm the changes you want to make.
                                </DialogDescription>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-white">Name</label>
                                        <input v-model="body.name" type="text" 
                                            class="mt-1 block w-full rounded-md border   p-1 bg-gray-600 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-white">Description</label>
                                        <textarea v-model="body.description" 
                                            class="mt-1 block w-full rounded-md bg-gray-600  border border-gray-300 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-white">Enabled</label>
                                        <input v-model="body.enabled" type="checkbox"
                                            class="mt-1 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    </div>
                                </div>
                                <div class="flex justify-end space-x-2">
                                    <button @click="setIsOpen(false)" class="px-4 py-2 text-sm font-medium text-gray-600 
                         hover:bg-gray-100 rounded-md transition-colors">
                                        Cancel
                                    </button>
                                    <button @click="patchEnvironments()" class="px-4 py-2 text-sm font-medium text-white 
                         bg-blue-600 hover:bg-blue-700 rounded-md 
                         transition-colors">
                                        Done
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { EllipsisVertical } from 'lucide-vue-next'
import { Pencil } from 'lucide-vue-next';
import { Trash2 } from 'lucide-vue-next';
import { 
    TransitionRoot, 
    TransitionChild, 
    Dialog, 
    DialogPanel, 
    DialogTitle, 
    DialogDescription 
} from '@headlessui/vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const selectedEnv = ref(null)
const isOpen = ref(false)
const body = ref({
    name: "",
    description: "",
    enabled: false
})
const environments = ref(null)

function setIsOpen(value, env = null) {
    isOpen.value = value
    if (env) {
        selectedEnv.value = env
        // Pre-fill the body with current environment data
        body.value = {
            name: env.name,
            description: env.description,
            enabled: env.enabled
        }
    }
}

const patchEnvironments = async () => {
    if (!selectedEnv.value) return

    try {
        const { data, error } = await useFetch(`/api/environments/patch`, {
            method: 'PATCH',
            query: { id: selectedEnv.value.id },
            body: body.value
        })

        if (error.value) {
            console.error('Patch failed', error.value)
            return
        }

        // Update the environment in the list
        const index = environments.value.findIndex(env => env.id === selectedEnv.value.id)
        if (index !== -1) {
            environments.value[index] = { 
                ...environments.value[index], 
                ...body.value,
                updated_at: new Date().toISOString()
            }
        }

        // Close the dialog
        setIsOpen(false)
    } catch (error) {
        console.error('Error patching environment:', error)
    }
}

const fetchEnvironments = async () => {
    try {
        const { data, error } = await useFetch("/api/environments/get_by_projectId", {
            query: { id: props.id }
        })
        if (error.value) {
            console.error('Failed to fetch environments:', error.value)
            environments.value = []
            return
        }
        environments.value = data.value || []
    } catch (error) {
        console.error('Failed to fetch environments:', error)
        environments.value = []
    }
}

const confirmDelete = (env) => {
    const confirmed = confirm(`Are you sure you want to delete ${env.name}?`)
    if (confirmed) {
        Delete(env.id)
    }
}

const Delete = async (id) => {
    try {
        const { data, error } = await useFetch(`/api/environments/delete`, {
            method: 'DELETE',
            query: { id }
        })
        if (error.value) {
            console.error('Deletion failed', error.value)
            return
        }
        environments.value = environments.value.filter(env => env.id !== id)
    } catch (error) {
        console.error('Error deleting environment:', error)
    }
}

const TimestampsDifference = (timestamp) => {
    const current_time = Date.now();
    const timpestamp = new Date(timestamp);
    const time_difference_in_mill = Math.abs(current_time - timpestamp.getTime());
    const years = time_difference_in_mill / 3.154e+10;
    const months = time_difference_in_mill / 2.628e+9;
    const weeks = time_difference_in_mill / 6.048e+8;
    const days = time_difference_in_mill / 8.64e+7;
    const hours = time_difference_in_mill / 3.6e+6;
    const minutes = time_difference_in_mill / 6e+4;
    const seconds = time_difference_in_mill / 1000;
    if (years >= 1) {
        return `${Math.floor(years)} year(s) ago`;
    } else if (months >= 1) {
        return `${Math.floor(months)} month(s) ago`;
    } else if (weeks >= 1) {
        return `${Math.floor(weeks)} week(s) ago`;
    } else if (days >= 1) {
        return `${Math.floor(days)} day(s) ago`;
    } else if (hours >= 1) {
        return `${Math.floor(hours)} hour(s) ago`;
    } else if (minutes >= 1) {
        return `${Math.floor(minutes)} minute(s) ago`;
    } else {
        return `${Math.floor(seconds)} second(s) ago`;
    }
}

fetchEnvironments()
</script>