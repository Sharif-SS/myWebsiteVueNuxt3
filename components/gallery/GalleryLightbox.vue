<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

interface GalleryImage {
  src: string
  category: string
}

const props = defineProps<{
  images: GalleryImage[]
  initialIndex: number
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const currentIndex = ref(props.initialIndex)
const current = computed(() => props.images[currentIndex.value])

function prev() {
  if (currentIndex.value > 0) currentIndex.value--
}

function next() {
  if (currentIndex.value < props.images.length - 1) currentIndex.value++
}

watch(() => props.initialIndex, (val) => { currentIndex.value = val })

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open && current"
      class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center select-none"
      @click.self="emit('close')"
    >
      <button
        class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        @click="emit('close')"
        aria-label="Close"
      >
        <Icon name="mdi:close" class="w-6 h-6" />
      </button>

      <button
        v-if="currentIndex > 0"
        class="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        @click="prev"
        aria-label="Previous"
      >
        <Icon name="mdi:chevron-left" class="w-8 h-8" />
      </button>

      <img
        :src="current.src"
        :alt="`${current.category} photography`"
        class="max-h-[90vh] max-w-[90vw] object-contain"
      >

      <button
        v-if="currentIndex < images.length - 1"
        class="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        @click="next"
        aria-label="Next"
      >
        <Icon name="mdi:chevron-right" class="w-8 h-8" />
      </button>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>
  </Teleport>
</template>
