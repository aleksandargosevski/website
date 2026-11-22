<template>
  <a
    href="#main"
    class="skip"
  >Skip to main content</a>
</template>

<style scoped>
.skip {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 10px 18px;
  font-weight: 800;
  color: var(--c-accent-ink);
  text-decoration: none;
  background: var(--c-accent);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-m);
  translate: 0 -200%;

  &:focus-visible {
    translate: 0;
  }
}
</style>
