<script setup>
definePageMeta({
  name: 'about',
})
</script>

<template>
  <article class="g-container">
    <h1 class="g-heading1">
      About me
    </h1>
    <p>
      I'm a developer who loves building things and solving problems. My brain works like a toggle switch - it's either in "fix this bug" mode or "how can we make this better" mode. I've been known to enthusiastically explain proper software architecture to anyone willing to listen (and sometimes to those who aren't).
    </p>

    <p>
      I'm a <span class="u-highlight">Staff Software Engineer</span> at CarStory (now part of Vroom), where I help build systems that make car buying less painful. On the side, I run a small <NuxtLink
        to="https://www.godacode.com"
        target="_blank"
      >software studio</NuxtLink> with friends, turning ideas into websites and apps. I started coding in 2007 with HTML and CSS, and I've been hoarding programming languages and frameworks ever since.
    </p>

    <p>
      I live in Serbia where I split my time between debugging code and debugging life. My family puts up with my tech obsessions because I occasionally emerge from behind my screens to be somewhat entertaining.
    </p>

    <NuxtPicture
      format="avif,webp"
      src="family.jpg"
      class="image"
      alt="Aleksandar Goševski's family"
      sizes="100vw md:800px"
    />
  </article>
</template>

<style scoped>
.g-heading1 {
  margin-bottom: 32px;
}

.image {
  margin-top: 64px;
}
</style>
