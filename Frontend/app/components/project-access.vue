<template>
    <div>
        <table v-if="accesses && accesses.length" class="w-full border">
            <thead class="border text-white bg-gray-900">
                <tr>
                    <th>Environment</th>
                    <th>Service Account</th>
                    <th>Enabled</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>_</th>
                </tr>
            </thead>
            <tbody class="text-white">
                <tr v-for="access in accesses" :key="access.id" class="border hover:bg-gray-600">
                    <td class="border p-2">{{ access.environment_id }}</td>
                    <td class="border p-2">{{ access.service_account_id }}</td>
                    <td class="border px-4">
                        <span :class="access.enabled ? 'text-green-500' : 'text-red-500'">
                            {{ access.enabled ? 'Enabled' : 'Disabled' }}
                        </span>
                    </td>
                    <td class="border p-2">{{ formatTimestamp(access.created_at) }}</td>
                    <td class="border p-2">{{ formatTimestamp(access.updated_at) }}</td>
                    <td class="py-2 relative">
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton>
                                    <EllipsisVertical />
                                </MenuButton>
                            </div>
                            <transition 
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-out"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0"
                            >
                                <MenuItems
                                    class="flex flex-col absolute z-10 mt-2 w-20 origin-top-right divide-y rounded-md bg-gray-500 ring-1 ring-black/5 focus:outline-none"
                                >
                                    <MenuItem>
                                        <button 
                                            class="flex flex-auto p-1 bg-red-500 hover:bg-red-400"
                                            @click="confirmDelete(access)"
                                        >
                                            <Trash2 />Delete
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button 
                                            @click="openEditModal(access)"
                                            class="p-1 flex flex-auto bg-yellow-500 hover:bg-yellow-400"
                                        >
                                            <Pencil />Edit
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div v-else class="flex justify-center text-2xl bg-red-500 rounded-lg">
            No Project Accesses
        </div>

        <!-- Edit Modal -->
        <TransitionRoot appear :show="isModalOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-10">
                <TransitionChild 
                    as="template" 
                    enter="duration-300 ease-out" 
                    enter-from="opacity-0"
                    enter-to="opacity-100" 
                    leave="duration-200 ease-in" 
                    leave-from="opacity-100" 
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild 
                            as="template" 
                            enter="duration-300 ease-out" 
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" 
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" 
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                    Edit Access
                                </DialogTitle>
                                
                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-gray-700">
                                        Enabled
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        v-model="editedAccess.enabled"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div class="mt-4 flex justify-end space-x-2">
                                    <button 
                                        type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        @click="updateAccess"
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        @click="closeModal"
                                    >
                                        Cancel
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
import { ref } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const props = defineProps({
    id: { type: String, required: true }
})

const accesses = ref([])
const isModalOpen = ref(false)
const selectedAccess = ref(null)
const editedAccess = ref({ enabled: false })

// Fetch Accesses
const fetchAccesses = async () => {
    try {
        const { data, error } = await useFetch("/api/project-access/get", {
            query: { project_id: props.id }
        })
        
        if (error.value) throw error.value
        accesses.value = data.value || []
    } catch (error) {
        console.error('Error fetching accesses:', error)
    }
}

// Open Edit Modal
const openEditModal = (access) => {
    selectedAccess.value = access
    editedAccess.value = { 
        enabled: access.enabled 
    }
    isModalOpen.value = true
}

// Close Modal
const closeModal = () => {
    isModalOpen.value = false
    selectedAccess.value = null
}

// Update Access
const updateAccess = async () => {
    if (!selectedAccess.value) return

    try {
        const { error } = await useFetch('/api/project-access/patch', {
            method: 'PATCH',
            query: { 
                projectId: props.id, 
                accessId: selectedAccess.value.id 
            },
            body: editedAccess.value
        })

        if (error.value) throw error.value

        // Update local state
        const index = accesses.value.findIndex(a => a.id === selectedAccess.value.id)
        if (index !== -1) {
            accesses.value[index] = {
                ...accesses.value[index],
                ...editedAccess.value,
                updated_at: new Date().toISOString()
            }
        }

        closeModal()
    } catch (error) {
        console.error('Error updating access:', error)
    }
}

// Delete Access
const confirmDelete = (access) => {
    if (confirm(`Are you sure you want to delete this access?`)) {
        deleteAccess(access.id)
    }
}

const deleteAccess = async (accessId) => {
    try {
        const { error } = await useFetch('/api/project-access/delete', {
            method: 'DELETE',
            query: { 
                projectId: props.id, 
                accessId: accessId 
            }
        })

        if (error.value) throw error.value

        // Remove from local state
        accesses.value = accesses.value.filter(a => a.id !== accessId)
    } catch (error) {
        console.error('Error deleting access:', error)
    }
}

// Timestamp Formatter
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
}

// Initial fetch
fetchAccesses()
</script>