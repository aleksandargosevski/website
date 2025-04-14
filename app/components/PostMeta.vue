<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="wrapper"
    :style="`view-transition-name: meta-${slugify(props.post.title)}`"
  >
    <time :datetime="new Date(props.post.createdAt).toISOString()">
      {{ new Date(props.post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
    </time>
    in
    <ul class="tags">
      <li
        v-for="tag in props.post.tags"
        :key="props.post.path + tag"
      >
        <NuxtLink :href="`/tags/${tag}`">#{{ tag }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 8px 0;
  font-size: 14px;
  color: var(--c-gray);
}

ul {
  display: inline-block;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0;

  a {
    font-weight: 400 !important;
    color: var(--c-accent) !important;
    text-decoration: none !important;

    &::before {
      display: none !important;
    }

    &:hover {
      text-decoration: underline !important;
    }
  }

  &::after {
    display: inline-block;
    margin: 0 5px;
    content: "•";
  }

  &:last-child::after {
    content: "";
  }
}
</style>
