export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const project_id = query.project_id // Changed from {id:project_id}
    
    if (!project_id) {
        throw createError({
            statusCode: 400,
            message: 'Project ID is required'
        })
    }

    let url = `http://localhost:8080/project-scopes?project_id=${project_id}`
    
    try {
        const response = await $fetch(url, {
            method: "get"
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch project scopes'
        })
    }
});