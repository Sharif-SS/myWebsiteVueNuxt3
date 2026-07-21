<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const navItems = [
  { label: 'Home', to: '/', icon: 'mdi:home' },
  { label: 'Photography', to: '/photography', icon: 'mdi:camera-iris' },
  { label: 'Contact', to: '/contact', icon: 'mdi:email' },
]

function close() {
  emit('update:modelValue', false)
}

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-down">
      <div
        v-if="modelValue"
        class="md:hidden fixed top-[50px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20"
      >
        <div class="flex flex-col p-3 gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors"
            :class="isActive(item.to) ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'"
            @click="close"
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            <span class="font-medium text-sm">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
