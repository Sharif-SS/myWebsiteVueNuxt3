import { ref, onMounted, onUnmounted } from 'vue'
import { galleryCatalog, type GalleryAsset } from '~/utils/galleryCatalog'

interface Slide {
  category: string
  src: string
  placeholder?: string
}

const FEATURED = ['Portraits', 'Events']
const FUN = ['Pets', 'Landscape', 'Vehicles', 'Miscellaneous']

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
  const byCategory = galleryCatalog()

  function imagesFor(category: string): GalleryAsset[] {
    return byCategory[category] ?? []
  }

  const cycles = new Map<string, Cycle>()
  const lastEmitted = new Map<string, string>()

  function nextAsset(category: string): GalleryAsset | undefined {
    const assets = imagesFor(category).filter(a => !a.isVideo)
    if (!assets.length) return undefined

    let cycle = cycles.get(category)
    if (!cycle || cycle.index >= cycle.order.length) {
      cycle = newCycle(assets.map(a => a.src), lastEmitted.get(category))
      cycles.set(category, cycle)
    }

    const src = cycle.order[cycle.index]
    cycle.index += 1
    lastEmitted.set(category, src)
    return assets.find(a => a.src === src)
  }

  function advanceHero() {
    heroMode.value = heroMode.value === 'solo' ? 'pair' : 'solo'
    const pair: Slide[] = []
    for (const cat of FEATURED) {
      const asset = nextAsset(cat)
      if (!asset) continue
      preload(asset.full ?? asset.src)
      pair.push({
        category: cat,
        src: asset.full ?? asset.src,
        placeholder: asset.placeholder,
      })
    }
    heroPair.value = pair
  }

  function advanceFun() {
    funSlides.value = FUN
      .filter(c => (imagesFor(c)?.length ?? 0) > 0)
      .map((c) => {
        const asset = nextAsset(c) as GalleryAsset
        return {
          category: c,
          src: asset.full ?? asset.src,
          placeholder: asset.placeholder,
        }
      })
  }

  const heroPair = ref<Slide[]>([])
  const heroMode = ref<'solo' | 'pair'>('solo')
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

  return { heroPair, heroMode, funSlides, advanceHero, advanceFun }
}
