import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  category: string
  src: string
}

const FEATURED = ['Portraits', 'Events']
const FUN = ['Pets', 'Landscape', 'Vehicles']

export function useLandingSlideshow() {
  const images: Record<string, string> = import.meta.glob(
    '/public/photos/*/*.{jpg,jpeg,png,webp,gif}',
    { eager: true, import: 'default' },
  ) as Record<string, string>

  function groupByCategory(): Record<string, string[]> {
    const byCategory: Record<string, string[]> = {}
    for (const [filepath, src] of Object.entries(images)) {
      const parts = filepath.replace(/\\/g, '/').split('/')
      const category = parts[3]
      if (!category || category.toLowerCase() === 'thumbnails') continue
      if (!byCategory[category]) byCategory[category] = []
      byCategory[category].push(src)
    }
    return byCategory
  }

  function pickRandom(srcs: string[]): string {
    return srcs[Math.floor(Math.random() * srcs.length)]
  }

  const heroPair = ref<Slide[]>([])
  const funSlides = ref<Slide[]>([])

  function refresh() {
    const byCategory = groupByCategory()

    const pair: Slide[] = []
    for (const cat of FEATURED) {
      const srcs = byCategory[cat]
      if (srcs?.length) pair.push({ category: cat, src: pickRandom(srcs) })
    }
    heroPair.value = pair

    funSlides.value = FUN
      .filter(c => byCategory[c]?.length)
      .map(c => ({ category: c, src: pickRandom(byCategory[c]) }))
  }

  refresh()

  let timer: ReturnType<typeof setInterval> | undefined
  onMounted(() => { timer = setInterval(refresh, 30000) })
  onUnmounted(() => { if (timer) clearInterval(timer) })

  return { heroPair, funSlides, refresh }
}
