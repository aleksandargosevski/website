<script setup>
const particles = ref([])

// Generate particle data on mount to ensure consistency
onMounted(() => {
  particles.value = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    size: Math.random() * 2 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 40 + 30,
    animationDelay: Math.random() * -20,
    opacity: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
  }))
})

const getParticleStyle = particle => ({
  left: `${particle.left}%`,
  top: `${particle.top}%`,
  width: `${particle.size}px`,
  height: `${particle.size}px`,
  opacity: particle.opacity,
  animationDuration: `${particle.animationDuration}s`,
  animationDelay: `${particle.animationDelay}s`,
})
</script>

<template>
  <div
    class="background-particles"
    aria-hidden="true"
    role="presentation"
  >
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="getParticleStyle(particle)"
    />
  </div>
</template>

<style scoped>
.background-particles {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  view-transition-name: none;
}

.particle {
  position: absolute;
  background: currentcolor;
  border-radius: 50%;
  animation: float-around infinite linear;
}

@keyframes float-around {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(30vw, 15vh) rotate(90deg);
  }

  50% {
    transform: translate(-20vw, 40vh) rotate(180deg);
  }

  75% {
    transform: translate(25vw, -10vh) rotate(270deg);
  }

  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none;
  }
}
</style>
