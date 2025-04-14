<script setup>
definePageMeta({
  name: 'home',
})

const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('content').order('createdAt', 'DESC').all()
})

const siteConfig = useSiteConfig()

useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  'name': `${siteConfig.name}`,
  'description': `${siteConfig.description}`,
  'blogPosts': posts.value.map(post => ({
    '@type': 'BlogPosting',
    'headline': `${post.title}`,
    'author': {
      '@id': 'https://www.aleksandargosevski.com/#identity',
    },
    'datePublished': `${new Date(post.createdAt).toISOString()}`,
    'dateModified': `${new Date(post.createdAt).toISOString()}`,
    'description': `${post.description}`,
    'url': `${siteConfig.url}${post.path}`,
  })),
})
</script>

<template>
  <div class="g-container">
    <BaseHero />
    <BasePost
      v-for="post in posts"
      :key="post.path"
      :post="post"
    />
  </div>
</template>
