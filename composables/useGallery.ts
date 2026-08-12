import { galleryCatalog, galleryCategories, type GalleryImage } from '~/utils/galleryCatalog'

export function useGallery() {
  const byCategory = galleryCatalog()
  const categories = galleryCategories()

  function getImages(category: string): GalleryImage[] {
    return (byCategory[category] ?? []).map(asset => ({ ...asset, category }))
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
