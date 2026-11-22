<script setup>
definePageMeta({
  name: 'post',
})
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const { findNeighbours } = await usePosts()
const neighbours = computed(() => findNeighbours(route.path))
const minutes = computed(() => readingTime(post.value.body))
const tone = computed(() => tagTone(post.value.tags[0]))
const toc = computed(() => post.value.body?.toc?.links ?? [])
const article = computed(() => ({ toc: toc.value, tags: post.value.tags }))

const pager = computed(() => [
  neighbours.value.previous && { ...neighbours.value.previous, label: 'Older article', icon: 'lucide:arrow-left' },
  neighbours.value.next && { ...neighbours.value.next, label: 'Newer article', icon: 'lucide:arrow-right' },
].filter(Boolean))

const siteConfig = useSiteConfig()

const publishedAt = new Date(post.value.createdAt).toISOString()

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogType: 'article',
  articlePublishedTime: publishedAt,
  articleModifiedTime: publishedAt,
  articleAuthor: ['https://www.aleksandargosevski.com/about'],
  articleTag: post.value.tags,
})

const [ogImageUrl] = defineOgImage('BlogCard', {
  title: post.value.title,
  description: post.value.description,
  eyebrow: `#${post.value.tags[0]}`,
  meta: `${formatDate(post.value.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })} · ${minutes.value} min read`,
  tone: tone.value,
}, { alt: post.value.title })

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
  'image': ogImageUrl,
  'author': {
    '@id': `${siteConfig.url}/#identity`,
  },
  'url': `${siteConfig.url}${route.path}`,
  'isPartOf': {
    '@id': `${siteConfig.url}/#website`,
  },
  'about': post.value.tags.map(tag => ({
    '@type': 'Thing',
    '@id': `${siteConfig.url}/tags/${tag}`,
    'name': tag,
  })),
})
</script>

<template>
  <PageShell :article="article">
    <article class="post">
      <header
        class="head"
        :class="`tone-${tone}`"
      >
        <NuxtLink
          :to="`/tags/${post.tags[0]}`"
          class="kicker"
        >
          <span
            class="kicker-badge"
            :style="{ viewTransitionName: `post-badge-${slugify(post.title)}` }"
          >
            <Icon
              :name="postIcon(post.tags)"
              class="kicker-icon"
              aria-hidden="true"
            />
          </span>
          {{ post.tags[0] }}
        </NuxtLink>
        <h1
          class="g-heading1"
          :style="{ viewTransitionName: `post-title-${slugify(post.title)}` }"
        >
          {{ post.title }}
        </h1>
        <p class="g-lead">
          {{ post.description }}
        </p>
        <p class="meta">
          <time :datetime="new Date(post.createdAt).toISOString()">
            {{ formatDate(post.createdAt, { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </time>
          <span aria-hidden="true">·</span>
          <span>{{ minutes }} min read</span>
        </p>
      </header>

      <details
        v-if="toc.length"
        class="toc-mobile"
      >
        <summary class="toc-summary">
          <Icon
            name="lucide:list"
            class="toc-summary-icon"
            aria-hidden="true"
          />
          On this page
          <Icon
            name="lucide:chevron-down"
            class="toc-chevron"
            aria-hidden="true"
          />
        </summary>
        <TocList
          :links="toc"
          class="toc-mobile-list"
        />
      </details>

      <ContentRenderer
        :value="post"
        class="g-content body"
      />

      <footer class="foot">
        <h2 class="foot-title">
          Filed under
        </h2>
        <TagList :tags="post.tags" />
      </footer>
    </article>

    <nav
      v-if="pager.length"
      class="pager"
      aria-label="More articles"
    >
      <NuxtLink
        v-for="item in pager"
        :key="item.path"
        :to="item.path"
        :data-shortcut="item.label === 'Newer article' ? 'newer' : 'older'"
        class="pager-card"
        :class="[`tone-${tagTone(item.tags[0])}`, { 'pager-card--next': item.label === 'Newer article' }]"
      >
        <span class="pager-label">
          <Icon
            :name="item.icon"
            class="pager-icon"
            aria-hidden="true"
          />
          {{ item.label }}
        </span>
        <span
          class="pager-title"
          :style="{ viewTransitionName: `post-title-${slugify(item.title)}` }"
        >{{ item.title }}</span>
      </NuxtLink>
    </nav>
  </PageShell>
</template>

<style scoped>
.head {
  display: grid;
  gap: 14px;
  padding-bottom: 28px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--c-line);

  @media (width >= 1024px) {
    padding-top: 12px;
    margin-bottom: 40px;
  }
}

.kicker {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-self: start;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--c-ink-2);
  text-transform: capitalize;
  text-decoration: none;

  &:hover {
    color: var(--c-ink);
  }
}

.kicker-badge {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  color: var(--c-ink);
  background: var(--tone);
  border-radius: 50%;
}

html.dark .kicker-badge {
  color: var(--tone-deep);
}

.kicker-icon {
  width: 1rem;
  height: 1rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--c-ink-3);
}

.toc-mobile {
  margin-bottom: 32px;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-l);

  @media (width >= 1024px) {
    display: none;
  }

  &[open] .toc-chevron {
    rotate: 180deg;
  }
}

.toc-summary {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
  list-style: none;
  border-radius: var(--radius-l);

  &::-webkit-details-marker {
    display: none;
  }
}

.toc-summary-icon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--c-accent);
}

.toc-chevron {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
  color: var(--c-ink-3);
  transition: rotate var(--duration) var(--ease-out);
}

.toc-mobile-list {
  padding: 0 12px 14px;
}

.foot {
  padding-top: 24px;
  margin-top: 48px;
  border-top: 1px solid var(--c-line);

  @media (width >= 1024px) {
    display: none;
  }
}

.foot-title {
  margin: 0 0 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.pager {
  display: grid;
  gap: 14px;
  margin-top: 40px;

  @media (width >= 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.pager-card {
  --edge: var(--tone);

  display: grid;
  gap: 6px;
  align-content: start;
  padding: 18px 20px 20px 24px;
  text-decoration: none;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-l);
  box-shadow: inset 0.375rem 0 0 var(--edge), var(--shadow-s);
  transition:
    translate var(--duration) var(--ease-out),
    box-shadow var(--duration) var(--ease-out);

  &:hover {
    box-shadow: inset 0.375rem 0 0 var(--edge), var(--shadow-m);
    translate: 0 -2px;
  }

  &:focus-visible {
    border-radius: var(--radius-l);
  }
}

.pager-card--next {
  @media (width >= 768px) {
    grid-column: 2;
    text-align: right;

    .pager-label {
      flex-direction: row-reverse;
      justify-self: end;
    }
  }
}

html.dark .pager-card {
  --edge: var(--tone-deep);
}

.pager-label {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--c-ink-3);
}

.pager-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.pager-title {
  font-size: 1.0625rem;
  font-weight: 800;
  line-height: 1.35;
  transition: color var(--duration) var(--ease-out);
}

.pager-card:hover .pager-title {
  color: var(--c-accent);
}
</style>
