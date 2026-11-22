<script setup>
const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
})

const activeId = ref(null)
let headings = []
let frame = null

const updateActive = () => {
  frame = null
  const threshold = window.innerHeight * 0.3
  const passed = headings.filter(heading => heading.getBoundingClientRect().top <= threshold)
  activeId.value = passed.at(-1)?.id ?? null
}

const scheduleUpdate = () => {
  frame ??= requestAnimationFrame(updateActive)
}

onMounted(() => {
  headings = flattenIds(props.links)
    .map(id => document.getElementById(id))
    .filter(Boolean)
  updateActive()
})

useEventListener('scroll', scheduleUpdate, { passive: true })
useEventListener('resize', scheduleUpdate, { passive: true })

onBeforeUnmount(() => frame && cancelAnimationFrame(frame))

function flattenIds(links) {
  return links.flatMap(link => [link.id, ...flattenIds(link.children ?? [])])
}
</script>

<template>
  <ol class="toc">
    <li
      v-for="link in links"
      :key="link.id"
    >
      <a
        :href="`#${link.id}`"
        class="toc-link"
        :class="{ 'toc-link--active': activeId === link.id }"
        :aria-current="activeId === link.id ? 'location' : undefined"
      >{{ link.text }}</a>
      <ol
        v-if="link.children?.length"
        class="toc toc--nested"
      >
        <li
          v-for="child in link.children"
          :key="child.id"
        >
          <a
            :href="`#${child.id}`"
            class="toc-link"
            :class="{ 'toc-link--active': activeId === child.id }"
            :aria-current="activeId === child.id ? 'location' : undefined"
          >{{ child.text }}</a>
        </li>
      </ol>
    </li>
  </ol>
</template>

<style scoped>
.toc {
  display: grid;
  gap: 2px;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.35;
}

.toc--nested {
  margin: 2px 0 4px 12px;
  font-size: 0.875rem;
}

.toc-link {
  display: block;
  padding: 5px 10px;
  color: var(--c-ink-2);
  text-decoration: none;
  border-left: 2px solid transparent;
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  transition:
    color var(--duration) var(--ease-out),
    background-color var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out);

  &:hover {
    color: var(--c-ink);
    background: color-mix(in oklab, var(--c-surface), transparent 40%);
  }
}

.toc-link--active {
  font-weight: 700;
  color: var(--c-ink);
  background: color-mix(in oklab, var(--c-surface), transparent 30%);
  border-left-color: var(--c-accent);
}
</style>
