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
  title: 'Photography — Sharif Sircar',
  meta: [
    { property: 'og:url', content: 'https://www.sharif-sircar.com/photography' },
    { property: 'og:site_name', content: 'Sharif Sircar — Photography' },
    { name: 'description', content: 'Portraits, events, landscape, pets, and vehicles — a collection of photos by Sharif Sircar.' },
    { property: 'og:title', content: 'Photography — Sharif Sircar' },
    { property: 'og:description', content: 'Portraits, events, landscape, pets, and vehicles.' },
    { property: 'og:image', content: 'https://www.sharif-sircar.com/og-image.svg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Photography — Sharif Sircar' },
    { name: 'twitter:image', content: 'https://www.sharif-sircar.com/og-image.svg' },
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
      <h1 v-reveal class="reveal text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Photography</h1>
      <p v-reveal class="reveal text-gray-600 mb-8 max-w-lg" :style="{ transitionDelay: '0.15s' }">
        A collection of moments captured over the years.
      </p>

      <GalleryCategoryCarousel
        :categories="flatCategories"
        :active="activeCategory"
        @select="activeCategory = $event"
      />

      <div class="mt-10">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ activeCategory }}</h2>
        <GalleryGrid
          v-if="allImages.length"
          :images="allImages"
          @open="openLightbox"
          v-reveal
          class="reveal"
          :style="{ transitionDelay: '0.3s' }"
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
