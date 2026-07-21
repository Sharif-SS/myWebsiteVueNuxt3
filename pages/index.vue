<script setup lang="ts">
const description = 'Exploring growth, problem-solving, and creativity through technology and continuous learning. Join me on the journey of building skills and meaningful projects.'

useHead({
  title: 'Sharif\'s Homepage',
  meta: [
    { hid: 'og:url', property: 'og:url', content: 'https://www.sharif-sircar.com' },
    { hid: 'og:site_name', property: 'og:site_name', content: 'Sharif Sircar\'s Website' },
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:image', property: 'og:image', content: 'https://www.sharif-sircar.com/ogImage.jpg' },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    { hid: 'twitter:image', name: 'twitter:image', content: 'https://www.sharif-sircar.com/ogImage.jpg' },
  ],
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: 'https://www.sharif-sircar.com/',
    },
  ],
})

const { heroPair, funSlides, refresh } = useLandingSlideshow()

function advanceSlideshow() {
  refresh()
}
</script>

<template>
  <div class="bg-white">
    <section class="relative">
      <LandingHeroSlideshow :pair="heroPair" @next="advanceSlideshow" />
    </section>

    <section class="max-w-3xl mx-auto px-4 py-20">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About</h2>
      <div class="space-y-5 text-gray-700 leading-relaxed">
        <p>
          Photography has always been about freezing a moment before it disappears — the way light falls across a
          face, the quiet tension in a room full of strangers, the accidental geometry of an everyday scene.
        </p>
        <p>
          I'm Sharif Sircar, a photographer based in the Pacific Northwest. My work spans portraits, events, landscape,
          and the in-between moments that don't fit neatly into a category. I'm drawn to natural light, candid
          expression, and the kind of images that feel more like memories than photographs.
        </p>
        <p>
          This site is a living archive — a place to share what I see without over-explaining it. If something
          catches your eye, I'd love to hear about it.
        </p>
      </div>
      <div class="mt-10 pt-8 border-t border-gray-100">
        <p class="text-gray-400 text-sm">Based in Seattle, WA. Available for portrait, event, and commercial work.</p>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-20 border-t border-gray-100">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Other Things I Do (For Fun)</h2>
      <p class="text-gray-500 mb-10 max-w-xl">
        I don't do these professionally — just for the love of it.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="slide in funSlides"
          :key="slide.category"
          class="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="slide.src"
              :alt="`${slide.category} photography`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <span class="text-white font-medium text-sm tracking-wide uppercase">{{ slide.category }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
