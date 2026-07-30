<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { handleGlowHover } = useGlow()

defineEmits<{
  'toggle-nav': []
}>()

defineProps<{
  navOpen: boolean
}>()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Photography', to: '/photography' },
  { label: 'Contact', to: '/contact' },
]

const servicesLinks = [
  { label: 'Event MC for Hire', to: '/services/event-mc' },
  { label: 'Web Development', to: '/services/web-development' },
]

const servicesOpen = ref(false)
const servicesRef = ref<HTMLElement | null>(null)

function isActive(path: string): boolean {
  return route.path === path
}

function isServicesActive(): boolean {
  return servicesLinks.some(l => route.path === l.to)
}

function onServicesEnter() {
  servicesOpen.value = true
}

function onServicesLeave() {
  servicesOpen.value = false
}

function onDocumentClick(e: MouseEvent) {
  if (servicesRef.value && !servicesRef.value.contains(e.target as Node)) {
    servicesOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <!-- Announcement banner -->
    <div
      class="w-full bg-gray-900 text-white text-center py-1.5 px-4 text-xs tracking-wide"
    >
      Site Update (July 29th, 2026): Under construction. Thank you. — Sharif
    </div>

    <!-- Main header -->
    <header
      class="h-[50px] bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm flex items-center px-4 gap-2"
    >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="flex items-center gap-2 mr-auto flex-shrink-0"
    >
      <img src="/puffin.png" alt="Home" class="w-8 h-8 rounded-full">
      <div class="flex flex-col leading-tight">
        <span class="text-sm font-semibold text-gray-800">Sharif Sircar</span>
        <span class="text-[10px] text-gray-500 tracking-wide">Photography</span>
      </div>
    </NuxtLink>

    <!-- Desktop nav links -->
    <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :aria-current="isActive(link.to) ? 'page' : undefined"
        class="relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
        :class="isActive(link.to) ? 'text-gray-900 bg-gray-100/80' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
      >
        {{ link.label }}
      </NuxtLink>

      <!-- Services dropdown -->
      <div
        ref="servicesRef"
        class="relative"
        @mouseenter="onServicesEnter"
        @mouseleave="onServicesLeave"
      >
        <button
          class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="isServicesActive() ? 'text-gray-900 bg-gray-100/80' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          @click="servicesOpen = !servicesOpen"
          aria-haspopup="true"
          :aria-expanded="servicesOpen"
        >
          Services
          <Icon
            name="mdi:chevron-down"
            class="w-4 h-4 transition-transform duration-200"
            :class="servicesOpen ? 'rotate-180' : ''"
          />
        </button>

        <Transition name="dropdown">
          <div
            v-if="servicesOpen"
            class="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
            role="menu"
          >
            <NuxtLink
              v-for="link in servicesLinks"
              :key="link.to"
              :to="link.to"
              role="menuitem"
              class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              :class="isActive(link.to) ? 'bg-gray-50 text-gray-900 font-medium' : ''"
              @click="servicesOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </nav>

    <!-- Header secret button -->
    <UiSecretButton variant="header" class="hidden md:flex" />

    <!-- Mobile hamburger -->
    <button
      class="md:hidden h-[30px] px-2 rounded bg-accent glow-effect flex items-center relative"
      :aria-label="navOpen ? 'Close navigation menu' : 'Open navigation menu'"
      :aria-expanded="navOpen"
      aria-controls="mobile-nav"
      @click="$emit('toggle-nav')"
      @mouseenter="handleGlowHover"
    >
      <svg class="glow-container">
        <rect pathLength="100" stroke-linecap="round" class="glow-blur" />
        <rect pathLength="100" stroke-linecap="round" class="glow-line" />
      </svg>
      <Icon name="mdi:menu" class="w-5 h-5" />
    </button>
    </header>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
