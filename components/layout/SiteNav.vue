<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
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

const servicesLinks = [
  { label: 'Event MC for Hire', to: '/services/event-mc', icon: 'mdi:microphone' },
  { label: 'Web Development with Analytics', to: '/services/web-development', icon: 'mdi:code-tags' },
]

const servicesOpen = ref(false)

function close() {
  emit('update:modelValue', false)
}

function isActive(path: string): boolean {
  return route.path === path
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-down">
      <nav
        v-if="modelValue"
        id="mobile-nav"
        class="md:hidden fixed top-[50px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20"
        aria-label="Mobile navigation"
      >
        <div class="flex flex-col p-3 gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            class="flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors"
            :class="isActive(item.to) ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'"
            @click="close"
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            <span class="font-medium text-sm">{{ item.label }}</span>
          </NuxtLink>

          <!-- Services expandable -->
          <div class="flex flex-col">
            <button
              class="flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900 w-full"
              @click="servicesOpen = !servicesOpen"
            >
              <Icon name="mdi:briefcase" class="w-5 h-5" />
              <span class="font-medium text-sm flex-1 text-left">Services</span>
              <Icon
                name="mdi:chevron-down"
                class="w-4 h-4 transition-transform duration-200"
                :class="servicesOpen ? 'rotate-180' : ''"
              />
            </button>
            <Transition name="expand">
              <div v-if="servicesOpen" class="flex flex-col ml-2 border-l-2 border-gray-100 pl-2">
                <NuxtLink
                  v-for="link in servicesLinks"
                  :key="link.to"
                  :to="link.to"
                  :aria-current="isActive(link.to) ? 'page' : undefined"
                  class="flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors text-sm"
                  :class="isActive(link.to) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
                  @click="close"
                >
                  <Icon :name="link.icon" class="w-4 h-4" />
                  <span>{{ link.label }}</span>
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </div>
      </nav>
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

.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
