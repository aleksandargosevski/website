<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  to: {
    type: [String, Object],
    default: '', // If it exists, use <NuxtLink> instead of <button>
  },
  size: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: '',
  },
})

const component = props.to ? resolveComponent('NuxtLink') : 'button'
</script>

<template>
  <component
    :is="component"
    :type="props.to ? null : props.type"
    :to="props.to || null"
    class="base-button"
    :class="[
      props.size && `base-button--${props.size}`,
      props.variant && `base-button--${props.variant}`,
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 11px 24px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background: var(--c-primary);
  border: 1px solid transparent;
  border-radius: 8px;
  transition: var(--transition);

  &:hover:not([disabled]) {
    background: black;
  }

  &[disabled] {
    color: black;
    cursor: not-allowed;
    background: gray;
  }

  &.is-full-until-md {
    width: 100%;

    @media (--medium) {
      width: auto;
    }
  }
}

/* Sizes */
.base-button--small {
  padding-block: 8px;
  font-size: 14px;
}

/* Variants */
.base-button--secondary {
  color: white;
  background: black;

  &:hover:not([disabled]) {
    background: var(--c-primary);
  }
}

.base-button--tertiary { /* Ghost button */
  color: var(--c-primary);
  background: white;
  border: 1px solid var(--c-primary);

  &:hover:not([disabled]) {
    color: white;
    background: var(--c-primary);
  }
}
</style>
