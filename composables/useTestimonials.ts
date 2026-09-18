import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Testimonial } from '~/types/testimonial'

// Static source of truth for now. To pull from a CMS later, replace this
// constant with a `useAsyncData`/`useFetch` call and return `data.value`.
const testimonials: Testimonial[] = [
  {
    id: 'PolyUnity',
    logoUrl: null,
    quote:
      'Sharif photography is able to capture genuine energy and emotion, with an unmatched gift for candid storytelling.',
    name: 'Jacqueline Lee',
    title: 'CEO at PolyUnity',
    heroImageUrl: '/gallery/Portraits/DSC01897-ARW_DxO_DeepPRIMEXD@thumb.webp',
    heroImageAlt: 'Portrait of Jacqueline Lee',
  },
  {
    id: 'keyin-college',
    logoUrl: null,
    quote:
      'Two years later, grads still use the LinkedIn headshots Sharif took at our event.',
    name: 'Jessica Noseworthy',
    title: 'Manager, Events & Strategic Partnerships at Keyin College',
    heroImageUrl: '/gallery/Events/DSC00247@thumb.webp',
    heroImageAlt: 'LinkedIn headshot from a Keyin College event photographed by Sharif',
  },
  {
    id: 'Arcade-Knights',
    logoUrl: null,
    quote:
      'I had Sharif shoot Arcade Knights at several venues, he nailed it every time!',
    name: 'Dean Parsons',
    title: 'Arcade Knights',
    heroImageUrl: '/gallery/Portraits/DSC00011-2@thumb.webp',
    heroImageAlt: 'Event portrait of Dean Parsons at Arcade Knights photographed by Sharif',
  },
]

// Pure helper: maps the `lg` media query to the visible-card count.
// Extracted so the breakpoint math is unit-testable without matchMedia.
export function resolveItemsPerView(isLg: boolean): number {
  return isLg ? 2 : 1
}

export function useTestimonials() {
  // 1 card per view below `lg`, 2 at `lg`+ (kept in sync with the slide's
  // `w-full lg:w-1/2` classes). The card is wide enough that 3-up would force
  // ~14px text, so it is intentionally capped at 2-up.
  const itemsPerView = ref(1)
  const currentIndex = ref(0)
  const isReducedMotion = ref(false)

  const total = testimonials.length
  const maxIndex = computed(() => Math.max(0, total - itemsPerView.value))

  function goTo(index: number) {
    currentIndex.value = Math.min(Math.max(index, 0), maxIndex.value)
  }

  function next() {
    goTo(currentIndex.value + 1)
  }

  function prev() {
    goTo(currentIndex.value - 1)
  }

  let lgQuery: MediaQueryList | null = null
  let motionQuery: MediaQueryList | null = null

  function updateItemsPerView() {
    itemsPerView.value = resolveItemsPerView(lgQuery?.matches ?? false)
  }

  function updateMotion() {
    isReducedMotion.value = motionQuery?.matches ?? false
  }

  onMounted(() => {
    lgQuery = window.matchMedia('(min-width: 1024px)')
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    updateItemsPerView()
    updateMotion()

    lgQuery.addEventListener('change', updateItemsPerView)
    motionQuery.addEventListener('change', updateMotion)
  })

  onUnmounted(() => {
    lgQuery?.removeEventListener('change', updateItemsPerView)
    motionQuery?.removeEventListener('change', updateMotion)
  })

  // If the viewport shrinks (fewer columns), pull the index back so the
  // carousel never lands past its new last position.
  watch(maxIndex, (max) => {
    if (currentIndex.value > max) currentIndex.value = max
  })

  return {
    testimonials,
    itemsPerView,
    currentIndex,
    maxIndex,
    total,
    next,
    prev,
    goTo,
    isReducedMotion,
  }
}
