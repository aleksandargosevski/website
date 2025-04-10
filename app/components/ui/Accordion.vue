<script setup>
</script>

<template>
  <details>
    <summary class="summary">
      <slot name="summary" />
      <Icon
        name="ion:chevron-down"
        size="24"
        class="summary-icon"
      />
    </summary>
    <slot name="content" />
  </details>
</template>

<style scoped>
.summary {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.summary-icon {
  transition: var(--transition);

  [open] & {
    transform: rotate(-180deg);
  }
}
</style>
