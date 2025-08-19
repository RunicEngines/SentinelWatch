export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {id} = await getQuery(event)
    
    const url = `http://localhost:8080/projects/${id}/access`
    
    try {
        const response = await $fetch(url, {
            method: "POST",
            body: body
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to create access'
        })
    }
}); 