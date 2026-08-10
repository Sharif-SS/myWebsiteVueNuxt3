import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  category: string
  src: string
}

const FEATURED = ['Portraits', 'Events']
const FUN = ['Pets', 'Landscape', 'Vehicles', 'Mixed Category']

const HERO_INTERVAL_MS = 10000
const FUN_INTERVAL_MS = 30000

interface Cycle {
  order: string[]
  index: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function newCycle(srcs: string[], last?: string): Cycle {
  if (srcs.length === 1) return { order: [...srcs], index: 0 }
  let order = shuffle(srcs)
  let guard = 0
  while (order[0] === last && guard < 5) {
    order = shuffle(srcs)
    guard += 1
  }
  return { order, index: 0 }
}

function preload(src: string) {
  if (src.endsWith('.webm') || typeof Image === 'undefined') return
  const img = new Image()
  img.src = src
}

export function useLandingSlideshow() {
  const images: Record<string, string> = import.meta.glob(
    '/public/photos/*/*.{jpg,jpeg,png,webp,gif,webm}',
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

  const cycles = new Map<string, Cycle>()
  const lastEmitted = new Map<string, string>()

  function nextSrc(category: string): string | undefined {
    const srcs = groupByCategory()[category] ?? []
    if (!srcs.length) return undefined

    let cycle = cycles.get(category)
    if (!cycle || cycle.index >= cycle.order.length) {
      cycle = newCycle(srcs, lastEmitted.get(category))
      cycles.set(category, cycle)
    }

    const src = cycle.order[cycle.index]
    cycle.index += 1
    lastEmitted.set(category, src)
    return src
  }

  function advanceHero() {
    const pair: Slide[] = []
    for (const cat of FEATURED) {
      const src = nextSrc(cat)
      if (!src) continue
      preload(src)
      pair.push({ category: cat, src })
    }
    heroPair.value = pair
  }

  function advanceFun() {
    const byCategory = groupByCategory()
    funSlides.value = FUN
      .filter(c => (byCategory[c]?.length ?? 0) > 0)
      .map((c) => {
        const src = nextSrc(c) as string
        return { category: c, src }
      })
  }

  const heroPair = ref<Slide[]>([])
  const funSlides = ref<Slide[]>([])

  advanceHero()
  advanceFun()

  let heroTimer: ReturnType<typeof setInterval> | undefined
  let funTimer: ReturnType<typeof setInterval> | undefined
  onMounted(() => {
    heroTimer = setInterval(advanceHero, HERO_INTERVAL_MS)
    funTimer = setInterval(advanceFun, FUN_INTERVAL_MS)
  })
  onUnmounted(() => {
    if (heroTimer) clearInterval(heroTimer)
    if (funTimer) clearInterval(funTimer)
  })

  return { heroPair, funSlides, advanceHero, advanceFun }
}
