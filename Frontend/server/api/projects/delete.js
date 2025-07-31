export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);


    await $fetch(`http://localhost:8080/projects/${id}`, {
      method: "DELETE",
    });

    return { message: `Project ${id} is deleted` };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to delete project",
    });
  }
});
