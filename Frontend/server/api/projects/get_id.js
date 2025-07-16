export default defineEventHandler(async (event) => {
    const project_id = getRouterParam(event,"id")
    const {data} = await $fetch(`http://localhost:8080/projects/${project_id}`)
    if (!data) {
        return {error:"is emtpy"}
    }else {
        return data
    }
})