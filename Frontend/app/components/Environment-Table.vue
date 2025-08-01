<template>
    <table class=" ">
        <thead class=" border">
            <th>name</th>
            <th>enabled</th>
            <th>description</th>
            <th>created_at</th>
            <th>updated_at</th>
        </thead>
        <tbody>
            <tr v-for="env in props.data">
                <td>{{ env.name }}</td>
                <td>{{ env.enabled }}</td>
                <td>{{ env.description }}</td>
                <td>{{ env.created_at }}</td>
                <td>{{ env.updated_at }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>

const props = defineProps({
    data: {
        default: [
            {
                "created_at": "2023-09-15T14:22:11.000Z",
                "description": "Staging environment for beta testing",
                "enabled": true,
                "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2g3h4i5j",
                "name": "Staging",
                "project_id": "b2c3d4e5-f6g7-5b8c-9d0e-1f2g3h4i5j6k",
                "updated_at": "2023-09-16T10:15:33.000Z"
            },
            {
                "created_at": "2024-01-07T09:33:45.000Z",
                "description": "Development environment for new features",
                "enabled": false,
                "id": "7x8y9z0w-1a2b-3c4d-5e6f-7g8h9i0j1k2l",
                "name": "Development",
                "project_id": "c3d4e5f6-g7h8-6c9d-0e1f-2g3h4i5j6k7l",
                "updated_at": "2024-02-12T16:47:22.000Z"
            },
            {
                "created_at": "2023-11-30T22:11:09.000Z",
                "description": "QA environment for testing",
                "enabled": true,
                "id": "m1n2o3p4-q5r6-7s8t-9u0v-1w2x3y4z5a6b",
                "name": "Quality Assurance",
                "project_id": "d4e5f6g7-h8i9-7d0e-1f2g-3h4i5j6k7l8m",
                "updated_at": "2024-03-15T11:22:33.000Z"
            }
        ]
    }
})


</script>