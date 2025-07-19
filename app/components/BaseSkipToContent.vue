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
  border: 4px solid black !important;
  border-radius: 8px;

  &:focus {
    top: 10px !important;
    left: 10px !important;

    /* overrides for u-sr class */
    width: auto !important;
    height: auto !important;
    padding: 5px !important;
    clip: auto !important;
    clip-path: none !important;
  }
}
</style>
