<template>
  <label class="label">
    <input
      type="checkbox"
      class="checkbox-input"
    >
    <span
      class="checkbox-box"
      aria-hidden="true"
    >
      <Icon
        name="ion:checkmark"
        size="16"
        class="icon-checkmark"
      />
    </span>
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

.checkbox-input {
  position: absolute;
  opacity: 0;

  &:focus + .checkbox-box {
    outline: 4px solid var(--c-primary);
  }

  &:checked + .checkbox-box {
    background-color: var(--c-primary);
    border-color: var(--c-primary);

    .icon-checkmark {
      visibility: visible;
      opacity: 1;
    }
  }
}

.checkbox-box {
  display: grid;
  place-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid black;
  border-radius: 4px;
  transition: var(--transition);
}

.icon-checkmark {
  visibility: hidden;
  color: white;
  opacity: 0;
  transition: var(--transition);
}
</style>
