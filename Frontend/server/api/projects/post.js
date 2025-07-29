export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const response = await $fetch("http://localhost:8080/projects", {
      method: "POST",
      body: body

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