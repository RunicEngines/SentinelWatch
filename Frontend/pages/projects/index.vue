<script setup lang="js">
const { data: response } = await useFetch("/api/projects/get")
const fieldsData = ref([])
const rows = ref([])

if (response.value) {
    fieldsData.value = Object.keys(response.value[0] || {}).map(key => ({ title: key }))
    rows.value = response.value
}
</script>
<template>
    <div class=" ">
        <div class="text-5xl flex items-center justify-center ">Projects</div>
        <DynamicTable 
        class="m-3 w-fit"
        
        :fields="[
            { title: 'id' },
            { title: 'name' },
            { title: 'description' },
            { title: 'enabled' },
            { title: 'created_at' },
            { title: 'updated_at' }

        ]
            " :data="response" :disable="{
                id: true,
                name: true,
                description: true,
                enabled:false,
                created_at:false,
                updated_at:false
            }" />
        {{ }}
    </div>
</template>