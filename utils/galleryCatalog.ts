import manifest from '~/assets/gallery/manifest.json'

export interface GalleryAsset {
  /** Original source file (videos + animated gifs + lightbox fallback) */
  src: string
  /** ~2KB blurred placeholder for LQIP blur-up */
  placeholder?: string
  /** ~1200px WebP for grid thumbnails */
  thumb?: string
  /** ~2000px WebP for lightbox / hero */
  full?: string
  width?: number
  height?: number
  isVideo: boolean
}

export interface GalleryImage extends GalleryAsset {
  category: string
}

function groupByCategory(): Record<string, GalleryAsset[]> {
  const images = manifest.images ?? {}
  const byCategory: Record<string, GalleryAsset[]> = {}
  for (const [category, assets] of Object.entries(images)) {
    if (category.toLowerCase() === 'thumbnails') continue
    byCategory[category] = assets
  }
  return byCategory
}

export const galleryCatalog = () => groupByCategory()

export const galleryCategories = () => Object.keys(groupByCategory()).sort()
