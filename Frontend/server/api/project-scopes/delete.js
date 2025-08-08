export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)
    
    const url = `http://localhost:8080/project-scopes/${id}`
    
    try {
        const response = await $fetch(url, {
            method: "DELETE"
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to delete environment'
        })
    }
});