<script setup lang="ts">
const { data } = await useFetch("/api/projects/get")
</script>

<template>
    <div>
        <div class="text-5xl flex items-center justify-center">Projects</div>
        hello world
        {{ data }}
        <DynamicTable :fields="[
            { title: 'Name' },
            { title: 'Email' },
            { title: 'Age' }
        ]" :data="[
            { name: 'John Doe', email: 'john@example.com', age: 30 },
            { name: 'Jane Smith', email: 'jane@example.com', age: 25 }
        ]" />


        
    </div>
</template>