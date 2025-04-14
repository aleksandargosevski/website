<script setup>
definePageMeta({
  name: 'tag',
})

const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('content')
    .where('tags', 'LIKE', `%${route.params.tag}%`)
    .order('createdAt', 'DESC')
    .all()
})
</script>

<template>
  <div class="g-container">
    <h1 class="g-heading1">
      Tag: #{{ route.params.tag }}
    </h1>

    <BasePost
      v-for="post in posts"
      :key="post.path"
      :post="post"
    />
  </div>
</template>
