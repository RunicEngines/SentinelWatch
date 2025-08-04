<template>
    <table class=" w-full  border">
        <thead class=" border bg-gray-900">
            <th>name</th>
            <th>enabled</th>
            <th>description</th>
            <th>created_at</th>
            <th>updated_at</th>
            <th> </th>
        </thead>
        <tbody>
            <tr v-for="env in props.data" class=" border hover:bg-gray-600">
                <td>{{ env.name }}</td>
                <td>{{ env.enabled }}</td>
                <td>{{ env.description }}</td>
                <td>{{ TimestampsDifference(env.created_at) }}</td>
                <td>{{ TimestampsDifference(env.updated_at) }}</td>
                <td>

                </td>
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
                "description": "Staging environment for beta ",
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

function TimestampsDifference(timestamp) {
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


</script>