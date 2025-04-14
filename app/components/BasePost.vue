<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="post">
    <h2
      class="g-heading2"
      :style="`view-transition-name: ${slugify(props.post.title)}`"
    >
      <NuxtLink
        :to="props.post.path"
        @click="active = true"
      >
        {{ props.post.title }}
      </NuxtLink>
    </h2>
    <PostMeta :post="props.post" />
  </article>
</template>

<style scoped>
.post {
  max-width: 600px;
  padding-block: 32px 8px;
  border-bottom: 1px solid var(--c-thin-gray);

  &:last-child {
    border-bottom: none;
  }
}
</style>
