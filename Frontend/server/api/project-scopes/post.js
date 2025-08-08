export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const url = `http://localhost:8080/project-scopes`
    
    try {
        const response = await $fetch(url, {
            method: "POST",
            body: body
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to create environment'
        })
    }
});