<script setup lang="ts">
import { ref, computed } from 'vue'

const { categories: allCats, getImages, shuffle } = useGallery()

const groups = [['Events', 'Portraits'], ['Landscape', 'Pets', 'Vehicles']]
const categoryGroups = groups.filter(g => g.every(c => allCats.includes(c)))
const flatCategories = categoryGroups.flat()

const activeCategory = ref(flatCategories[0] ?? '')

const allImages = computed(() => {
  if (!activeCategory.value) return []
  return shuffle(getImages(activeCategory.value))
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const lightboxImages = ref<{ src: string, category: string }[]>([])

function openLightbox(index: number) {
  lightboxImages.value = allImages.value
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

useHead({
  title: 'Photography Portfolio',
  meta: [
    { property: 'og:url', content: 'https://www.sharif-sircar.com/photography' },
    { property: 'og:site_name', content: 'Sharif Sircar\'s Photography' },
    { name: 'description', content: 'A collection of photos taken over the years by Sharif Sircar.' },
    { property: 'og:title', content: 'Photography Portfolio' },
    { property: 'og:description', content: 'Portraits, events, nature, and more.' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Photography Portfolio' },
  ],
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: 'https://www.sharif-sircar.com/photography',
    },
  ],
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Photography</h1>
      <p class="text-gray-600 mb-8 max-w-lg">
        A collection of moments captured over the years.
      </p>

      <GalleryCategoryCarousel
        :groups="categoryGroups"
        :active="activeCategory"
        @select="activeCategory = $event"
      />

      <div class="mt-10">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ activeCategory }}</h2>
        <GalleryGrid
          v-if="allImages.length"
          :images="allImages"
          @open="openLightbox"
        />
        <p v-else class="text-gray-600">No images in this category yet.</p>
      </div>
    </div>

    <GalleryLightbox
      :images="lightboxImages"
      :initial-index="lightboxIndex"
      :open="lightboxOpen"
      @close="closeLightbox"
    />
  </div>
</template>
