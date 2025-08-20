export default defineEventHandler(async (event) => {
  const { id: project_id } = getQuery(event);

  const response = await $fetch(
    `http://localhost:8080/projects/${project_id}`,
    {
      method: "GET",
    }
  );


  return response;
});
