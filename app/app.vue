<script setup>
const route = useRoute()
const img = useImage()
const bodyClass = computed(() => `page-${route.name}`)

useHead({
  bodyAttrs: {
    class: bodyClass.value,
  },
  htmlAttrs: {
    lang: 'en-US',
    dir: 'ltr',
  },
  meta: [
    { name: 'msapplication-TileColor', content: '#000' },
    { name: 'msapplication-TileImage', content: '/favicon-144x144.png' },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    { property: 'og:image', content: `${img('og-image.jpg', { w: '1200', h: '630' })}` },
    { name: 'twitter:image', content: `${img('og-image.jpg', { w: '1200', h: '630' })}` },
  ],
  link: [
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
})
</script>

<template>
  <BaseSkipToContent />
  <NuxtRouteAnnouncer />
  <BaseHeader />
  <main
    id="main"
    class="main"
  >
    <NuxtPage />
  </main>
  <BaseFooter />
</template>

<style>
.main {
  @media (--medium) {
    padding-block: 128px 0;
  }
}

/* View transitions */
::view-transition-old(root) {
  /* animation-duration: 2s; */

  /* animation-delay: 1s; */
}

::view-transition-new(root) {
  animation-name: fade-in-with-scroll;
  animation-duration: 0.3s;
  animation-delay: 0.3s;
}

@keyframes fade-in-with-scroll {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
