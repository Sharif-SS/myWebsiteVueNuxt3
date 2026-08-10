<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Slide {
  category: string
  src: string
}

const props = defineProps<{
  pair: Slide[]
}>()

const emit = defineEmits<{
  next: []
}>()

type Orientation = 'portrait' | 'landscape'

const vp = ref<Orientation>('landscape')
const orientations = ref<Record<string, Orientation>>({})
const ready = ref(false)
const pressed = ref(false)

function isVideo(src: string): boolean {
  return src?.endsWith('.webm')
}

function updateViewport() {
  vp.value = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
}

function preload(src: string): Promise<Orientation> {
  return new Promise((resolve) => {
    if (isVideo(src)) return resolve('landscape')
    if (typeof Image === 'undefined') return resolve('landscape')
    const img = new Image()
    img.onload = () => resolve(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape')
    img.onerror = () => resolve('landscape')
    img.src = src
  })
}

function warmCache(src: string) {
  if (!src || isVideo(src) || typeof Image === 'undefined') return
  const img = new Image()
  img.src = src
}

async function load() {
  ready.value = false
  const result: Record<string, Orientation> = {}
  await Promise.all(props.pair.map(async (s) => {
    result[s.src] = await preload(s.src)
  }))
  orientations.value = result
  ready.value = true
}

watch(() => props.pair, async (next) => {
  next.forEach(s => warmCache(s.src))
  await load()
}, { immediate: true })

const pairKey = computed(() =>
  props.pair.map(p => `${p.category}:${p.src}`).join('|'),
)

const layout = computed<'split' | 'single'>(() => {
  if (!ready.value || props.pair.length < 2) return 'single'

  const a = orientations.value[props.pair[0]?.src]
  const b = orientations.value[props.pair[1]?.src]

  if (vp.value === 'portrait' && a === 'landscape' && b === 'landscape') return 'split'
  if (vp.value === 'landscape' && a === 'portrait' && b === 'portrait') return 'split'
  return 'single'
})

function pressFeedback() {
  pressed.value = true
}

function releaseFeedback() {
  pressed.value = false
}

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  updateViewport()
  resizeObserver = new ResizeObserver(updateViewport)
  resizeObserver.observe(document.body)
})
onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <section
    class="relative w-full overflow-hidden bg-black cursor-pointer select-none group transition-transform duration-200 ease-out"
    :class="pressed ? 'scale-[0.985] brightness-[0.92]' : ''"
    :style="{ height: 'calc(100dvh - 50px)' }"
    @click="emit('next')"
    @pointerdown="pressFeedback"
    @pointerup="releaseFeedback"
    @pointerleave="releaseFeedback"
    @pointercancel="releaseFeedback"
  >
    <Transition name="crossfade">
      <div :key="pairKey" class="absolute inset-0">
        <div
          class="flex w-full h-full"
          :class="layout === 'single' ? '' : (vp === 'portrait' ? 'flex-col' : 'flex-row')"
        >
          <div
            v-for="item in layout === 'single' ? [pair[0]] : pair"
            :key="item?.category ?? 'fallback'"
            class="relative flex-1 overflow-hidden"
            :class="layout === 'single' ? 'w-full h-full' : ''"
          >
            <div class="absolute inset-0 overflow-hidden">
              <img
                v-if="!isVideo(item?.src ?? '')"
                :src="item?.src"
                class="w-full h-full object-cover scale-125 blur-lg brightness-50"
                aria-hidden="true"
              >
              <div v-else class="w-full h-full bg-gray-900" aria-hidden="true" />
            </div>

            <img
              v-if="item?.src && !isVideo(item.src)"
              :src="item.src"
              :alt="`${item.category} photography`"
              class="relative z-10 w-full h-full object-contain"
            >
            <video
              v-else-if="item?.src"
              :src="item.src"
              class="relative z-10 w-full h-full object-contain"
              muted
              loop
              playsinline
              autoplay
            />

            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none"
              style="z-index: 15"
            />

            <NuxtLink
              v-if="item"
              :to="'/photography'"
              class="absolute bottom-0 left-0 right-0 z-20 block pt-16 pb-5 md:pb-7 px-6 md:px-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
              @click.stop
            >
              <span
                class="inline-flex items-center gap-2 md:gap-3 text-white text-2xl md:text-4xl font-bold uppercase tracking-wide"
              >
                {{ item.category }}
                <Icon
                  name="mdi:arrow-right"
                  class="w-5 h-5 md:w-6 md:h-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-300"
      :class="pressed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
      style="z-index: 30"
    >
      <div
        class="absolute top-1/2 -translate-y-1/2 right-5 md:right-8 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/45 text-white text-sm font-semibold uppercase tracking-wide backdrop-blur-sm"
        :class="pressed ? 'animate-pulse' : ''"
      >
        Next
        <Icon name="mdi:chevron-right" class="w-4 h-4" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 700ms ease;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
.crossfade-leave-active {
  position: absolute;
  inset: 0;
}
</style>
