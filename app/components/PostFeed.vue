<script setup>
const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})

const years = computed(() => {
  const groups = new Map()
  props.posts.forEach((post) => {
    const year = new Date(post.createdAt).getFullYear()
    groups.set(year, [...(groups.get(year) ?? []), post])
  })
  return [...groups.entries()].map(([year, posts]) => ({ year, posts }))
})
</script>

<template>
  <div class="feed">
    <section
      v-for="group in years"
      :key="group.year"
      class="year"
      data-shortcut-group
      :aria-labelledby="`year-${group.year}`"
    >
      <h2
        :id="`year-${group.year}`"
        class="year-title"
      >
        {{ group.year }}
        <span class="year-count">
          {{ group.posts.length }} {{ group.posts.length === 1 ? 'article' : 'articles' }}
        </span>
      </h2>
      <ol class="list">
        <li
          v-for="post in group.posts"
          :key="post.path"
        >
          <PostCard :post="post" />
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.feed {
  display: grid;
  gap: 32px;
}

.year {
  display: grid;
  gap: 14px;
}

.year-title {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--c-ink);
  letter-spacing: 0.01em;

  &::after {
    flex: 1;
    height: 0.0625rem;
    content: "";
    background: var(--c-line-strong);
  }
}

.year-count {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--c-ink-3);
}

.list {
  display: grid;
  gap: 14px;
  margin: 0;
}
</style>
