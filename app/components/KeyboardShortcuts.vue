<script setup>
const HINT_CHARS = 'sadfjklewcmpgh'
const SCROLL_STEP = 80
const SEQUENCE_TIMEOUT = 800
const HINTABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'summary',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const shortcutGroups = [
  {
    title: 'Navigation',
    shortcuts: [
      { keys: [['j'], ['k']], description: 'Next / previous article in lists, scroll down / up in articles' },
      { keys: [['['], [']']], description: 'Previous / next year in lists, older / newer article in articles' },
      { keys: [['g', 'g']], description: 'Scroll to the top' },
      { keys: [['G']], description: 'Scroll to the bottom' },
      { keys: [['H']], description: 'Go back' },
      { keys: [['L']], description: 'Go forward' },
    ],
  },
  {
    title: 'Links',
    shortcuts: [
      { keys: [['f']], description: 'Show link hints, then type the letters to open a link' },
      { keys: [['F']], description: 'Show link hints and open the link in a new tab' },
    ],
  },
  {
    title: 'General',
    shortcuts: [
      { keys: [['?']], description: 'Show this dialog' },
      { keys: [['Esc']], description: 'Close this dialog or hide link hints' },
    ],
  },
]

const { enabled, isHelpOpen, openHelp } = useShortcuts()
const router = useRouter()
const route = useRoute()
const reducedMotion = usePreferredReducedMotion()

const dialog = ref(null)
const hints = shallowRef([])
const typed = ref('')
const opensInNewTab = ref(false)
const announcement = ref('')

const isHintMode = computed(() => hints.value.length > 0)
const visibleHints = computed(() => hints.value.filter(hint => hint.label.startsWith(typed.value)))

let isAwaitingSecondG = false
let sequenceTimer

const actions = {
  '?': openHelp,
  'j': () => moveThroughArticles(1),
  'k': () => moveThroughArticles(-1),
  '[': () => jump(-1),
  ']': () => jump(1),
  'G': () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: scrollBehavior() }),
  'H': () => router.back(),
  'L': () => router.forward(),
  'f': () => showHints(false),
  'F': () => showHints(true),
}

useEventListener(document, 'keydown', onKeydown)
useEventListener(window, 'scroll', () => hideHints(), { passive: true })
useEventListener(window, 'resize', () => hideHints())

watch(() => route.fullPath, () => hideHints())

watch(isHelpOpen, (isOpen) => {
  if (isOpen && !dialog.value?.open) dialog.value?.showModal()
  if (!isOpen && dialog.value?.open) dialog.value.close()
})

onMounted(() => {
  addLightDismissFallback()
  if (isHelpOpen.value) dialog.value?.showModal()
})

function onKeydown(event) {
  if (event.defaultPrevented || event.isComposing) return
  if (event.ctrlKey || event.metaKey || event.altKey) return
  if (!enabled.value || isHelpOpen.value || isEditable(event.target)) return

  const key = normalizeKey(event)

  if (isHintMode.value) {
    handleHintKey(event, key)
    return
  }

  const action = resolveAction(key)
  if (!action) return

  event.preventDefault()
  action()
}

function resolveAction(key) {
  if (key !== 'g') {
    resetSequence()
    return actions[key]
  }

  if (isAwaitingSecondG) {
    resetSequence()
    return () => window.scrollTo({ top: 0, behavior: scrollBehavior() })
  }

  isAwaitingSecondG = true
  sequenceTimer = setTimeout(resetSequence, SEQUENCE_TIMEOUT)
  return null
}

function moveThroughArticles(direction) {
  const items = getArticleLinks()

  if (!items.length) {
    window.scrollBy({ top: direction * SCROLL_STEP, behavior: scrollBehavior() })
    return
  }

  const currentIndex = items.indexOf(document.activeElement)
  const nextIndex = currentIndex === -1
    ? firstIndexInView(items)
    : clamp(currentIndex + direction, 0, items.length - 1)

  focusArticleLink(items[nextIndex])
}

function jump(direction) {
  const neighbour = document.querySelector(`[data-shortcut="${direction < 0 ? 'older' : 'newer'}"]`)
  if (neighbour) {
    neighbour.click()
    return
  }

  const groups = [...document.querySelectorAll('[data-shortcut-group]')]
  if (!groups.length) return

  const activeGroup = document.activeElement?.closest('[data-shortcut-group]')
  const items = getArticleLinks()
  const currentIndex = activeGroup
    ? groups.indexOf(activeGroup)
    : groups.indexOf(items[firstIndexInView(items)]?.closest('[data-shortcut-group]'))

  const nextIndex = currentIndex === -1 ? 0 : clamp(currentIndex + direction, 0, groups.length - 1)
  const target = groups[nextIndex].querySelector('[data-shortcut-item]')
  if (target) focusArticleLink(target)
}

function showHints(inNewTab) {
  const elements = [...document.querySelectorAll(HINTABLE_SELECTOR)].filter(isHintable)

  if (!elements.length) {
    announce('No links visible.')
    return
  }

  const labels = createHintLabels(elements.length)
  hints.value = elements.map((element, index) => {
    const rect = element.getBoundingClientRect()
    return { element: markRaw(element), label: labels[index], top: rect.top, left: rect.left }
  })
  typed.value = ''
  opensInNewTab.value = inNewTab

  announce(`Link hints shown. Type the letters next to a link${inNewTab ? ' to open it in a new tab' : ''}, or press Escape to cancel.`)
}

function handleHintKey(event, key) {
  if (key === 'Escape') {
    event.preventDefault()
    hideHints({ announceIt: true })
    return
  }

  if (key === 'Backspace') {
    event.preventDefault()
    typed.value = typed.value.slice(0, -1)
    return
  }

  const char = key.toLowerCase()
  if (char.length !== 1 || !HINT_CHARS.includes(char)) {
    hideHints({ announceIt: true })
    return
  }

  event.preventDefault()
  typed.value += char

  const matches = visibleHints.value
  if (!matches.length) {
    hideHints({ announceIt: true })
    return
  }

  const exactMatch = matches.find(hint => hint.label === typed.value)
  if (!exactMatch) return

  const inNewTab = opensInNewTab.value
  hideHints()
  activate(exactMatch.element, inNewTab)
}

function activate(element, inNewTab) {
  if (inNewTab && element.matches('a[href]')) {
    window.open(element.href, '_blank', 'noopener')
    return
  }

  element.focus()
  if (element.matches('input:not([type="checkbox"]):not([type="radio"]), select, textarea')) return
  element.click()
}

function hideHints({ announceIt = false } = {}) {
  if (!isHintMode.value) return
  hints.value = []
  typed.value = ''
  if (announceIt) announce('Link hints hidden.')
}

function onDialogClose() {
  isHelpOpen.value = false
}

function getArticleLinks() {
  return [...document.querySelectorAll('[data-shortcut-item]')]
}

function focusArticleLink(link) {
  link.focus({ preventScroll: true })
  link.closest('article')?.scrollIntoView({ block: 'center', behavior: scrollBehavior() })
}

function firstIndexInView(elements) {
  const index = elements.findIndex(element => element.getBoundingClientRect().top >= 0)
  return index === -1 ? elements.length - 1 : index
}

function isHintable(element) {
  if (element.closest('[inert], [aria-hidden="true"]')) return false
  if (element.checkVisibility && !element.checkVisibility({ visibilityProperty: true, opacityProperty: true })) return false

  const rect = element.getBoundingClientRect()
  return rect.width > 1
    && rect.height > 1
    && rect.bottom > 0
    && rect.right > 0
    && rect.top < window.innerHeight
    && rect.left < window.innerWidth
}

function createHintLabels(count) {
  const base = HINT_CHARS.length
  const length = Math.max(1, Math.ceil(Math.log(count) / Math.log(base)))

  return Array.from({ length: count }, (_, index) => {
    let label = ''
    let remaining = index
    for (let position = 0; position < length; position++) {
      label = HINT_CHARS[remaining % base] + label
      remaining = Math.floor(remaining / base)
    }
    return label
  })
}

function normalizeKey(event) {
  if (/^[\x20-\x7E]$/.test(event.key)) return event.key

  const codeMap = { BracketLeft: '[', BracketRight: ']', Slash: event.shiftKey ? '?' : '/' }
  if (codeMap[event.code]) return codeMap[event.code]

  const letter = event.code.match(/^Key([A-Z])$/)?.[1]
  if (letter) return event.shiftKey ? letter : letter.toLowerCase()

  return event.key
}

function isEditable(target) {
  return target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))
}

function resetSequence() {
  isAwaitingSecondG = false
  clearTimeout(sequenceTimer)
}

async function announce(message) {
  announcement.value = ''
  await nextTick()
  announcement.value = message
}

function scrollBehavior() {
  return reducedMotion.value === 'reduce' ? 'auto' : 'smooth'
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function addLightDismissFallback() {
  if (!dialog.value || 'closedBy' in HTMLDialogElement.prototype) return

  const isOutside = (event) => {
    const rect = dialog.value.getBoundingClientRect()
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
  }

  let pressedOutside = false
  dialog.value.addEventListener('pointerdown', (event) => {
    pressedOutside = isOutside(event)
  })
  dialog.value.addEventListener('pointerup', (event) => {
    if (pressedOutside && isOutside(event)) dialog.value.close()
  })
}
</script>

<template>
  <dialog
    ref="dialog"
    class="shortcuts"
    closedby="any"
    aria-labelledby="shortcuts-title"
    @close="onDialogClose"
  >
    <header class="head">
      <h2
        id="shortcuts-title"
        class="title"
      >
        Keyboard shortcuts
      </h2>
      <form method="dialog">
        <button
          type="submit"
          class="close"
          aria-label="Close keyboard shortcuts"
        >
          <Icon
            name="lucide:x"
            class="close-icon"
            aria-hidden="true"
          />
        </button>
      </form>
    </header>

    <label class="toggle">
      <span class="toggle-text">
        <span class="toggle-label">Enable shortcuts</span>
        <span class="toggle-hint">Turn them off if single-key shortcuts get in your way. Your choice is remembered.</span>
      </span>
      <input
        v-model="enabled"
        type="checkbox"
        role="switch"
        class="switch"
      >
    </label>

    <section
      v-for="group in shortcutGroups"
      :key="group.title"
      class="group"
      :aria-labelledby="`shortcuts-${group.title.toLowerCase()}`"
    >
      <h3
        :id="`shortcuts-${group.title.toLowerCase()}`"
        class="group-title"
      >
        {{ group.title }}
      </h3>
      <dl class="list">
        <div
          v-for="shortcut in group.shortcuts"
          :key="shortcut.description"
          class="row"
        >
          <dt class="keys">
            <template
              v-for="(combo, comboIndex) in shortcut.keys"
              :key="combo.join('')"
            >
              <span
                v-if="comboIndex > 0"
                class="separator"
                aria-hidden="true"
              >/</span>
              <kbd
                v-for="(key, keyIndex) in combo"
                :key="`${key}-${keyIndex}`"
                class="key"
              >{{ key }}</kbd>
            </template>
          </dt>
          <dd class="description">
            {{ shortcut.description }}
          </dd>
        </div>
      </dl>
    </section>

    <p class="note">
      Using Vimium? Its shortcuts take over on this site. Add this site to Vimium's excluded URLs to use these instead.
    </p>
  </dialog>

  <div
    v-if="isHintMode"
    class="hints"
    aria-hidden="true"
  >
    <span
      v-for="hint in visibleHints"
      :key="hint.label"
      class="hint"
      :style="{ top: `${hint.top}px`, left: `${hint.left}px` }"
    ><span class="hint-typed">{{ typed }}</span>{{ hint.label.slice(typed.length) }}</span>
  </div>

  <p
    class="u-sr"
    aria-live="polite"
  >
    {{ announcement }}
  </p>
</template>

<style scoped>
.shortcuts {
  width: min(34rem, calc(100vw - 2 * var(--gutter)));
  max-height: min(44rem, calc(100dvh - 2 * var(--gutter)));
  padding: 0;
  color: var(--c-ink);
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-m);

  &[open] {
    display: grid;
    gap: 20px;
    padding: 24px;
  }

  &:modal {
    overscroll-behavior: contain;
  }

  &::backdrop {
    overflow: hidden;
    overscroll-behavior: contain;
    background: rgb(22 26 44 / 45%);
    backdrop-filter: blur(2px);
  }
}

.head {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.title {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.close {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--c-ink-2);
  cursor: pointer;
  background: var(--c-surface-2);
  border: 1px solid var(--c-line);
  border-radius: 50%;
  transition: color var(--duration) var(--ease-out);

  &:hover {
    color: var(--c-ink);
  }

  &:focus-visible {
    border-radius: 50%;
  }
}

.close-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.toggle {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  background: var(--c-wash);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-l);
}

.toggle-text {
  display: grid;
  gap: 2px;
}

.toggle-label {
  font-weight: 700;
}

.toggle-hint {
  font-size: 0.875rem;
  color: var(--c-ink-2);
}

.switch {
  position: relative;
  flex: none;
  width: 2.75rem;
  height: 1.625rem;
  margin: 0;
  appearance: none;
  cursor: pointer;
  background: var(--c-line-strong);
  border-radius: var(--radius-pill);
  transition: background-color var(--duration) var(--ease-out);

  &::before {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 1.25rem;
    height: 1.25rem;
    content: "";
    background: var(--c-surface);
    border-radius: 50%;
    box-shadow: var(--shadow-s);
    transition: translate var(--duration) var(--ease-out);
  }

  &:checked {
    background: var(--c-accent);
  }

  &:checked::before {
    translate: 1.125rem 0;
  }

  &:focus-visible {
    border-radius: var(--radius-pill);
  }
}

.group {
  display: grid;
  gap: 8px;
}

.group-title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.list {
  display: grid;
  margin: 0;
}

.row {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
  padding-block: 8px;
  border-top: 1px solid var(--c-line);
}

.keys {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.key {
  display: inline-grid;
  place-items: center;
  min-width: 1.625rem;
  height: 1.625rem;
  padding-inline: 6px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--c-ink);
  background: var(--c-surface-2);
  border: 1px solid var(--c-line-strong);
  border-bottom-width: 2px;
  border-radius: var(--radius-s);
}

.separator {
  color: var(--c-ink-3);
}

.description {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--c-ink-2);
}

.note {
  padding: 12px 14px;
  margin: 0;
  font-size: 0.875rem;
  color: var(--c-ink-2);
  background: var(--c-butter-soft);
  border-radius: var(--radius-m);
}

html.dark .note {
  background: var(--c-butter);
}

.hints {
  position: fixed;
  inset: 0;
  z-index: 10000;
  pointer-events: none;
}

.hint {
  position: fixed;
  padding: 1px 5px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.4;
  color: #1f264a;
  text-transform: uppercase;
  background: #ffe07a;
  border: 1px solid #e8b938;
  border-radius: 4px;
  box-shadow: var(--shadow-s);
  translate: -4px -4px;
}

.hint-typed {
  color: #7c82a2;
}
</style>
