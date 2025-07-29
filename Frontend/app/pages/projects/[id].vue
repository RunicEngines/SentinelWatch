<template>
    <div>
        {{ userId }}
    </div>
</template>
<script setup>
const route = useRoute()
const userId = route.params.id
</script>