import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const title = 'Photography Projects by Sharif Sircar 🙋'

export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    'nuxt-gtag',
  ],

  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Sharif Sircar\'s Website',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap' },
      ],
      meta: [
        { property: 'og:site_name', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
      ],
    },
  },

  css: ['@/assets/main.scss'],

  compatibilityDate: '2026-07-20',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
  typescript: { shim: false },

  hooks: {
    'nitro:build:before': (nitro) => {
      nitro.hooks.hook('prerender:init', (prerendererNitro) => {
        prerendererNitro.hooks.hook('compiled', async () => {
          const filePath = resolve(
            prerendererNitro.options.output.serverDir,
            'chunks/_/nitro.mjs',
          )
          if (!existsSync(filePath)) return
          const content = await readFile(filePath, 'utf-8')
          if (content.includes('"file:///_entry.js"')) {
            const fixedUrl = pathToFileURL(filePath).href
            const newContent = content.replaceAll(
              '"file:///_entry.js"',
              JSON.stringify(fixedUrl),
            )
            await writeFile(filePath, newContent, 'utf-8')
          }
        })
      })
    },
  },

  gtag: {
    id: 'G-6VSTRJ3QLM',
  },

  image: {
    format: ['webp'],
  },
})
