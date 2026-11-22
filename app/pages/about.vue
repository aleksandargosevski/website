<script setup>
definePageMeta({
  name: 'about',
})

useSeoMeta({
  title: 'About',
  description: 'Aleksandar Goševski is a Staff Software Engineer at CarStory (Vroom) who co-runs the software studio Godacode, builds all sorts of things with AI and lives in Serbia.',
})

const facts = [
  { tone: 'sky', icon: 'lucide:briefcase', label: 'Day job', value: 'Staff Software Engineer', note: 'CarStory, now part of Vroom' },
  { tone: 'mint', icon: 'lucide:users', label: 'On the side', value: 'Godacode', note: 'A small software studio with friends' },
  { tone: 'bubblegum', icon: 'lucide:map-pin', label: 'Based in', value: 'Serbia', note: 'Home, with my family' },
  { tone: 'butter', icon: 'lucide:hammer', label: 'Building since', value: '2007', note: 'Started with HTML and CSS' },
]

const elsewhere = [
  { label: 'GitHub', href: 'https://www.github.com/aleksandargosevski', icon: 'lucide:github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aleksandargosevski', icon: 'lucide:linkedin' },
  { label: 'Godacode', href: 'https://www.godacode.com', icon: 'lucide:arrow-up-right' },
]
</script>

<template>
  <PageShell>
    <article class="about">
      <header class="head">
        <p class="g-eyebrow">
          About
        </p>
        <h1 class="g-heading1">
          Hi, I’m Aleksandar.
        </h1>
      </header>

      <div class="g-content text">
        <p>
          I love building things and solving problems. I've been known to enthusiastically explain how things should be built to anyone willing to listen (and sometimes to those who aren't).
        </p>

        <p>
          I'm a <span class="u-highlight">Staff Software Engineer</span> at CarStory (now part of Vroom), where I help build systems that make car buying less painful. On the side, I run a small <a
            href="https://www.godacode.com"
            target="_blank"
            rel="noopener"
          >software studio<span class="u-sr"> (opens in a new tab)</span></a> with friends, turning ideas into websites and apps. I started with HTML and CSS back in 2007 and spent most of the years since building for the web.
        </p>

        <p>
          Lately, AI has changed how I work more than anything before it. I write less code by hand and spend more time on ideas, products and how things fit together, so this blog will follow wherever that takes me.
        </p>

        <p>
          I live in Serbia with my family.
        </p>
      </div>

      <section
        class="facts-section"
        aria-labelledby="facts-title"
      >
        <h2
          id="facts-title"
          class="u-sr"
        >
          Quick facts
        </h2>
        <ul class="facts">
          <li
            v-for="fact in facts"
            :key="fact.label"
            class="fact"
            :class="`tone-${fact.tone}`"
          >
            <span class="fact-badge">
              <Icon
                :name="fact.icon"
                class="fact-icon"
                aria-hidden="true"
              />
            </span>
            <span class="fact-label">{{ fact.label }}</span>
            <strong class="fact-value">{{ fact.value }}</strong>
            <span class="fact-note">{{ fact.note }}</span>
          </li>
        </ul>
      </section>

      <figure class="family">
        <NuxtPicture
          format="avif,webp"
          src="family.jpg"
          class="family-picture"
          alt="Aleksandar Goševski's family"
          sizes="100vw md:100vw lg:704px"
          width="1600"
          height="1066"
        />
        <figcaption class="family-caption">
          My favorite reason to step away from the screen.
        </figcaption>
      </figure>

      <section
        class="elsewhere"
        aria-labelledby="elsewhere-title"
      >
        <h2
          id="elsewhere-title"
          class="g-heading2"
        >
          Say hello
        </h2>
        <p class="elsewhere-text">
          The easiest way to reach me is through one of these. I’m always happy to talk about building things, tools or a good architecture debate.
        </p>
        <ul class="elsewhere-list">
          <li
            v-for="link in elsewhere"
            :key="link.label"
          >
            <a
              :href="link.href"
              target="_blank"
              rel="noopener me"
              class="elsewhere-link"
            >
              <Icon
                :name="link.icon"
                class="elsewhere-icon"
                aria-hidden="true"
              />
              {{ link.label }}
              <span class="u-sr">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </section>
    </article>
  </PageShell>
</template>

<style scoped>
.about {
  display: grid;
  gap: 32px;

  @media (width >= 768px) {
    gap: 40px;
  }
}

.head {
  display: grid;
  gap: 12px;

  @media (width >= 1024px) {
    padding-top: 12px;
  }
}

.text p:first-child {
  font-size: 1.1em;
}

.facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 0;
}

.fact {
  display: grid;
  gap: 2px;
  align-content: start;
  padding: 14px;
  background: var(--tone-soft);
  border: 1px solid color-mix(in oklab, var(--tone-deep), transparent 70%);
  border-radius: var(--radius-l);

  @media (width >= 768px) {
    padding: 18px 20px;
  }
}

.fact-badge {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  margin-bottom: 10px;
  color: var(--c-ink);
  background: var(--tone);
  border-radius: 50%;
}

html.dark .fact-badge {
  color: var(--tone-deep);
}

.fact-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.fact-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.fact-value {
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.3;

  @media (width >= 768px) {
    font-size: 1.125rem;
  }
}

.fact-note {
  font-size: 0.875rem;
  color: var(--c-ink-2);
}

.family {
  padding: 10px;
  margin: 0;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-s);
}

.family-picture :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-l);
}

.family-caption {
  padding: 12px 8px 4px;
  font-size: 0.9375rem;
  color: var(--c-ink-2);
  text-align: center;
}

.elsewhere {
  display: grid;
  gap: 10px;
}

.elsewhere-text {
  max-width: 34rem;
  margin: 0;
  color: var(--c-ink-2);
}

.elsewhere-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 0;
}

.elsewhere-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 9px 16px;
  font-weight: 700;
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

.elsewhere-icon {
  width: 1.125rem;
  height: 1.125rem;
}
</style>
