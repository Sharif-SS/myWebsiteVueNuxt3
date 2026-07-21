import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const title = 'Photography Projects by Sharif Sircar 🙋'
const shortTitle = 'Sharif\'s Personal Website'
const description
  = 'Exploring growth, problem-solving, and creativity through technology and continuous learning. Join me on the journey of building skills and meaningful projects.'

export default defineNuxtConfig({

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    'nuxt-gtag',
  ],
  ssr: true,

  gtag: {
    id: 'G-6VSTRJ3QLM',
  },

  app: {
    head: {
      title: 'Sharif Sircar\'s Website',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { property: 'og:site_name', content: title },
        { hid: 'global-og:type', property: 'og:type', content: 'website' },
        { hid: 'global-og:title', property: 'og:title', content: title },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'global-twitter:title',
          name: 'twitter:title',
          content: title,
        },
      ],
    },
  },

  css: ['@/assets/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  compatibilityDate: '2026-07-20',
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

  image: {
    format: ['webp'],
  },
})
