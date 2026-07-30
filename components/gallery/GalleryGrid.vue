<script setup lang="ts">
interface GalleryImage {
  src: string
  category: string
}

const props = defineProps<{
  images: GalleryImage[]
}>()

const emit = defineEmits<{
  open: [index: number]
}>()

const orientations = ref<Record<string, 'portrait' | 'landscape'>>({})

function isVideo(src: string): boolean {
  return src.endsWith('.webm')
}

function preload(src: string): Promise<'portrait' | 'landscape'> {
  return new Promise((resolve) => {
    if (isVideo(src)) return resolve('landscape')
    if (typeof Image === 'undefined') return resolve('landscape')
    const img = new Image()
    img.onload = () => resolve(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape')
    img.onerror = () => resolve('landscape')
    img.src = src
  })
}

watch(
  () => props.images,
  async (imgs) => {
    const result: Record<string, 'portrait' | 'landscape'> = {}
    await Promise.all(imgs.map(async (img) => {
      result[img.src] = await preload(img.src)
    }))
    orientations.value = result
  },
  { immediate: true },
)

function span(src: string): string {
  const o = orientations.value[src]
  if (o === 'portrait') return 'col-span-1'
  return 'col-span-2 sm:col-span-2 lg:col-span-2'
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <div
      v-for="(img, i) in images"
      :key="img.src"
      :class="[span(img.src), 'rounded-lg overflow-hidden bg-gray-100 cursor-pointer group']"
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
        @mouseenter="($event.target as HTMLVideoElement)?.play()"
        @mouseleave="($event.target as HTMLVideoElement)?.pause()"
      ></video>
    </div>
  </div>
</template>
