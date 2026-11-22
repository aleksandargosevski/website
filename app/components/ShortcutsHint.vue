<script setup>
const { openHelp } = useShortcuts()
</script>

<template>
  <button
    type="button"
    class="hint"
    @click="openHelp"
  >
    Press <kbd class="key">?</kbd> for keyboard shortcuts
  </button>
</template>

<style scoped>
.hint {
  display: none;
  gap: 6px;
  align-items: center;
  padding: 0;
  font: inherit;
  font-size: 0.875rem;
  color: var(--c-ink-3);
  cursor: pointer;
  background: none;
  border: 0;
  transition: color var(--duration) var(--ease-out);

  &:hover {
    color: var(--c-ink);
  }

  @media (hover: hover) and (pointer: fine) {
    display: inline-flex;
  }
}

.key {
  display: inline-grid;
  place-items: center;
  min-width: 1.375rem;
  height: 1.375rem;
  padding-inline: 4px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-ink-2);
  background: var(--c-surface);
  border: 1px solid var(--c-line-strong);
  border-bottom-width: 2px;
  border-radius: var(--radius-s);
}
</style>
