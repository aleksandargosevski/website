<template>
  <a
    href="#main"
    class="u-sr"
  >Skip to main content</a>
</template>

<style scoped>
a {
  z-index: 10000;
  color: black;
  background: white;
  border: 0.25rem solid black !important;
  border-radius: 8px;

  &:focus {
    top: 10px !important;
    left: 0.625rem !important;

    /* overrides for u-sr class */
    width: auto !important;
    height: auto !important;
    padding: 5px !important;
    clip-path: none !important;
  }
}
</style>
