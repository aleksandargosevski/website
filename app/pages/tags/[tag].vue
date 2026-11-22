<script setup>
definePageMeta({
  name: 'tag',
})

const route = useRoute()
const tag = computed(() => String(route.params.tag))

const { posts } = await usePosts()
const taggedPosts = computed(() => posts.value.filter(post => post.tags.includes(tag.value)))

if (!taggedPosts.value.length) {
  throw createError({ statusCode: 404, statusMessage: 'Topic not found', fatal: true })
}

const countLabel = computed(() => `${taggedPosts.value.length} ${taggedPosts.value.length === 1 ? 'article' : 'articles'}`)

useSeoMeta({
  title: `Articles about ${tag.value}`,
  description: `${countLabel.value} about ${tag.value} by Aleksandar Goševski.`,
})

defineOgImage('BlogCard', {
  title: `Articles about ${tag.value}`,
  description: `Everything I’ve written about ${tag.value}, newest first.`,
  eyebrow: `#${tag.value}`,
  meta: countLabel.value,
  tone: tagTone(tag.value),
}, { alt: `Articles about ${tag.value} by Aleksandar Goševski` })
</script>

<template>
  <PageShell>
    <div class="tag-page">
      <header
        class="banner"
        :class="`tone-${tagTone(tag)}`"
      >
        <span class="badge">
          <Icon
            :name="tagIcon(tag)"
            class="badge-icon"
            aria-hidden="true"
          />
        </span>
        <div class="banner-text">
          <p class="g-eyebrow eyebrow">
            Topic · {{ countLabel }}
          </p>
          <h1 class="g-heading1 title">
            #{{ tag }}
          </h1>
        </div>
        <NuxtLink
          :to="{ name: 'home' }"
          class="all"
        >
          <Icon
            name="lucide:arrow-left"
            class="all-icon"
            aria-hidden="true"
          />
          All articles
        </NuxtLink>
      </header>

      <PostFeed :posts="taggedPosts" />
    </div>
  </PageShell>
</template>

<style scoped>
.tag-page {
  display: grid;
  gap: 32px;

  @media (width >= 768px) {
    gap: 48px;
  }
}

.banner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 16px 18px;
  align-items: center;
  padding: 22px;
  background: var(--tone-soft);
  border: 1px solid color-mix(in oklab, var(--tone-deep), transparent 65%);
  border-radius: var(--radius-xl);

  @media (width >= 768px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    padding: 28px 32px;
  }
}

.badge {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  color: var(--c-ink);
  background: var(--tone);
  border-radius: 50%;

  @media (width >= 768px) {
    width: 4.25rem;
    height: 4.25rem;
  }
}

html.dark .badge {
  color: var(--tone-deep);
}

.badge-icon {
  width: 1.625rem;
  height: 1.625rem;

  @media (width >= 768px) {
    width: 2rem;
    height: 2rem;
  }
}

.banner-text {
  display: grid;
  gap: 4px;
}

.eyebrow {
  color: var(--c-ink-2);
}

.all {
  display: inline-flex;
  grid-column: 1 / -1;
  gap: 8px;
  align-items: center;
  justify-self: start;
  padding: 8px 14px;
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-pill);
  transition: box-shadow var(--duration) var(--ease-out);

  @media (width >= 768px) {
    grid-column: auto;
  }

  &:hover {
    box-shadow: var(--shadow-s);
  }

  &:focus-visible {
    border-radius: var(--radius-pill);
  }
}

.all-icon {
  width: 1rem;
  height: 1rem;
}
</style>
