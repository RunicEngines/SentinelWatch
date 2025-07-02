export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const data = await $fetch("http://localhost:8080/service-accounts", {
        method: 'post',
        body: body
    })
    return data
})

