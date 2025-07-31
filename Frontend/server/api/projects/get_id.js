export default defineEventHandler(async (event) => {
    const project_id = getQuery(event, "id")
    const url = `http://localhost:8080/projects/${project_id}`
    const response = await $fetch(url, {
        method: 'GET'
    })
    
    return response || { error: "is empty" }
})