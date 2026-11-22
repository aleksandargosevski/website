<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const route = useRoute()
const { tags } = await usePosts()

const isArticle = computed(() => Boolean(props.article))
const isBlogActive = computed(() => ['home', 'tag', 'post'].includes(route.name))
const isAboutActive = computed(() => route.name === 'about')

const facts = [
  { icon: 'lucide:briefcase', text: 'Staff Engineer at', strong: 'CarStory', suffix: ' / Vroom' },
  { icon: 'lucide:users', text: 'Co-running', strong: 'Godacode', href: 'https://www.godacode.com' },
  { icon: 'lucide:map-pin', text: 'Living in', strong: 'Serbia' },
  { icon: 'lucide:hammer', text: 'Building things since', strong: '2007' },
]
</script>

<template>
  <header
    class="sidebar"
    :class="{ 'sidebar--article': isArticle }"
  >
    <div class="panel">
      <div class="identity">
        <NuxtLink
          :to="{ name: 'about' }"
          class="portrait"
          aria-label="About Aleksandar Goševski"
        >
          <NuxtImg
            src="aleksandar-gosevski-avatar.jpg"
            alt=""
            class="portrait-image"
            width="240"
            height="240"
            fit="cover"
            format="webp"
          />
        </NuxtLink>
        <div class="who">
          <p class="name">
            <NuxtLink :to="{ name: 'home' }">
              Aleksandar Goševski
            </NuxtLink>
          </p>
          <p class="role">
            Software engineer
          </p>
        </div>
        <ThemeToggle class="toggle" />
      </div>

      <nav
        aria-label="Main"
        class="nav"
      >
        <NuxtLink
          :to="{ name: 'home' }"
          class="nav-link"
          :class="{ 'nav-link--active': isBlogActive }"
          :aria-current="route.name === 'home' ? 'page' : undefined"
        >
          <Icon
            name="lucide:house"
            class="nav-icon"
            aria-hidden="true"
          />
          Blog
        </NuxtLink>
        <NuxtLink
          :to="{ name: 'about' }"
          class="nav-link"
          :class="{ 'nav-link--active': isAboutActive }"
          :aria-current="isAboutActive ? 'page' : undefined"
        >
          <Icon
            name="lucide:user"
            class="nav-icon"
            aria-hidden="true"
          />
          About
        </NuxtLink>
      </nav>

      <template v-if="isArticle">
        <nav
          v-if="article.toc?.length"
          class="block"
          aria-labelledby="sidebar-toc-title"
        >
          <p
            id="sidebar-toc-title"
            class="block-title"
          >
            On this page
          </p>
          <TocList :links="article.toc" />
        </nav>

        <section
          class="block"
          aria-labelledby="sidebar-tags-title"
        >
          <p
            id="sidebar-tags-title"
            class="block-title"
          >
            Filed under
          </p>
          <TagList :tags="article.tags" />
        </section>

        <NuxtLink
          :to="{ name: 'home' }"
          class="back"
        >
          <Icon
            name="lucide:arrow-left"
            class="back-icon"
            aria-hidden="true"
          />
          Back to all articles
        </NuxtLink>
      </template>

      <template v-else>
        <section
          class="block"
          aria-labelledby="sidebar-now-title"
        >
          <p
            id="sidebar-now-title"
            class="block-title"
          >
            Currently
          </p>
          <ul class="facts">
            <li
              v-for="fact in facts"
              :key="fact.icon"
              class="fact"
            >
              <Icon
                :name="fact.icon"
                class="fact-icon"
                aria-hidden="true"
              />
              <span>
                {{ fact.text }}
                <a
                  v-if="fact.href"
                  :href="fact.href"
                  target="_blank"
                  rel="noopener"
                  class="fact-link"
                >{{ fact.strong }}<span class="u-sr"> (opens in a new tab)</span></a>
                <strong v-else>{{ fact.strong }}</strong>{{ fact.suffix }}
              </span>
            </li>
          </ul>
        </section>

        <nav
          class="block"
          aria-labelledby="sidebar-topics-title"
        >
          <p
            id="sidebar-topics-title"
            class="block-title"
          >
            Topics
          </p>
          <TagList
            :tags="tags.map(tag => tag.name)"
            :counts="Object.fromEntries(tags.map(tag => [tag.name, tag.count]))"
            :active="route.params.tag"
          />
        </nav>

        <div class="elsewhere">
          <p class="elsewhere-label">
            Find me on
          </p>
          <SocialLinks compact />
        </div>
      </template>
    </div>
  </header>
</template>

<style scoped>
.sidebar {
  @media (width >= 1024px) {
    &.sidebar--article {
      position: sticky;
      top: 32px;
      max-height: calc(100dvh - 64px);
      padding: 4px;
      margin: -4px;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-color: var(--c-line-strong) transparent;
      scrollbar-width: thin;
    }
  }

  @media (width >= 1024px) and (height >= 55rem) {
    position: sticky;
    top: 32px;
  }
}

.panel {
  position: relative;
  display: grid;
  gap: 16px;
  padding: 14px;
  background: var(--c-wash);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-s);

  @media (width >= 1024px) {
    gap: 18px;
    padding: 24px 22px 22px;
    border-radius: var(--radius-xl);
  }
}

.identity {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
}

.portrait {
  display: block;
  border-radius: var(--radius-m);
  view-transition-name: sidebar-portrait;

  &:focus-visible {
    border-radius: var(--radius-m);
  }
}

.portrait-image {
  display: block;
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border: 2px solid var(--c-surface);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-s);
}

.name {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.01em;
  view-transition-name: sidebar-name;

  a {
    text-decoration: none;

    &:hover {
      color: var(--c-accent);
    }
  }
}

.role {
  margin: 2px 0 0;
  font-size: 0.875rem;
  line-height: 1.3;
  color: var(--c-ink-2);
  view-transition-name: sidebar-role;
}

.nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  background: color-mix(in oklab, var(--c-surface), transparent 35%);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-pill);
}

.nav-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--c-ink-2);
  text-decoration: none;
  border-radius: var(--radius-pill);
  transition:
    color var(--duration) var(--ease-out),
    background-color var(--duration) var(--ease-out);

  &:hover {
    color: var(--c-ink);
    background: var(--c-surface);
  }

  &:focus-visible {
    border-radius: var(--radius-pill);
  }
}

.nav-link--active {
  color: var(--c-ink);
  background: var(--c-surface);
  box-shadow: var(--shadow-s);
}

.nav-icon {
  width: 1rem;
  height: 1rem;
}

.block,
.back,
.elsewhere {
  display: none;
}

.elsewhere-label {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--c-ink-2);
}

.block-title {
  margin: 0 0 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.facts {
  display: grid;
  gap: 6px;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: var(--c-ink-2);

  strong,
  .fact-link {
    font-weight: 700;
    color: var(--c-ink);
  }
}

.fact {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.fact-icon {
  flex: none;
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  color: var(--c-accent);
}

.fact-link {
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-decoration-color: color-mix(in oklab, var(--c-accent), transparent 50%);

  &:hover {
    color: var(--c-accent);
    text-decoration-color: currentcolor;
  }
}

.back {
  gap: 8px;
  align-items: center;
  justify-self: start;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--c-accent);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.back-icon {
  width: 1rem;
  height: 1rem;
  transition: translate var(--duration) var(--ease-out);
}

.back:hover .back-icon {
  translate: -2px 0;
}

@media (width >= 1024px) {
  .block {
    display: block;
    padding-top: 16px;
    border-top: 1px solid var(--c-line);
  }

  .back {
    display: inline-flex;
  }

  .elsewhere {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--c-line);
  }

  .sidebar--article {
    .identity {
      gap: 10px;
    }

    .portrait-image {
      width: 2.75rem;
      height: 2.75rem;
    }

    .name {
      font-size: 1rem;
    }

    .role {
      font-size: 0.8125rem;
    }
  }

  .sidebar:not(.sidebar--article) {
    .identity {
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }

    .portrait {
      position: relative;
      justify-self: start;
      margin: 0 10px 10px 0;
      border-radius: var(--radius-l);

      &::before {
        position: absolute;
        inset: 10px -10px -10px 10px;
        content: "";
        background: var(--c-butter);
        border-radius: var(--radius-l);
      }
    }

    .portrait-image {
      position: relative;
      width: 6.5rem;
      height: 6.5rem;
      border: 3px solid var(--c-surface);
      border-radius: var(--radius-l);
    }

    .name {
      font-size: 1.375rem;
    }

    .role {
      font-size: 0.9375rem;
    }

    .toggle {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
}
</style>
