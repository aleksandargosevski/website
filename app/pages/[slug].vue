<script setup>
definePageMeta({
  name: 'post',
})
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const siteConfig = useSiteConfig()

useSchemaOrg({
  '@context': 'https://schema.org/',
  '@type': 'BlogPosting',
  '@id': `${siteConfig.url}${route.path}`,
  'mainEntityOfPage': `${siteConfig.url}${route.path}`,
  'headline': `${post.value.title}`,
  'name': `${post.value.title}`,
  'description': `${post.value.description}`,
  'datePublished': `${new Date(post.value.createdAt).toISOString()}`,
  'dateModified': `${new Date(post.value.createdAt).toISOString()}`,
  'author': {
    '@id': 'https://aleksandargosevski.com/#identity',
  },
  'url': `${siteConfig.url}${route.path}`,
  'isPartOf': {
    '@id': 'https://aleksandargosevski.com/#website',
  },
  'about': post.value.tags.map(tag => ({
    '@type': 'Thing',
    '@id': `${siteConfig.url}/tags/${tag}`,
    'name': tag,
  })),
})
</script>

<template>
  <article class="g-container">
    <h1
      class="g-heading1"
      :style="`view-transition-name: ${slugify(post.title)}`"
    >
      {{ post.title }}
    </h1>
    <PostMeta :post="post" />
    <ContentRenderer
      :value="post"
      class="g-content"
    />
  </article>
</template>

<style scoped>
article {
  .g-heading1 {
    margin-bottom: 32px;
  }
}
</style>
