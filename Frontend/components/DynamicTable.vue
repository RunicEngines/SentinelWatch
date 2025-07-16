<template>
    <div>
        <table class=" border-collapse border-4  border-gray-900          ">
            <thead>
                <tr>
                    <th v-for="field in props.fields" class=" bg-gray-900   p-2   " :key="field.title">
                        {{ field.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="line in props.data" class="hover:border-gray-300 hover:bg-gray-700">
                    <td v-for="[key, value] in Object.entries(line)"  class=" px-2    border-t-2  border-gray-600 " :key="key">
                            {{ value }}
                    </td>
                </tr>
            </tbody>

        </table>
        {{ IsEnabled }}
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
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            },
            {
                some_data: "some data",
                some_more_data: " some more data"
            }
        ]
    }
})





</script>