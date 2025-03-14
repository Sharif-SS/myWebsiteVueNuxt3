import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "Photography Projects by Sharif Sircar 🙋";
const shortTitle = "Sharif's Personal Website";
const description = "Exploring growth, problem-solving, and creativity through technology and continuous learning. Join me on the journey of building skills and meaningful projects."
// const image = "https://www.sharif-sircar.com/ogImage.jpg";
// const url = "https://www.sharif-sircar.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

  ssr: true,

  // import styles
  css: ["@/assets/main.scss"],
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },

  modules: [
    '@nuxt/image',

    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },

  ],

  // nuxt image properties
  image: {
    format: ['webp']
  },

  app: {

    head: {

      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-6VSTRJ3QLM',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6VSTRJ3QLM', {
              page_path: window.location.pathname,
            });
          `,
          type: 'text/javascript',

        }
      ],

      title: "Sharif Sircar's Website",
      // titleTemplate: "%s",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // { rel: "canonical", href: url },
      ],
      meta: [
        // { hid: "global-description", name: "description", content: description },
        { property: "og:site_name", content: title },
        { hid: "global-og:type", property: "og:type", content: "website" },
        // { hid: "global-og:url", property: "og:url", content: url },
        // { hid: "global-og:image:secure_url", property: "og:image:secure_url", content: image },
        { hid: "global-og:title", property: "og:title", content: title },
        // { hid: "global-og:description", property: "og:description", content: description },
        // { hid: "global-og:image", property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        // { hid: "global-twitter:url", name: "twitter:url", content: url },
        { hid: "global-twitter:title", name: "twitter:title", content: title },
        // { hid: "global-twitter:description", name: "twitter:description", content: description },
        // { hid: "global-twitter:image", name: "twitter:image", content: image },
      ],
    },
  },

});
