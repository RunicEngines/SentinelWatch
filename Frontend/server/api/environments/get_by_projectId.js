export default defineEventHandler(async (event) => {
    const {id:project_id} = getQuery(event)
    let url = `http://localhost:8080/environments?project_id=${project_id}`
    const response = await $fetch(url,{
        method:"get"
    })
    return response
});
