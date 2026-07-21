<script setup lang="ts">
const description = 'Exploring growth, problem-solving, and creativity through technology and continuous learning. Join me on the journey of building skills and meaningful projects.'

useHead({
  title: 'Sharif\'s Homepage',
  meta: [
    { property: 'og:url', content: 'https://www.sharif-sircar.com' },
    { property: 'og:site_name', content: 'Sharif Sircar\'s Website' },
    { name: 'description', content: description },
    { property: 'og:description', content: description },
    { property: 'og:image', content: 'https://www.sharif-sircar.com/og-image.svg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: 'https://www.sharif-sircar.com/og-image.svg' },
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

    <section class="max-w-5xl mx-auto px-4 py-20">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">About</h2>
      <div class="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
        <div class="flex-shrink-0">
          <AboutPhoto />
        </div>
        <div class="flex-1 min-w-0 space-y-5 text-gray-700 leading-relaxed">
          <p>
            Photography has been part of my life since my teens, and I never stopped shooting ever since I started playing around with my dad's old film camera.
          </p>
          <p>
            I'm Sharif Sircar, a photographer based in the easternmost part of North America, Newfoundland and Labrador. My work spans portraits, events, landscape,
            and the in-between moments that don't fit neatly into a category. I'm drawn to natural light, candid
            expression, and the kind of images that feel more like memories than photographs.
          </p>
          <p>
            This site is a living archive, a place to share what I see without over-explaining it. If something
            catches your eye, I'd love to hear about it.
          </p>
          <div class="pt-6 border-t border-gray-100">
            <p class="text-gray-600 text-sm">Based in St. John's, NL. Available for event, portrait, and commercial work.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-20 border-t border-gray-100">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Outside of Events and Portraits</h2>
      <p class="text-gray-600 mb-10 max-w-xl">
        I like to explore other genres of photography, and I often find myself drawn to the challenge of capturing something new. Here are a few examples of my work in other areas of photography.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NuxtLink
          v-for="slide in funSlides"
          :key="slide.category"
          to="/photography"
          class="group block overflow-hidden rounded-xl bg-gray-100 shadow-sm"
        >
          <div class="relative aspect-[4/3]">
            <div class="absolute inset-0 overflow-hidden">
              <img
                :src="slide.src"
                class="w-full h-full object-cover scale-125 blur-lg brightness-50"
                aria-hidden="true"
              >
            </div>
            <img
              :src="slide.src"
              :alt="`${slide.category} photography`"
              class="relative z-10 w-full h-full object-contain"
            >
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" style="z-index: 15" />
            <div class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-3 px-4">
              <span class="inline-flex items-center gap-1.5 text-white text-sm font-bold uppercase tracking-wide whitespace-nowrap">
                {{ slide.category }}
                <Icon
                  name="mdi:arrow-right"
                  class="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
