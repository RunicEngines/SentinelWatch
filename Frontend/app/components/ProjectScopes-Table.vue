<template>
    <div>
        <table v-if="scopes && scopes.length" class="w-full border">
            <thead class="border text-white bg-gray-900">
                <tr>
                    <th>scope</th>
                    <th>enabled</th>
                    <th>description</th>
                    <th>created_at</th>
                    <th>updated_at</th>
                    <th>_</th>
                </tr>
            </thead>
            <tbody class="text-white">
                <tr v-for="scope in scopes" :key="scope.id" class="border hover:bg-gray-600">
                    <td class="border p-2">{{ scope.scope }}</td>
                    <td class="border px-4">
                        <span :class="scope.enabled ? 'text-green-500' : 'text-red-500'">
                            {{ scope.enabled ? 'Enabled' : 'Disabled' }}
                        </span>
                    </td>
                    <td class="border p-2 overflow-auto">{{ scope.description }}</td>
                    <td class="border p-2">{{ TimestampsDifference(scope.created_at) }}</td>
                    <td class="border p-2">{{ TimestampsDifference(scope.updated_at) }}</td>
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
                                        @click="confirmDelete(scope)">
                                        <Trash2 />Delete
                                    </button>
                                    </MenuItem>
                                    <MenuItem>
                                    <button @click="setIsOpen(true, scope)"
                                        class="p-1 flex flex-auto bg-yellow-500 hover:bg-yellow-400">
                                        <Pencil />Patch
                                    </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-center text-2xl bg-red-500 rounded-lg" v-else>No Project Scopes</div>

        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" @close="setIsOpen(false)" class="relative z-10">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="bg-gray-800 w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all space-y-4">
                                <DialogTitle as="h3" class="text-lg font-semibold text-white">Change Data</DialogTitle>
                                <DialogDescription class="text-sm text-white">Please confirm the changes you want to
                                    make.</DialogDescription>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-white">Scope</label>
                                        <input v-model="body.scope" type="text"
                                            class="mt-1 block w-full rounded-md border p-1 bg-gray-600 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-white">Description</label>
                                        <textarea v-model="body.description"
                                            class="mt-1 block w-full rounded-md bg-gray-600 border border-gray-300 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-white">Enabled</label>
                                        <input v-model="body.enabled" type="checkbox"
                                            class="mt-1 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    </div>
                                </div>
                                <div class="flex justify-end space-x-2">
                                    <button @click="setIsOpen(false)"
                                        class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
                                    <button @click="patchScope()"
                                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">Done</button>
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
import { ref } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'

const props = defineProps({
    id: { type: String, required: true }
})

const selectedScope = ref(null)
const isOpen = ref(false)
const body = ref({ scope: "", description: "", enabled: false })
const scopes = ref(null)

function setIsOpen(value, scope = null) {
    isOpen.value = value
    if (scope) {
        selectedScope.value = scope
        body.value = {
            scope: scope.scope,
            description: scope.description,
            enabled: scope.enabled
        }
    }
}

const patchScope = async () => {
    if (!selectedScope.value) return
    try {
        const { error } = await useFetch(`/api/project-scopes/patch`, {
            method: 'PATCH',
            query: { id: selectedScope.value.id },
            body: body.value
        })
        if (error.value) throw error.value

        const index = scopes.value.findIndex(scope => scope.id === selectedScope.value.id)
        if (index !== -1) {
            scopes.value[index] = {
                ...scopes.value[index],
                ...body.value,
                updated_at: new Date().toISOString()
            }
        }
        setIsOpen(false)
    } catch (error) {
        console.error('Error patching scope:', error)
    }
}

const fetchScopes = async () => {
    const { data, error } = await useFetch("/api/project-scopes/get", {
        query: { project_id: props.id }
    })
    scopes.value = data.value

}

const confirmDelete = (scope) => {
    if (confirm(`Are you sure you want to delete ${scope.scope}?`)) {
        Delete(scope.id)
    }
}

const Delete = async (id) => {
    try {
        const { error } = await useFetch(`/api/project-scopes/delete`, {
            method: 'DELETE',
            query: { id }
        })
        if (error.value) throw error.value
        scopes.value = scopes.value.filter(scope => scope.id !== id)
    } catch (error) {
        console.error('Error deleting scope:', error)
    }
}

const TimestampsDifference = (timestamp) => {
    const current_time = Date.now()
    const timpestamp = new Date(timestamp)
    const time_difference_in_mill = Math.abs(current_time - timpestamp.getTime())
    const years = time_difference_in_mill / 3.154e+10
    const months = time_difference_in_mill / 2.628e+9
    const weeks = time_difference_in_mill / 6.048e+8
    const days = time_difference_in_mill / 8.64e+7
    const hours = time_difference_in_mill / 3.6e+6
    const minutes = time_difference_in_mill / 6e+4
    const seconds = time_difference_in_mill / 1000

    if (years >= 1) return `${Math.floor(years)} year(s) ago`
    if (months >= 1) return `${Math.floor(months)} month(s) ago`
    if (weeks >= 1) return `${Math.floor(weeks)} week(s) ago`
    if (days >= 1) return `${Math.floor(days)} day(s) ago`
    if (hours >= 1) return `${Math.floor(hours)} hour(s) ago`
    if (minutes >= 1) return `${Math.floor(minutes)} minute(s) ago`
    return `${Math.floor(seconds)} second(s) ago`
}


fetchScopes()
</script>