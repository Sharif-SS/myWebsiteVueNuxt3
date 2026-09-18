import { describe, it, expect } from 'vitest'
import { useTestimonials, resolveItemsPerView } from './useTestimonials'

describe('resolveItemsPerView', () => {
  it('returns 2 for desktop (>=1024px)', () => {
    expect(resolveItemsPerView(true)).toBe(2)
  })
  it('returns 1 for mobile/tablet (<1024px)', () => {
    expect(resolveItemsPerView(false)).toBe(1)
  })
})

describe('useTestimonials', () => {
  it('exposes the typed testimonial data', () => {
    const { testimonials, total } = useTestimonials()
    expect(total).toBe(3)
    for (const t of testimonials) {
      expect(t.id).toBeTruthy()
      expect(t.quote.length).toBeGreaterThan(20)
      expect(t.name).toBeTruthy()
      expect(t.title).toBeTruthy()
      expect(t.heroImageUrl).toMatch(/^\/gallery\/.+@full\.webp$/)
      expect(t.heroImageAlt).toBeTruthy()
      expect('logoUrl' in t).toBe(true) // nullable-by-design field present
    }
  })

  it('clamps goTo/next/prev at the carousel bounds', () => {
    const { itemsPerView, goTo, next, prev, currentIndex, maxIndex } = useTestimonials()

    // 3-up with 3 items => single page, no movement allowed.
    itemsPerView.value = 3
    expect(maxIndex.value).toBe(0)
    goTo(2)
    expect(currentIndex.value).toBe(0)
    next()
    expect(currentIndex.value).toBe(0)
    prev()
    expect(currentIndex.value).toBe(0)

    // 1-up with 3 items => two pages.
    itemsPerView.value = 1
    expect(maxIndex.value).toBe(2)
    goTo(2)
    expect(currentIndex.value).toBe(2)
    next() // already at the end
    expect(currentIndex.value).toBe(2)
    prev()
    expect(currentIndex.value).toBe(1)
    goTo(-5)
    expect(currentIndex.value).toBe(0)
  })
})
