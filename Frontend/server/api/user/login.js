export default defineEventHandler(async (event) => {
    const { body } = await useBody(event)

    const { data } = $fetch(`http://localhost:8080/service-account?name=${body.name}`)



})