<script setup>
const colorMode = useColorMode()
function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function toggleMode() {
  if (colorMode.value === 'dark') {
    colorMode.preference = 'light'
  }
  else {
    colorMode.preference = 'dark'
  }
}
</script>

<template>
  <ul>
    <li class="icon">
      <NuxtLink
        to="https://www.github.com/aleksandargosevski"
        aria-label="Aleksandar's GitHub profile"
      >
        <Icon
          name="mdi:github"
          size="24"
        />
      </NuxtLink>
    </li>
    <li class="icon">
      <NuxtLink
        to="https://www.linkedin.com/in/aleksandargosevski"
        aria-label="Aleksandar's LinkedIn profile"
      >
        <Icon
          name="mdi:linkedin"
          size="24"
        />
      </NuxtLink>
    </li>
    <li class="icon">
      <a
        href="/rss.xml"
        target="_blank"
        aria-label="RSS feed"
      >
        <Icon
          name="mdi:rss"
          size="24"
        />
      </a>
    </li>
    <li class="icon">
      <button
        aria-label="Toggle color mode"
        @click="toggleMode"
      >
        <Icon
          name="lets-icons:color-mode-light"
          size="24"
        />
      </button>
    </li>
    <li class="icon">
      <button
        aria-label="Go to top"
        @click="goToTop"
      >
        <Icon
          name="mdi:arrow-top"
          size="24"
        />
      </button>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  gap: 1px;
  padding: 0;
  margin: 0;
}

.icon {
  a,
  button {
    display: flex;
    padding: 4px;
    color: var(--c-text);

    &::before {
      display: none;
    }

    &:hover {
      color: var(--c-accent);
      transform: translateY(-2px);
    }
  }
}
</style>
