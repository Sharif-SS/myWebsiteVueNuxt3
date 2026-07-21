interface GalleryImage {
  src: string
  category: string
}

export function useGallery() {
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

  const byCategory = groupByCategory()
  const categories = Object.keys(byCategory).sort()

  function getImages(category: string): GalleryImage[] {
    return (byCategory[category] ?? []).map(src => ({ src, category }))
  }

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  return { categories, byCategory, getImages, shuffle }
}
