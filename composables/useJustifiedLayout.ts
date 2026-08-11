export interface GalleryImage {
  src: string
  category: string
}

export interface PlacedImage extends GalleryImage {
  isVideo: boolean
  naturalWidth: number
  naturalHeight: number
  index: number
}

export interface PlacedItem {
  image: PlacedImage
  width: number
  height: number
}

export interface LayoutRow {
  items: PlacedItem[]
  height: number
}

const dimsCache = new Map<string, { naturalWidth: number, naturalHeight: number }>()

export async function loadDimensions(src: string, isVideo: boolean): Promise<{ naturalWidth: number, naturalHeight: number }> {
  const key = `${isVideo ? 'v:' : 'i:'}${src}`
  const hit = dimsCache.get(key)
  if (hit) return hit
  const dims = await fetchDimensions(src, isVideo)
  dimsCache.set(key, dims)
  return dims
}

function fetchDimensions(src: string, isVideo: boolean): Promise<{ naturalWidth: number, naturalHeight: number }> {
  if (typeof window === 'undefined' || (isVideo && typeof document === 'undefined')) {
    return Promise.resolve({ naturalWidth: 4, naturalHeight: 3 })
  }
  if (isVideo) {
    return new Promise((resolve) => {
      const v = document.createElement('video')
      v.preload = 'metadata'
      v.muted = true
      v.onloadedmetadata = () => resolve({ naturalWidth: v.videoWidth || 16, naturalHeight: v.videoHeight || 9 })
      v.onerror = () => resolve({ naturalWidth: 16, naturalHeight: 9 })
      v.src = src
    })
  }
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight })
    img.onerror = () => resolve({ naturalWidth: 4, naturalHeight: 3 })
    img.src = src
  })
}

function layoutRow(
  images: PlacedImage[],
  containerWidth: number,
  gap: number,
  targetHeight: number,
  isLast: boolean,
): LayoutRow[] {
  const count = images.length
  // Pixel width available to the images inside this row (gaps subtracted).
  const usable = Math.max(containerWidth - gap * (count - 1), 1)
  const ratio = (i: PlacedImage) => i.naturalWidth / i.naturalHeight

  // A single image wider than the usable area gets the full row was its own.
  if (count === 1 && ratio(images[0]) > usable / targetHeight) {
    const height = usable / ratio(images[0])
    return [{ items: [{ image: images[0], width: usable, height }], height }]
  }

  const ratioSum = images.reduce((s, i) => s + ratio(i), 0)
  let rowHeight: number
  if (!isLast) {
    rowHeight = usable / ratioSum
  }
  else {
    // Keep a sparse final row from ballooning; cap at a normal tile height.
    rowHeight = Math.min(targetHeight, usable / ratioSum)
  }
  return [{
    items: images.map(image => ({
      image,
      width: ratio(image) * rowHeight,
      height: rowHeight,
    })),
    height: rowHeight,
  }]
}

/**
 * Packs images into rows that each fill the container width end-to-end
 * (justified / "tetris" layout). Order is preserved; natural aspect ratios
 * are kept — nothing is cropped or stretched.
 */
export function buildPackedRows(
  images: PlacedImage[],
  containerWidth: number,
  gap: number,
  targetHeight: number,
): LayoutRow[] {
  const usable = Math.max(containerWidth - gap, 1)
  const rows: LayoutRow[] = []
  let current: PlacedImage[] = []
  let aspects = 0

  const flush = (isLast: boolean) => {
    if (!current.length) return
    rows.push(...layoutRow(current, containerWidth, gap, targetHeight, isLast))
    current = []
    aspects = 0
  }

  for (const image of images) {
    const r = image.naturalWidth / image.naturalHeight
    if (r > usable / targetHeight) {
      flush(false)
      current = [image]
      flush(false)
      continue
    }
    // Break the row before adding an image that would overflow the width.
    const nextWidth = (aspects + r) * targetHeight
    if (current.length && nextWidth > usable + usable * 0.15 && aspects > 0) {
      flush(false)
    }
    current.push(image)
    aspects += r
  }
  flush(true)
  return rows
}
