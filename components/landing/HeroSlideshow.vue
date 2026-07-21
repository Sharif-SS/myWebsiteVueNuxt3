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

function updateViewport() {
  vp.value = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
}

function preload(src: string): Promise<Orientation> {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') return resolve('landscape')
    const img = new Image()
    img.onload = () => resolve(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape')
    img.onerror = () => resolve('landscape')
    img.src = src
  })
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

watch(() => props.pair, load, { immediate: true })

const layout = computed<'split' | 'single'>(() => {
  if (!ready.value || props.pair.length < 2) return 'single'

  const a = orientations.value[props.pair[0]?.src]
  const b = orientations.value[props.pair[1]?.src]

  if (vp.value === 'portrait' && a === 'landscape' && b === 'landscape') return 'split'
  if (vp.value === 'landscape' && a === 'portrait' && b === 'portrait') return 'split'
  return 'single'
})

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  load()
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
    class="relative w-full overflow-hidden bg-black cursor-pointer select-none"
    :style="{ height: 'calc(100dvh - 50px)' }"
    @click="emit('next')"
  >
    <div
      class="flex w-full h-full"
      :class="layout === 'single' ? '' : (vp === 'portrait' ? 'flex-col' : 'flex-row')"
    >
      <div
        v-for="item in layout === 'single' ? [pair[0]] : pair"
        :key="item?.category ?? 'fallback'"
        class="relative flex-1 overflow-hidden group"
        :class="layout === 'single' ? 'w-full h-full' : ''"
      >
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="item?.src"
            class="w-full h-full object-cover scale-125 blur-lg brightness-50"
            aria-hidden="true"
          >
        </div>

        <img
          v-if="item?.src"
          :src="item.src"
          :alt="`${item.category} photography`"
          class="relative z-10 w-full h-full object-contain"
        >

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
  </section>
</template>
