
export default defineEventHandler(async (event) => {
  let { owner,repo } = getQuery(event);
  const response = $fetch(`https://api.github.com/repos/${owner}/${repo}`)
  return response
});
