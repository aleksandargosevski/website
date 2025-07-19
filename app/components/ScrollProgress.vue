<template>
  <div class="scroll-progress" />
</template>

<style scoped>
@supports (animation-timeline: scroll()) {
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--c-accent);
    animation: scroll-progress 1.5s linear forwards;
    animation-timeline: scroll();
  }

  @keyframes scroll-progress {
    from { width: 0; }
    to { width: 100%; }
  }
}
</style>
