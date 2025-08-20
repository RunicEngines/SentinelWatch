export default defineEventHandler(async (event) => {
    const {  projectId,accessId } = getQuery(event)
    
    const url = `http://localhost:8080/projects/${projectId}/access/${accessId}`
    
    try {
        const response = await $fetch(url, {
            method: "DELETE"
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to delete Access'
        })
    }
});