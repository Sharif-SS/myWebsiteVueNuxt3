import { readdir, stat, writeFile, mkdir, rm } from 'node:fs/promises'
import { join, relative, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = dirname(fileURLToPath(import.meta.url)) + '/..'
const PHOTOS = join(ROOT, 'public', 'photos')
const GALLERY = join(ROOT, 'public', 'gallery')
const MANIFEST = join(ROOT, 'assets', 'gallery', 'manifest.json')

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const VIDEO = new Set(['.webm', '.mp4', '.mov'])

const FULL_MAX = 2000
const THUMB_MAX = 1200
const PLACEHOLDER_WIDTH = 64
const QUALITY_FULL = 80
const QUALITY_THUMB = 75
const QUALITY_PLACEHOLDER = 40

function galleryName(stem, suffix) {
  return `${stem}${suffix}.webp`
}

async function newestSourceMtime() {
  let newest = 0
  const entries = await readdir(PHOTOS, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const files = await readdir(join(PHOTOS, entry.name))
    for (const file of files) {
      const ext = extname(file).toLowerCase()
      if (!RASTER.has(ext) && !VIDEO.has(ext)) continue
      const t = (await stat(join(PHOTOS, entry.name, file))).mtimeMs
      if (t > newest) newest = t
    }
  }
  return newest
}

async function manifestOutdated() {
  try {
    const m = await stat(MANIFEST)
    return m.mtimeMs < (await newestSourceMtime())
  }
  catch {
    return true
  }
}

async function writeManifest(images) {
  await mkdir(dirname(MANIFEST), { recursive: true })
  await writeFile(
    MANIFEST,
    JSON.stringify({ generatedAt: new Date().toISOString(), images }, null, 2),
    'utf-8',
  )
}

async function buildEntry(category, filename) {
  const srcPath = join(PHOTOS, category, filename)
  const stem = basename(filename, extname(filename))
  const ext = extname(filename).toLowerCase()
  const entry = {
    src: `/photos/${category}/${filename}`,
    isVideo: false,
  }

  if (VIDEO.has(ext)) {
    return { ...entry, isVideo: true }
  }

  const metadata = await sharp(srcPath).metadata()
  const width = metadata.width ?? 0
  const height = metadata.height ?? 0

  // Animated GIFs keep their original file (animation) as source; only the
  // placeholder is derived from the first frame.
  const isAnimatedGif = ext === '.gif' && (metadata.pages ?? 1) > 1

  const outDir = join(GALLERY, category)
  await mkdir(outDir, { recursive: true })

  if (isAnimatedGif) {
    entry.placeholder = `/gallery/${category}/${galleryName(stem, '@placeholder')}`
    await sharp(srcPath, { page: 0 })
      .resize({ width: PLACEHOLDER_WIDTH, withoutEnlargement: true })
      .blur(8)
      .webp({ quality: QUALITY_PLACEHOLDER })
      .toFile(join(outDir, galleryName(stem, '@placeholder')))
    entry.full = entry.src
    entry.thumb = entry.src
  }
  else {
    entry.placeholder = `/gallery/${category}/${galleryName(stem, '@placeholder')}`
    entry.thumb = `/gallery/${category}/${galleryName(stem, '@thumb')}`
    entry.full = `/gallery/${category}/${galleryName(stem, '@full')}`

    await Promise.all([
      sharp(srcPath)
        .resize({ width: PLACEHOLDER_WIDTH, withoutEnlargement: true })
        .blur(8)
        .webp({ quality: QUALITY_PLACEHOLDER })
        .toFile(join(outDir, galleryName(stem, '@placeholder'))),
      sharp(srcPath)
        .resize({ width: THUMB_MAX, withoutEnlargement: true })
        .webp({ quality: QUALITY_THUMB })
        .toFile(join(outDir, galleryName(stem, '@thumb'))),
      sharp(srcPath)
        .resize({ width: FULL_MAX, withoutEnlargement: true })
        .webp({ quality: QUALITY_FULL })
        .toFile(join(outDir, galleryName(stem, '@full'))),
    ])
  }

  entry.width = width
  entry.height = height
  return entry
}

async function main() {
  if (!(await manifestOutdated())) {
    console.log('[optimize-images] up to date — no changes')
    return
  }

  await rm(GALLERY, { recursive: true, force: true })

  const categoryDirs = (await readdir(PHOTOS, { withFileTypes: true }))
    .filter(d => d.isDirectory() && d.name.toLowerCase() !== 'thumbnails')
    .map(d => d.name)
    .sort()

  const images = {}
  let total = 0

  for (const category of categoryDirs) {
    const dir = join(PHOTOS, category)
    const filenames = (await readdir(dir))
      .filter((f) => {
        const ext = extname(f).toLowerCase()
        return RASTER.has(ext) || VIDEO.has(ext)
      })
      .sort()

    images[category] = []
    for (const filename of filenames) {
      try {
        images[category].push(await buildEntry(category, filename))
        total += 1
      }
      catch (err) {
        console.error(`[optimize-images] failed: ${category}/${filename} — ${err.message}`)
      }
    }
  }

  await writeManifest(images)
  console.log(`[optimize-images] built ${total} entries across ${categoryDirs.length} categories -> ${relative(ROOT, GALLERY)}`)
}

main().catch((err) => {
  console.error('[optimize-images] fatal:', err)
  process.exit(1)
})
