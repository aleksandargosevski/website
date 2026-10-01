<template>
  <footer>
    <div class="left">
      <ul>
        <li><NuxtLink :to="{ name: 'home' }">Home</NuxtLink></li>
        <li><NuxtLink :to="{ name: 'about' }">About</NuxtLink></li>
      </ul>
    </div>
    <p class="center">
      Copyright © 2007-{{ new Date().getFullYear() }} Aleksandar Goševski.
    </p>
    <BaseIcons class="right" />
  </footer>
</template>

<style scoped>
footer {
  padding: 16px;
  margin-top: auto;
  font-size: 0.875rem;
  background: var(--c-primary);
  border-top: 1px solid var(--c-thin-gray);

  @media (width >= 768px) {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }
}

.left {
  display: none;

  @media (width >= 768px) {
    display: flex;
  }

  ul {
    display: flex;
    gap: 8px;
  }

  li {
    &::after {
      padding-left: 8px;
      content: "•";
    }

    &:last-child::after {
      content: "";
    }
  }

  a {
    background: none;
  }

  .router-link-active {
    font-weight: bold;
  }
}

.center {
  @media (width >= 768px) {
    text-align: center;
  }
}

.right {
  display: none;

  @media (width >= 768px) {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
