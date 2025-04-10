<template>
  <label class="label">
    <input
      type="radio"
      class="radio-input"
    >
    <span
      class="radio-box"
      aria-hidden="true"
    />
    <slot />
  </label>
</template>

<style scoped>
.label {
  position: relative;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}

.radio-input {
  position: absolute;
  opacity: 0;

  &:focus + .radio-box {
    outline: 4px solid var(--c-primary);
  }

  &:checked + .radio-box {
    background-color: var(--c-primary);
    border-color: var(--c-primary);
    box-shadow: inset 0 0 0 3px white;

    .icon-checkmark {
      visibility: visible;
      opacity: 1;
    }
  }
}

.radio-box {
  width: 16px;
  height: 16px;
  border: 1px solid black;
  border-radius: 50%;
  transition: var(--transition);
}
</style>
