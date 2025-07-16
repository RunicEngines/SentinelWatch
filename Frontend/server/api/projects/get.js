export default defineEventHandler(async (event) => {
    let url = "http://localhost:8080/environments"
    const query = getQuery(event)

    const queryParams = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')

    if (queryParams) {
        url += `?${queryParams}`
    }

    try {
        const response = await $fetch(url)
        return response
    } catch (error) {
        console.error('API fetch error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch projects'
        })
    }
})