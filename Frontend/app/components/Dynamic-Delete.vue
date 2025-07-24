<template>
    <div>
        <form @submit.prevent="Submit" class="border bg-gray-900 p-4 space-y-4">
            <div class="flex flex-col">
                <label class="mb-2 mx-0.5 px-2 font-extrabold">{{ props.delete }}</label>
                <input 
                    class="p-2 rounded text-white" 
                    :class="found ? 'bg-gray-800' : 'bg-red-800'"
                    :placeholder="'Name of ' + props.delete" 
                    v-model="value"
                >
            </div>
            <button 
                type="submit" 
                class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
                DELETE
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    delete: {
        type: String,
        default: 'projects'
    }
})

const value = ref('')
const found = ref(true)

async function Submit() {
    try {
        const response = await $fetch(`/api/${props.delete}/get`, {
            params: { name: value.value }
        })
        
        if (response) {
            await $fetch(`/api/${props.delete}/delete`, {
                method: "DELETE",
                params: { id: response.id }
            })
            found.value = true
            value.value = '' 
        } else {
            found.value = false
        }
    } catch (error) {
        console.error('Delete operation failed:', error)
        found.value = false
    }
}
</script>