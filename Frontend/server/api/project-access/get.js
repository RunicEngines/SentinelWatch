export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const project_id = query.project_id 
    
    if (!project_id) {
        throw createError({
            statusCode: 400,
            message: 'Project ID is required'
        })
    }

    let url = `http://localhost:8080/projects/${project_id}/access`
    
    try {
        const response = await $fetch(url, {
            method: "get"
        })
        return response
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch access'
        })
    }
});