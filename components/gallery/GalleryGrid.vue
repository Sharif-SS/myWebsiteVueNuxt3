<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { buildPackedRows, loadDimensions, type GalleryImage, type LayoutRow } from '~/composables/useJustifiedLayout'

const props = defineProps<{
  images: GalleryImage[]
}>()

const emit = defineEmits<{
  open: [index: number]
}>()

const wrapRef = ref<HTMLDivElement | null>(null)
const containerWidth = ref(0)
const rows = ref<LayoutRow[]>([])
const ready = ref(false)
const gap = 16

function isVideo(src: string): boolean {
  return src.endsWith('.webm')
}

function play(e: Event) {
  ;(e.target as HTMLVideoElement)?.play()
}

function pause(e: Event) {
  ;(e.target as HTMLVideoElement)?.pause()
}

let observer: ResizeObserver | null = null
let raf = 0
function measure() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    if (wrapRef.value) containerWidth.value = wrapRef.value.clientWidth
  })
}

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (wrapRef.value) observer.observe(wrapRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})

watch(
  [() => props.images, containerWidth],
  async ([imgs, width]: [GalleryImage[], number]) => {
    if (!width || !imgs.length) {
      rows.value = []
      ready.value = false
      return
    }
    ready.value = false
    // Mobile keeps smaller tiles; tablet/desktop scale rows up ~30% for a
    // bigger, more immersive grid. Rows still stretch to fill the full
    // container width either way, so this scales linearly.
    const targetHeight = width < 640 ? 180 : Math.round(260 * 1.3)
    const placed = await Promise.all(imgs.map(async (img, index) => ({
      ...img,
      index,
      isVideo: isVideo(img.src),
      ...(await loadDimensions(img.src, isVideo(img.src))),
    })))
    rows.value = buildPackedRows(placed, width, gap, targetHeight)
    ready.value = true
  },
  { immediate: true },
)
</script>

<template>
  <div ref="wrapRef" class="w-full">
    <div v-if="!ready" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(img, i) in images"
        :key="img.src"
        class="aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
        @click="emit('open', i)"
      >
        <img
          v-if="!isVideo(img.src)"
          :src="img.src"
          :alt="`${img.category} photography`"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
        <video
          v-else
          :src="img.src"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          muted
          loop
          playsinline
          @mouseenter="play"
          @mouseleave="pause"
        />
      </div>
    </div>

    <div v-else class="flex flex-col" :style="{ gap: `${gap}px` }">
      <div
        v-for="(row, ri) in rows"
        :key="ri"
        class="flex w-full"
        :class="{ 'justify-center': ri === rows.length - 1 }"
        :style="{ gap: `${gap}px`, height: `${row.height}px` }"
      >
        <div
          v-for="item in row.items"
          :key="item.image.src"
          class="relative flex-none overflow-hidden rounded-lg bg-gray-100 cursor-pointer group"
          :style="{ width: `${item.width}px` }"
          @click="emit('open', item.image.index)"
        >
          <img
            v-if="!item.image.isVideo"
            :src="item.image.src"
            :alt="`${item.image.category} photography`"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <video
            v-else
            :src="item.image.src"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            muted
            loop
            playsinline
            @mouseenter="play"
            @mouseleave="pause"
          />
        </div>
      </div>
    </div>
  </div>
</template>
