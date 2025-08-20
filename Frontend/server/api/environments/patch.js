
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {id:env_id} = await getQuery(event)
  const resposne = await $fetch(`http://localhost:8080/environments/${env_id}`,{
    method: "PATCH",
    body:body
  })

  return resposne
});
