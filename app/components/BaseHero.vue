<script setup>

</script>

<template>
  <section aria-labelledby="hero-heading">
    <h1
      id="hero-heading"
      class="g-heading1"
    >
      Hello, I'm <span class="u-highlight">Aleksandar</span> Goševski.
    </h1>
    <p class="description">
      I make stuff for the web.
    </p>
    <div class="about">
      Interested in my background? Check out my <NuxtLink :to="{ name: 'about' }">about page</NuxtLink>.
    </div>
  </section>
</template>

<style scoped>
section {
  margin-bottom: 32px;

  @media (width >= 768px) {
    margin-bottom: 96px;
  }
}

.description {
  margin: 1rem 0;
  font-family: "Caskaydia Cove", "Courier New", monospace;
  font-size: 1.5rem;
  color: var(--c-gray);

  @media (width >= 768px) {
    font-size: 2rem;
  }
}
</style>
