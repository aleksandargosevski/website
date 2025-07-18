<script setup>

</script>

<template>
  <header
    ref="header"
    class="header"
  >
    <div class="g-container">
      <nav aria-label="Navigation">
        <ul class="nav-list">
          <li>
            <NuxtLink
              :to="{ name: 'home' }"
              class="nav-link"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'about' }"
              class="nav-link"
            >
              About
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <BaseIcons />
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-block: 8px;
  margin-bottom: 32px;
  background: var(--c-primary);
  border-bottom: 1px solid var(--c-thin-gray);
  transition: var(--transition);

  @media (--medium) {
    display: none;
  }
}

.g-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  gap: 16px;
}
</style>
