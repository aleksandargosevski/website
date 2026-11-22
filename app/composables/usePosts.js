export const usePosts = async () => {
  const { data, error } = await useAsyncData('posts-index', async () => {
    const entries = await queryCollection('content')
      .select('path', 'title', 'description', 'createdAt', 'tags', 'body')
      .order('createdAt', 'ASC')
      .all()

    return entries.map(({ body, ...post }) => ({ ...post, minutes: readingTime(body) }))
  })

  if (error.value) {
    throw createError({ statusCode: 500, statusMessage: 'Could not load posts', fatal: true })
  }

  const numbered = computed(() => (data.value ?? []).map((post, index) => ({
    ...post,
    number: index + 1,
  })))

  const posts = computed(() => [...numbered.value].reverse())

  const tags = computed(() => {
    const counts = new Map()
    numbered.value.forEach(post => post.tags.forEach(tag => counts.set(tag, (counts.get(tag) ?? 0) + 1)))
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
  })

  const findNeighbours = (path) => {
    const index = numbered.value.findIndex(post => post.path === path)
    return {
      current: numbered.value[index],
      previous: numbered.value[index - 1],
      next: numbered.value[index + 1],
    }
  }

  return { posts, tags, findNeighbours }
}
