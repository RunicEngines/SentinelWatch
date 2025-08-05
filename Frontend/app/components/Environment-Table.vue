<template>
    <div>
        <table  class="w-full border">
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
                <tr v-for="env in environments" :key="env.id" 
                    class="border hover:bg-gray-600">
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
                        <Menu>
                            <MenuButton>
                                <EllipsisVertical />
                            </MenuButton>
                            <MenuItems class="flex flex-col gap-1">
                                <MenuItem>
                                <button class="p-1 bg-red-500 rounded-lg hover:bg-red-400" @click="confirmDelete(env)">
                                    Delete
                                </button>
                                </MenuItem>
                                <MenuItem>
                                <button class="p-1 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                                    @click="editEnvironment(env)">
                                    Edit
                                </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { EllipsisVertical } from 'lucide-vue-next'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const environments = ref(null)

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