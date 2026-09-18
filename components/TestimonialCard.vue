<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Testimonial } from '~/types/testimonial'

defineProps<{
  testimonial: Testimonial
}>()

const expanded = ref(false)
const quoteRef = ref<HTMLElement | null>(null)
const isTruncated = ref(false)
let quoteResizeObserver: ResizeObserver | null = null

function checkQuoteOverflow() {
  const quote = quoteRef.value
  if (quote) isTruncated.value = quote.scrollHeight > quote.clientHeight + 1
}

onMounted(async () => {
  await nextTick()
  checkQuoteOverflow()
  if (quoteRef.value) {
    quoteResizeObserver = new ResizeObserver(checkQuoteOverflow)
    quoteResizeObserver.observe(quoteRef.value)
  }
})

onBeforeUnmount(() => quoteResizeObserver?.disconnect())
</script>

<template>
  <article
    class="flex w-full flex-col gap-0 sm:h-[clamp(220px,20vw,250px)] sm:flex-row"
  >
    <div class="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-t-xl bg-gray-200 sm:h-full sm:w-auto sm:rounded-l-xl sm:rounded-t-none">
      <img
        :src="testimonial.heroImageUrl"
        :alt="testimonial.heroImageAlt"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      >
    </div>

    <div class="relative flex w-full flex-col rounded-b-xl border border-gray-200 bg-white p-4 pt-10 shadow-float sm:h-full sm:w-auto sm:min-w-[280px] sm:max-w-[360px] sm:rounded-r-xl sm:rounded-b-none sm:p-5 sm:pt-10">
      <NuxtImg
        v-if="testimonial.logoUrl"
        :src="testimonial.logoUrl"
        :alt="`${testimonial.name} logo`"
        class="mb-3 h-6 w-auto"
        loading="lazy"
      />

      <div>
        <span
          class="absolute -top-4 left-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-2xl font-bold leading-none text-gray-900 shadow-sm ring-4 ring-white"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p
          ref="quoteRef"
          class="text-base leading-[1.55] text-gray-900"
          :class="!expanded ? 'line-clamp-4' : ''"
        >
          {{ testimonial.quote }}
        </p>
        <button
          v-if="isTruncated"
          type="button"
          class="mt-2 ml-4 text-sm font-medium text-gray-900 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          @click="expanded = !expanded"
        >
          {{ expanded ? 'Read less' : 'Read more' }}
        </button>
      </div>

      <figcaption class="mt-5 border-t border-gray-100 pt-4">
        <p class="text-sm font-bold text-gray-900">{{ testimonial.name }}</p>
        <p class="mt-0.5 text-sm text-gray-600">{{ testimonial.title }}</p>
      </figcaption>
    </div>
  </article>
</template>
