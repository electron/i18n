// Map URL-friendly API names to their real names.
module.exports = function getSlugs (apis) {
  const slugs = {}
  apis.forEach(api => {
    slugs[api.slug] = api.name
  })
  return slugs
}
