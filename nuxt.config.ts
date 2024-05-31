import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "Photography and Software Projects by Sharif Sircar 🙋";
const shortTitle = "Sharif's portfolio Website";
const description = "Welcome to my portfolio! I merge photography with software projects, offering captivating visuals and innovative digital solutions. Explore the synergy of art and tech as I tell compelling stories and drive impactful results. Let's collaborate on something extraordinary."
// const image = "https://www.sharif-sircar.com/ogImage.jpg";
// const url = "https://www.sharif-sircar.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

  ssr: false,

  // import styles
  css: ["@/assets/main.scss"],
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },

  modules: [
    '@nuxt/image',
    "@kevinmarrec/nuxt-pwa",
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

      // title: "Sharif Sircar",
      // titleTemplate: "%s",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // { rel: "canonical", href: url },
      ],
      // meta: [
      //   // { hid: "global-description", name: "description", content: description },
      //   { property: "og:site_name", content: title },
      //   { hid: "global-og:type", property: "og:type", content: "website" },
      //   // { hid: "global-og:url", property: "og:url", content: url },
      //   // { hid: "global-og:image:secure_url", property: "og:image:secure_url", content: image },
      //   { hid: "global-og:title", property: "og:title", content: title },
      //   // { hid: "global-og:description", property: "og:description", content: description },
      //   // { hid: "global-og:image", property: "og:image", content: image },
      //   { name: "twitter:card", content: "summary_large_image" },
      //   // { hid: "global-twitter:url", name: "twitter:url", content: url },
      //   { hid: "global-twitter:title", name: "twitter:title", content: title },
      //   // { hid: "global-twitter:description", name: "twitter:description", content: description },
      //   // { hid: "global-twitter:image", name: "twitter:image", content: image },
      // ],
    },
  },

  // pwa: {
  //   meta: {
  //     name: shortTitle,
  //     author: "Sharif Sircar",
  //     theme_color: "#4f46e5",
  //     description: description,
  //   },
  //   manifest: {
  //     name: shortTitle,
  //     short_name: shortTitle,
  //     theme_color: "#4f46e5",
  //     description: description,
  //   },

  // },

});
