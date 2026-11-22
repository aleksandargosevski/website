<script setup>
defineProps({
  article: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="shell">
    <SiteSidebar :article="article" />
    <div class="shell-column">
      <main
        id="main"
        class="shell-main"
        tabindex="-1"
      >
        <slot />
      </main>
      <SiteFooter />
    </div>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  flex: 1;
  gap: 32px;
  width: 100%;
  max-width: var(--shell-width);
  padding: 12px var(--gutter) 0;
  margin-inline: auto;

  @media (width >= 768px) {
    gap: 48px;
    padding-top: 24px;
  }

  @media (width >= 1024px) {
    grid-template-columns: minmax(16.5rem, var(--sidebar-width)) minmax(0, var(--feed-width));
    gap: 48px;
    align-items: start;
    justify-content: center;
    padding-top: 32px;
  }

  @media (width >= 1280px) {
    gap: 80px;
  }
}

.shell-column {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100%;
}

.shell-main {
  flex: 1;

  &:focus {
    outline: none;
  }
}
</style>
