export default defineEventHandler(async (event) => {
    $fetch(`http://localhost:8080/projects/${event.id}`)
    return event.id + "is deleted"
})