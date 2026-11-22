<script setup>
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array,
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const { copy, copied, isSupported } = useClipboard({ copiedDuring: 2000 })
const label = computed(() => props.filename || props.language || 'text')
</script>

<template>
  <figure class="code">
    <figcaption class="bar">
      <span class="label">{{ label }}</span>
      <ClientOnly>
        <button
          v-if="isSupported"
          type="button"
          class="copy"
          @click="copy(props.code)"
        >
          <Icon
            :name="copied ? 'lucide:check' : 'lucide:copy'"
            class="copy-icon"
            aria-hidden="true"
          />
          <span aria-live="polite">{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </ClientOnly>
    </figcaption>
    <pre :class="props.class"><slot /></pre>
  </figure>
</template>

<style scoped>
.code {
  margin: 1.75em 0;
  overflow: hidden;
  background: var(--c-code);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-m);

  @media (width < 768px) {
    margin-inline: calc(-1 * var(--gutter) + 4px);
  }
}

.bar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  min-height: 2.5rem;
  padding: 4px 8px 4px 16px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-ink-2);
  text-align: left;
  background: var(--c-surface-2);
  border-bottom: 1px solid var(--c-line);
}

.label {
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 0.02em;
}

.copy {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 4px 10px;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--c-ink-2);
  border-radius: var(--radius-pill);
  transition:
    color var(--duration) var(--ease-out),
    background-color var(--duration) var(--ease-out);

  &:hover {
    color: var(--c-ink);
    background: var(--c-surface);
  }
}

.copy-icon {
  width: 0.875rem;
  height: 0.875rem;
}

pre {
  background: transparent !important;
}
</style>
