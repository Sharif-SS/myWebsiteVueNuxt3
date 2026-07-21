<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

withDefaults(defineProps<{
  variant?: 'header' | 'footer'
}>(), {
  variant: 'footer',
})

const open = ref(false)

function show() {
  open.value = true
}

function close() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <button
    v-if="variant === 'header'"
    class="h-[36px] w-[36px] rounded bg-accent glow-effect flex items-center justify-center relative touch-target"
    aria-label="Reveal a surprise"
    @click="show"
  >
    <svg class="glow-container">
      <rect pathLength="100" stroke-linecap="round" class="glow-blur" />
      <rect pathLength="100" stroke-linecap="round" class="glow-line" />
    </svg>
    <Icon name="mdi:egg-easter" class="w-5 h-5" />
  </button>

  <button
    v-else
    class="secret-trigger"
    aria-label="Reveal a surprise"
    @click="show"
  >
    secret
  </button>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        @click.self="close"
      >
        <div class="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl">
          <button
            class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Close video"
            @click="close"
          >
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>

          <div class="aspect-video">
            <iframe
              :src="open ? 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0' : ''"
              class="w-full h-full"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.secret-trigger {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #d1d5db;
  padding: 2px 8px;
  border-radius: 4px;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #9ca3af;
    animation: wiggle 0.4s ease-in-out;
  }
}

.touch-target {
  &:active {
    transform: scale(0.92);
    transition: transform 0.1s ease;
  }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-4deg); }
  40% { transform: rotate(4deg); }
  60% { transform: rotate(-3deg); }
  80% { transform: rotate(2deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
