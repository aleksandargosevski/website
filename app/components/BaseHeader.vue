<script setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const header = ref(null)
const navOpened = ref(false)
const navAnimated = ref(false)
const navDisplayed = ref(false)

const route = useRoute()
watch(() => route.fullPath, () => navOpened.value ? toggleNav() : null)
const lockHTMLOnMob = () =>
  document.documentElement.classList.toggle('is-locked-until-medium')
const toggleNavDisplay = () => (navDisplayed.value = !navDisplayed.value)
const toggleNavAnimation = () => (navAnimated.value = !navAnimated.value)
const { activate, deactivate } = useFocusTrap(header)

function toggleNav() {
  navOpened.value = !navOpened.value
  lockHTMLOnMob()

  if (navOpened.value) {
    toggleNavDisplay()
    activate()
    setTimeout(() => toggleNavAnimation(), 0)
  }
  else {
    toggleNavAnimation()
    deactivate()
    setTimeout(() => toggleNavDisplay(), 400) // CSS transition duration: 0.4s
  }
}
</script>

<template>
  <header
    ref="header"
    class="header"
  >
    <div class="header-container">
      <div class="mobile-header">
        <div class="g-container">
          <!-- TODO: Logo attributes aria-label, alt, width & height -->
          <NuxtLink
            to="/"
            aria-label="Company name"
          >
            <img
              src="~/assets/images/logo.svg"
              alt="Company Logo"
              width="150"
              height="50"
            >
          </NuxtLink>
          <button
            type="button"
            class="menu-btn"
            :class="[{ 'is-opened': navOpened }]"
            @click="toggleNav"
          >
            <!-- TODO: Menu, Navigacija.. (language) -->
            <span class="u-sr"> {{ navOpened ? 'Close' : 'Open' }} navigation </span>
            <span class="menu-btn-icon">
              <span class="menu-line menu-line--top" />
              <span class="menu-line menu-line--middle" />
              <span class="menu-line menu-line--bottom" />
            </span>
          </button>
        </div>
      </div>
      <div
        class="sidebar"
        :class="[{ 'is-animated': navAnimated, 'is-displayed': navDisplayed }]"
      >
        <div class="g-container">
          <!-- TODO: aria-label language -->
          <nav aria-label="Navigation">
            <ul class="nav-list">
              <li>
                <!-- :to="{ name: 'home' }" -->
                <NuxtLink
                  to="/"
                  class="nav-link"
                >
                  Home
                </NuxtLink>
              </li>
              <BaseHeaderDropdown label="Dropdown">
                <ul class="dropdown-list">
                  <li>
                    <NuxtLink
                      to="/"
                      class="nav-link"
                    >
                      dropdown 1
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/"
                      class="nav-link"
                    >
                      dropdown 2
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/"
                      class="nav-link"
                    >
                      dropdown 3
                    </NuxtLink>
                  </li>
                </ul>
              </BaseHeaderDropdown>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  box-shadow: rgb(149 157 165 / 20%) 0 8px 24px;
  transition: var(--transition);
}

.header-container {
  max-width: var(--container-width);

  @media (--medium) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 12px;
    margin: 0 auto;
  }
}

.mobile-header {
  position: relative;
  z-index: 1100;
  padding-block: 10px;
  background: white;

  @media (--medium) {
    padding: 0;
  }

  .g-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.menu-btn {
  position: relative;
  display: grid;
  place-content: center;
  width: 44px;
  height: 44px;
  margin-right: -10px;

  @media (--medium) {
    display: none;
  }
}

.menu-btn-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 16.5px;

  .is-opened & {
    height: 19.2px;
  }
}

.menu-line {
  width: 24px;
  height: 2.5px;
  background: black;
  border-radius: 1.335px;
  transform-origin: center right;
  transition: all 0.4s;
}

.menu-line--top {
  .is-opened & {
    transform: rotate(-45deg);
  }
}

.menu-line--middle {
  .is-opened & {
    opacity: 0;
  }
}

.menu-line--bottom {
  .is-opened & {
    transform: rotate(45deg);
  }
}

.sidebar {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: none;
  padding-top: 64px;
  background: white;
  opacity: 0;
  transition: var(--transition);

  &.is-animated {
    opacity: 1;
  }

  &.is-displayed {
    display: flex;
  }

  @media (--medium) {
    position: static;
    display: block;
    padding-top: 0;
    opacity: 1;
  }

  .g-container,
  nav,
  .nav-list {
    display: flex;
    flex: 1;
  }
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-block: 64px 0;
  font-size: 24px;
  font-weight: 700;

  @media (--medium) {
    flex-direction: row;
    align-items: center;
    margin: 0;
    font-size: 16px;
  }
}

.nav-link {
  position: relative;

  &::before {
    position: absolute;
    right: 100%;
    bottom: -2.5px;
    left: 0;
    height: 1.5px;
    content: "";
    background: var(--c-primary);
    transition: var(--transition);
  }

  @media (--medium) {
    &:hover,
    &.router-link-active {
      &::before {
        right: 0;
      }
    }
  }
}

.dropdown-list {
  display: grid;
  gap: 16px;

  @media (--medium) {
    gap: 12px;
  }
}
</style>
