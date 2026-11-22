<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const isNotFound = computed(() => Number(props.error?.statusCode) === 404)
const title = computed(() => isNotFound.value ? 'This page wandered off' : 'Something went wrong')
const message = computed(() => isNotFound.value
  ? 'The page you are looking for doesn’t exist or has been moved. The articles are all still here, though.'
  : 'An unexpected error happened on my end. Try again in a moment, or head back to the blog.')
const showError = computed(() => import.meta.dev)

useHead({
  htmlAttrs: { lang: 'en-US', dir: 'ltr' },
})

useSeoMeta({
  title: isNotFound.value ? 'Page not found' : 'Error',
  description: 'The page you are looking for doesn’t exist or has been moved.',
})
</script>

<template>
  <BaseSkipToContent />
  <PageShell>
    <div class="error">
      <div class="card">
        <p class="code">
          <span class="u-sr">Error </span>{{ error.statusCode || 500 }}
        </p>
        <h1 class="g-heading1">
          {{ title }}
        </h1>
        <p class="g-lead">
          {{ message }}
        </p>
        <div class="actions">
          <NuxtLink
            :to="{ name: 'home' }"
            class="button button--primary"
          >
            <Icon
              name="lucide:arrow-left"
              class="button-icon"
              aria-hidden="true"
            />
            Back to the blog
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'about' }"
            class="button"
          >
            About me
          </NuxtLink>
        </div>
      </div>
      <pre v-if="showError">{{ props.error }}</pre>
    </div>
  </PageShell>
</template>

<style scoped>
.error {
  display: grid;
  gap: 24px;
}

.card {
  display: grid;
  gap: 14px;
  justify-items: start;
  padding: 28px 24px;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  box-shadow: inset 0.375rem 0 0 var(--c-butter), var(--shadow-s);

  @media (width >= 768px) {
    padding: 40px 44px;
  }
}

.code {
  padding: 4px 14px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 600;
  background: var(--c-butter);
  border-radius: var(--radius-pill);
}

html.dark .code {
  color: var(--c-butter-deep);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.button {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 10px 18px;
  font-weight: 700;
  text-decoration: none;
  background: var(--c-surface);
  border: 1px solid var(--c-line-strong);
  border-radius: var(--radius-pill);
  transition:
    background-color var(--duration) var(--ease-out),
    box-shadow var(--duration) var(--ease-out);

  &:hover {
    box-shadow: var(--shadow-s);
  }

  &:focus-visible {
    border-radius: var(--radius-pill);
  }
}

.button--primary {
  color: var(--c-accent-ink);
  background: var(--c-accent);
  border-color: var(--c-accent);

  &:hover {
    background: color-mix(in oklab, var(--c-accent), black 10%);
  }
}

.button-icon {
  width: 1rem;
  height: 1rem;
}

pre {
  max-width: 100%;
  padding: 16px;
  overflow-x: auto;
  font-size: 0.75rem;
  white-space: pre-wrap;
  border: 1px dashed var(--c-line-strong);
  border-radius: var(--radius-m);
}
</style>
