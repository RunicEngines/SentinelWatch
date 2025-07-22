<template>
    <div>
        <table class=" border-collapse border-4  border-gray-900          ">
            <thead class=" bg-gray-900  w-full">
                <tr class=" bg-gray-900  w-full ">
                    <th v-for="field in props.fields" class=" bg-gray-900    p-4 text-2xl   " :key="field.title">
                        <p class="   " v-if="props.disable[field.title]">{{ field.title }}</p>
                        <p v-if="props.disable[field.title] == false" class="  rounded-4xl bg-red-300">
                            X
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="line in props.data" class="hover:border-gray-300 hover:bg-gray-700">
                    <td v-for="[key, value] in Object.entries(line)" :key="key"
                        class="border px-4 border-t-2 border-gray-600">
                        <p v-if="props.disable[key]">{{ value }}</p>

                    </td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    fields: {
        type: Array,
        default: () => [{
            title: "some data",
        },
        {
            title: "some more data",
        }
        ]
    },
    data: {
        type: Array,
        default: () => [
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            },
            {
                "some data": "some data",
                "some more data": " some more data"
            }
        ]
    },
    disable: {
        type: Array,
        default: {
            "some data": false,
            "some more data": true
        }
    }
})





</script>