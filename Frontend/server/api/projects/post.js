export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Log the request body for debugging
    console.log('Request body:', body)

    const response = await $fetch("http://localhost:8080/projects", {
      method: "POST",
      body: JSON.stringify(body), // Ensure the body is stringified
      headers: {
        'Content-Type': 'application/json', // Add content type header
        'Accept': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.error('Request error:', error)
    
    // Return more detailed error information
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.statusText,
      message: error.data?.message || error.message || 'An unexpected error occurred'
    })
  }
})