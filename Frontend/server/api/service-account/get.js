export default defineEventHandler(async (event) => {
  let url = "http://localhost:8080/service-accounts";

  try {
    const response = await $fetch(url);
    return response;
  } catch (error) {
    console.error("API fetch error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch accounts",
    });
  }
});
