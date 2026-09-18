<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const {
  testimonials,
  itemsPerView,
  currentIndex,
  maxIndex,
  total,
  next,
  prev,
  goTo,
  isReducedMotion,
} = useTestimonials()

const viewportRef = ref<HTMLElement | null>(null)
const slideWidth = ref(0)

// Slides are sized with Tailwind fractions (w-[85%] / md:w-[90%] / lg:w-[45%])
// that don't map to a whole number of visible cards, so measure the real
// distance between two consecutive slides instead of dividing the viewport by
// itemsPerView. The track has a `gap`, so the stride is one slide plus that
// gap — stepping by the stride advances exactly one full card.
function measureSlide() {
  const el = viewportRef.value
  if (!el) return
  const slides = el.querySelectorAll<HTMLElement>('[role="group"]')
  const first = slides[0]
  if (!first) return
  const second = slides[1]
  slideWidth.value = second
    ? second.getBoundingClientRect().left - first.getBoundingClientRect().left
    : first.getBoundingClientRect().width
}

const offsetX = computed(() => -currentIndex.value * slideWidth.value)

function isActive(index: number): boolean {
  return index >= currentIndex.value && index < currentIndex.value + itemsPerView.value
}

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  measureSlide()
  if (viewportRef.value) {
    resizeObserver = new ResizeObserver(measureSlide)
    resizeObserver.observe(viewportRef.value)
  }
})
onUnmounted(() => resizeObserver?.disconnect())

// --- Keyboard navigation (Tab / Enter / Arrow keys) ---
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    next()
  }
  else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prev()
  }
  else if (e.key === 'Home') {
    e.preventDefault()
    goTo(0)
  }
  else if (e.key === 'End') {
    e.preventDefault()
    goTo(maxIndex.value)
  }
}

// --- Swipe gestures (mobile) ---
let startX = 0
let startY = 0
let pointerId: number | null = null

function onPointerDown(e: PointerEvent) {
  pointerId = e.pointerId
  startX = e.clientX
  startY = e.clientY
}

function onPointerUp(e: PointerEvent) {
  if (e.pointerId !== pointerId) return
  pointerId = null
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  // Ignore vertical scrolls / taps; require a clear horizontal drag.
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) next()
    else prev()
  }
}

function onPointerCancel(e: PointerEvent) {
  if (e.pointerId === pointerId) pointerId = null
}
</script>

<template>
  <section v-reveal class="relative bg-gray-50 reveal">
    <div
      class="absolute left-1/2 top-0 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-5xl font-bold leading-none text-gray-900 shadow-md ring-4 ring-white"
      aria-hidden="true"
    >
      &ldquo;
    </div>

    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:py-20">
      <div class="mb-10 max-w-2xl">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          What people are saying
        </h2>
      </div>

      <div
        ref="viewportRef"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        class="overflow-hidden pt-4"
        tabindex="0"
        @keydown="onKeydown"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
      >
        <div
          class="flex gap-5"
          :class="isReducedMotion ? 'transition-none' : 'transition-transform duration-500 ease-out'"
          :style="{ transform: `translateX(${offsetX}px)`, touchAction: 'pan-y' }"
        >
          <div
            v-for="(testimonial, i) in testimonials"
            :key="testimonial.id"
            role="group"
            aria-roledescription="slide"
            :aria-label="`Slide ${i + 1} of ${total}`"
            :aria-hidden="isActive(i) ? undefined : 'true'"
            class="w-[85%] shrink-0 py-1 md:w-[90%] lg:w-[45%]"
          >
            <TestimonialCard :testimonial="testimonial" />
          </div>
        </div>
      </div>

      <div v-if="maxIndex > 0" class="mt-8 flex items-center justify-between">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:pointer-events-none disabled:opacity-40"
          :disabled="currentIndex === 0"
          aria-label="Previous testimonial"
          @click="prev"
        >
          <Icon name="mdi:chevron-left" class="h-5 w-5" />
        </button>

        <div class="flex items-center gap-2">
          <button
            v-for="page in maxIndex + 1"
            :key="page"
            type="button"
            class="h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            :class="currentIndex === page - 1 ? 'w-6 bg-accent border border-gray-300' : 'w-2.5 bg-gray-300 hover:bg-gray-400'"
            :aria-label="`Go to testimonial ${page}`"
            :aria-current="currentIndex === page - 1 ? 'true' : undefined"
            @click="goTo(page - 1)"
          />
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:pointer-events-none disabled:opacity-40"
          :disabled="currentIndex >= maxIndex"
          aria-label="Next testimonial"
          @click="next"
        >
          <Icon name="mdi:chevron-right" class="h-5 w-5" />
        </button>
      </div>

      <p
        v-if="maxIndex > 0"
        class="mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-700 lg:hidden"
        aria-live="polite"
      >
        Showing testimonial {{ currentIndex + 1 }} of {{ total }} · Swipe for more
      </p>
    </div>
  </section>
</template>
