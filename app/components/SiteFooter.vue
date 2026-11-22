<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p class="copy">
      © 2007–{{ year }} Aleksandar Goševski
    </p>
    <SocialLinks class="footer-socials" />
    <p class="studio">
      Also building things at
      <a
        href="https://www.godacode.com"
        target="_blank"
        rel="noopener"
      >Godacode<span class="u-sr"> (opens in a new tab)</span></a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
  justify-content: space-between;
  padding-block: 28px 32px;
  margin-top: 64px;
  font-size: 0.875rem;
  color: var(--c-ink-3);
  border-top: 1px solid var(--c-line);

  @media (width >= 1024px) {
    margin-top: 96px;
  }
}

.copy,
.studio {
  margin: 0;
}

.studio a {
  font-weight: 700;
  color: var(--c-ink-2);
  text-decoration: underline;
  text-decoration-color: var(--c-line-strong);

  &:hover {
    color: var(--c-accent);
    text-decoration-color: currentcolor;
  }
}

.footer-socials {
  order: -1;
  width: 100%;

  @media (width >= 1024px) {
    display: none;
  }
}
</style>
