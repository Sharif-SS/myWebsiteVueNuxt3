<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { handleGlowHover } = useGlow()

defineEmits<{
  'toggle-nav': []
}>()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Photography', to: '/photography' },
  { label: 'Contact', to: '/contact' },
]

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 h-[50px] bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm flex items-center px-4 gap-2"
  >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="flex items-center gap-2 mr-auto flex-shrink-0"
    >
      <img src="/puffin.png" alt="Home" class="w-8 h-8 rounded-full">
      <div class="flex flex-col leading-tight">
        <span class="text-sm font-semibold text-gray-800">Sharif Sircar</span>
        <span class="text-[10px] text-gray-500 tracking-wide">Photography &amp; Hosting</span>
      </div>
    </NuxtLink>

    <!-- Desktop nav links -->
    <nav class="hidden md:flex items-center gap-1">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
        :class="isActive(link.to) ? 'text-gray-900 bg-gray-100/80' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <!-- Header secret button -->
    <UiSecretButton variant="header" class="hidden md:flex" />

    <!-- Mobile hamburger -->
    <button
      class="md:hidden h-[30px] px-2 rounded bg-accent glow-effect flex items-center relative"
      aria-label="Open navigation menu"
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
</template>
