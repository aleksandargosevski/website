<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const showError = computed(() => process.env.NODE_ENV !== 'production')
</script>

<template>
  <Html
    lang="en-US"
    dir="ltr"
  >
    <Head>
      <Title>Page not found</Title>
      <Meta
        name="description"
        content="The page you are looking for doesn’t exist or has been moved."
      />
    </Head>
    <div class="g-container">
      <div class="wrap">
        <NuxtLink
          :to="{ name: 'home' }"
          class="logo"
        >
          <img
            src="~/assets/images/logo.svg"
            alt="Godacode Logo"
          >
        </NuxtLink>
        <div>
          <h1 class="g-heading2">
            Page not found
          </h1>
          <p>
            The page you are looking for doesn’t exist or has been moved.
          </p>
        </div>
        <NuxtLink
          :to="{ name: 'home' }"
          class="g-button"
        >
          Go to Home Page
        </NuxtLink>

        <pre v-if="showError">{{ props.error }}</pre>
      </div>
    </div>
  </Html>
</template>

<style scoped>
.g-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding-block: 32px;
}

.wrap {
  display: grid;
  gap: 32px;
  text-align: center;
}

.g-button {
  max-width: 300px;
  margin: auto;
}

pre {
  max-width: 100%;
  padding: 16px;
  overflow-x: auto;
  text-align: left;
  white-space: pre-wrap;
  border: 1px dashed gray;
  border-radius: 8px;
}
</style>
