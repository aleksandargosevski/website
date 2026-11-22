<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="toggle"
    aria-label="Toggle dark mode"
    title="Toggle dark mode"
    @click="toggleColorMode"
  >
    <Icon
      name="lucide:moon"
      class="icon icon--moon"
      aria-hidden="true"
    />
    <Icon
      name="lucide:sun"
      class="icon icon--sun"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.toggle {
  display: inline-grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--c-ink);
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: 50%;
  transition:
    background-color var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out);

  &:hover {
    background: var(--c-butter-soft);
    border-color: var(--c-line-strong);
  }

  &:focus-visible {
    border-radius: 50%;
  }
}

.icon {
  grid-area: 1 / 1;
  width: 1.125rem;
  height: 1.125rem;
}

.icon--sun {
  display: none;
}

html.dark .icon--sun {
  display: block;
}

html.dark .icon--moon {
  display: none;
}
</style>
