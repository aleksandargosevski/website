<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})

const links = [
  { label: 'GitHub', href: 'https://www.github.com/aleksandargosevski', icon: 'lucide:github', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aleksandargosevski', icon: 'lucide:linkedin', external: true },
  { label: 'RSS', href: '/rss.xml', icon: 'lucide:rss', external: false },
]
</script>

<template>
  <ul
    class="socials"
    :class="{ 'socials--compact': compact }"
  >
    <li
      v-for="link in links"
      :key="link.label"
    >
      <a
        :href="link.href"
        class="social"
        :class="{ 'social--rss': !link.external }"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noopener me' : undefined"
        :title="compact ? link.label : undefined"
      >
        <Icon
          :name="link.icon"
          class="social-icon"
          aria-hidden="true"
        />
        <span :class="{ 'u-sr': compact }">{{ link.label }}</span>
        <span
          v-if="link.external"
          class="u-sr"
        >(opens in a new tab)</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
}

.social {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--c-ink);
  text-decoration: none;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-pill);
  transition:
    border-color var(--duration) var(--ease-out),
    box-shadow var(--duration) var(--ease-out);

  &:hover {
    border-color: var(--c-line-strong);
    box-shadow: var(--shadow-s);
  }

  &:focus-visible {
    border-radius: var(--radius-pill);
  }
}

.socials--compact .social {
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

.social-icon {
  width: 1rem;
  height: 1rem;
}

.social--rss .social-icon {
  color: var(--c-rss);
}
</style>
