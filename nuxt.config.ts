import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "Sharif Sircar";
const shortTitle = "Sharif's Website";
const description = "Welcome to my personal portfolio website, where I combine my passion for photography with my love for software projects. Explore my creative journey through captivating images and innovative digital endeavors."
const image = "https://www.sharif-sircar.com/puffinv2.ico";
const url = "https://www.sharif-sircar.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

  ssr: false,

  // import styles
  css: ["@/assets/main.scss"],
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  modules: [
   
    "@kevinmarrec/nuxt-pwa",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },

  ],

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

      title: "Sharif Sircar",
      titleTemplate: "%s",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/puffinv2.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },

  pwa: {
    meta: {
      name: shortTitle,
      author: "Sharif Sircar",
      theme_color: "#4f46e5",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#4f46e5",
      description: description,
    },

  },
  
});
