export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)
    const body = await readBody(event)
    
    const url = `http://localhost:8080/project-scopes/${id}`
    
    try {
        const response = await $fetch(url, {
            method: "PATCH",
            body: body
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to update environment'
        })
    }
});