<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  headingLevel: {
    type: Number,
    default: 3,
  },
})

const tone = computed(() => tagTone(props.post.tags[0]))
const icon = computed(() => postIcon(props.post.tags))
const transitionKey = computed(() => slugify(props.post.title))
</script>

<template>
  <article
    class="card"
    :class="`tone-${tone}`"
  >
    <span
      class="badge"
      :style="{ viewTransitionName: `post-badge-${transitionKey}` }"
    >
      <Icon
        :name="icon"
        class="badge-icon"
        aria-hidden="true"
      />
    </span>
    <div class="body">
      <component
        :is="`h${headingLevel}`"
        class="title"
        :style="{ viewTransitionName: `post-title-${transitionKey}` }"
      >
        <NuxtLink
          :to="post.path"
          class="link"
          data-shortcut-item
        >
          {{ post.title }}
        </NuxtLink>
      </component>
      <p class="meta">
        <time :datetime="new Date(post.createdAt).toISOString()">
          {{ formatDate(post.createdAt, { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </time>
        <span aria-hidden="true">·</span>
        <span>{{ post.minutes }} min read</span>
      </p>
      <p class="description">
        {{ post.description }}
      </p>
      <TagList
        :tags="post.tags"
        class="tags"
      />
    </div>
  </article>
</template>

<style scoped>
.card {
  --edge: var(--tone);

  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
  padding: 20px 18px 20px 22px;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-l);
  box-shadow: inset 0.375rem 0 0 var(--edge), var(--shadow-s);
  transition:
    translate var(--duration) var(--ease-out),
    box-shadow var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out);

  @media (width >= 768px) {
    gap: 20px;
    padding: 24px 28px 24px 30px;
  }

  &:hover {
    border-color: var(--c-line-strong);
    box-shadow: inset 0.375rem 0 0 var(--edge), var(--shadow-m);
    translate: 0 -2px;
  }

  &:has(.link:focus-visible) {
    outline: 0.1875rem solid var(--c-focus);
    outline-offset: 3px;
  }
}

html.dark .card {
  --edge: var(--tone-deep);
}

.badge {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--c-ink);
  background: var(--tone);
  border-radius: 50%;

  @media (width >= 768px) {
    width: 2.875rem;
    height: 2.875rem;
  }
}

html.dark .badge {
  color: var(--tone-deep);
}

.badge-icon {
  width: 1.25rem;
  height: 1.25rem;

  @media (width >= 768px) {
    width: 1.375rem;
    height: 1.375rem;
  }
}

.body {
  display: grid;
  gap: 6px;
}

.title {
  margin: 0;
  font-size: 1.1875rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.015em;

  @media (width >= 768px) {
    font-size: 1.375rem;
  }
}

.link {
  text-decoration: none;
  transition: color var(--duration) var(--ease-out);

  &::after {
    position: absolute;
    inset: 0;
    content: "";
    border-radius: var(--radius-l);
  }

  &:focus-visible {
    outline: none;
  }
}

.card:hover .link {
  color: var(--c-accent);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  order: -1;
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--c-ink-3);
}

.description {
  margin: 2px 0 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--c-ink-2);

  @media (width >= 768px) {
    font-size: 1rem;
  }
}

.tags {
  margin-top: 8px;
}

@media (width < 768px) {
  .card {
    gap: 8px 10px;
  }

  .body {
    display: contents;
  }

  .badge {
    order: -2;
    width: 2rem;
    height: 2rem;
  }

  .badge-icon {
    width: 1rem;
    height: 1rem;
  }

  .meta {
    align-self: center;
  }

  .title,
  .description,
  .tags {
    grid-column: 1 / -1;
  }

  .tags {
    margin-top: 6px;
  }
}
</style>
