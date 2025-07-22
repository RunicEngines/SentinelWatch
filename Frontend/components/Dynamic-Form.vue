<template>
    <form class="border bg-gray-900 p-4 space-y-4" @submit.prevent="Submit">
        <div v-for="(input, index) in props.titles" :key="index" class="flex flex-col">
            <label :for="input" class="mb-2">{{ input }}</label>
            <input 
                v-if="props.metadata[input] == 'input'" 
                :id="input" 
                :name="input" 
                :placeholder="input"
                v-model="formData[input]" 
                class="p-2 rounded bg-gray-800 text-white" 
                required
            >
            <USelect 
                v-if="props.metadata[input] === 'select'" 
                v-model="formData[input]" 
                :items="true_false" 
                :placeholder="input"
            />
        </div>
        <button 
            type="submit" 
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" 
            :disabled="isLoading"
        >
            {{ isLoading ? 'Submitting...' : 'Submit' }}
        </button>
    </form>
    <div v-if="isLoading" class="mt-4 text-white">
        Loading...
    </div>
    <div v-if="error" class="mt-4 text-red-500">
        {{ error }}
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    titles: {
        type: Array,
        default: () => [
            "name",
            "description",
            "enabled",
        ]
    },
    metadata: {
        type: Object,
        default: () => ({
            name: "input",
            description: "input",
            enabled: "select"
        })
    },
    api: {
        type: Object,
        default: () => ({
            name: 'projects',
        })
    },
    type: {
        type: String,
        default: 'POST'
    }
})

const formData = ref(
    props.titles.reduce((acc, title) => {
        acc[title] = title === 'enabled' ? false : ''
        return acc
    }, {})
)

const true_false = ref([
    { label: 'True', value: true },
    { label: 'False', value: false }
])

const isLoading = ref(false)
const error = ref(null)
const responseData = ref(null)

const emit = defineEmits(['submit-success', 'submit-error'])

async function Submit() {
    isLoading.value = true
    error.value = null

    try {
        const isValid = validateForm()
        if (!isValid) {
            throw new Error('Please fill in all required fields')
        }

        const response = await $fetch(`/api/${props.api.name}/post`, {
            method: props.type,
            body: formData.value
        })

        emit('submit-success', response)
        
        resetForm()
    } catch (err) {
        error.value = err.message || 'An error occurred'
        console.error(err)
        
        emit('submit-error', err)
    } finally {
        isLoading.value = false
    }
}

function validateForm() {
    return props.titles.every(title => {
        if (title === 'enabled') return true
        return formData.value[title] && formData.value[title].trim() !== ''
    })
}

function resetForm() {
    formData.value = props.titles.reduce((acc, title) => {
        acc[title] = title === 'enabled' ? false : ''
        return acc
    }, {})
}
</script>