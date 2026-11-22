<script setup>
definePageMeta({
  name: 'home',
})

const { posts, tags } = await usePosts()
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
  <PageShell>
    <div class="home">
      <header class="intro">
        <p class="g-eyebrow">
          The blog
        </p>
        <h1 class="g-heading1">
          Notes on building things.
        </h1>
        <p class="g-lead">
          Hi, I’m Aleksandar. I spent most of my career building for the web. Now, with AI in the loop,
          I build all sorts of things, and this is where I write down what I learn along the way.
        </p>
      </header>

      <nav
        class="topics"
        aria-labelledby="home-topics-title"
      >
        <h2
          id="home-topics-title"
          class="topics-title"
        >
          Browse by topic
        </h2>
        <TagList
          :tags="tags.map(tag => tag.name)"
          :counts="Object.fromEntries(tags.map(tag => [tag.name, tag.count]))"
        />
      </nav>

      <PostFeed :posts="posts" />
    </div>
  </PageShell>
</template>

<style scoped>
.home {
  display: grid;
  gap: 32px;

  @media (width >= 768px) {
    gap: 48px;
  }
}

.intro {
  display: grid;
  gap: 12px;
  max-width: 38rem;

  @media (width >= 1024px) {
    padding-top: 12px;
  }
}

.topics {
  @media (width >= 1024px) {
    display: none;
  }
}

.topics-title {
  margin: 0 0 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
</style>
