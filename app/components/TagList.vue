<script setup>
defineProps({
  tags: {
    type: Array,
    required: true,
  },
  counts: {
    type: Object,
    default: null,
  },
  active: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <ul class="tags">
    <li
      v-for="tag in tags"
      :key="tag"
    >
      <NuxtLink
        :to="`/tags/${tag}`"
        class="g-pill tag"
        :class="[`tone-${tagTone(tag)}`, { 'tag--active': tag === active }]"
        :aria-current="tag === active ? 'page' : undefined"
      >
        {{ tag }}
        <span
          v-if="counts"
          class="count"
        >
          <span class="u-sr">(</span>{{ counts[tag] }}<span class="u-sr"> articles)</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
}

.tag {
  position: relative;
  z-index: 1;
}

.tag--active {
  background: var(--tone);
  border-color: var(--tone-deep);
}

.count {
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--c-ink-3);
}
</style>
