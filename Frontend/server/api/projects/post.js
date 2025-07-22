export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body || Object.keys(body).length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Invalid request body'
      })
    }

    const response = await $fetch("http://localhost:8080/projects", {
      method: "POST",
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response
  } catch (error) {
    console.error('Request error:', error)
    
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'An unexpected error occurred'
    })
  }
})