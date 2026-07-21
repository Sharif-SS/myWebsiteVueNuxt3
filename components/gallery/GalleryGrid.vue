<script setup lang="ts">
interface GalleryImage {
  src: string
  category: string
}

defineProps<{
  images: GalleryImage[]
}>()

const emit = defineEmits<{
  open: [index: number]
}>()
</script>

<template>
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
    <div
      v-for="(img, i) in images"
      :key="img.src"
      class="break-inside-avoid mb-4 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
      @click="emit('open', i)"
    >
      <img
        :src="img.src"
        :alt="`${img.category} photography`"
        class="w-full h-auto transition-transform duration-500 group-hover:scale-105"
      >
    </div>
  </div>
</template>
