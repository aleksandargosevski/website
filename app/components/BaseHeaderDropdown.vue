<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

const open = ref(false)
const menu = ref(null)
const isLargeScreen = useMediaQuery('(min-width: 768px)')

function onClick() {
  const firstFocusableElement = menu.value.querySelectorAll('[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable],iframe,object,embed')[0]

  if (open.value) {
    open.value = false
    return
  }

  open.value = true
  setTimeout(() => {
    firstFocusableElement?.focus()
  }, 0)
}

function onMouseEnter() {
  if (!isLargeScreen.value) return
  open.value = true
}

function onMouseLeave() {
  if (!isLargeScreen.value) return
  open.value = false
}

function onBlur(e) {
  if (!e.currentTarget.contains(e.relatedTarget) && isLargeScreen.value) {
    open.value = false
  }
}
</script>

<template>
  <li
    class="dropdown-wrap"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusout="onBlur"
  >
    <button
      :aria-expanded="open"
      :aria-controls="`${props.label}-dropdown`"
      :aria-label="`${props.label} submenu`"
      type="button"
      class="dropdown-btn"
      @click="onClick"
    >
      {{ props.label }}
      <Icon
        name="ion:chevron-down"
        aria-hidden="true"
        size="16"
        class="dropdown-icon"
        :class="{ open: open }"
      />
    </button>
    <div
      :id="`${props.label}-dropdown`"
      ref="menu"
      class="dropdown"
      :aria-hidden="!open"
      :hidden="!open"
      :class="{ open: open }"
    >
      <div class="dropdown-content">
        <slot />
      </div>
    </div>
  </li>
</template>

<style>
.dropdown-wrap {
  position: relative;
}

.dropdown-icon {
  vertical-align: middle;
  transition: var(--transition);

  &.open {
    transform: rotate(-180deg);
  }
}

.dropdown {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.15s ease-out;

  @media (--medium) {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    white-space: nowrap;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 8px 0 #0003;
  }

  &.open {
    grid-template-rows: 1fr;
  }
}

.dropdown-content {
  visibility: hidden;
  min-height: 0;
  padding-inline: 24px;
  font-size: 20px;
  transition: var(--transition);

  @media (--medium) {
    padding-inline: 16px;
    font-size: 16px;
  }

  .open & {
    visibility: visible;
    padding-top: 16px;

    @media (--medium) {
      padding-block: 16px;
    }
  }
}
</style>
