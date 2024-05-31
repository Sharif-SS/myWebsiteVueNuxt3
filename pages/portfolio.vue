<script setup lang="ts">
import Portfolio from '@/components/portfolio.vue';


const { path } = useRoute()
const pageTitle = 'Web Development Portfolio' // Replace with your logic
const description = 'A collection of projects I worked on over the years. 🧑‍💻' // Replace with your logic
// const ogImage = '/hackathon/oghack.webp'



useHead({
  title: pageTitle,


  meta: [

    { hid: 'og:url', property: "og:url", content: `https://www.sharif-sircar.com${path}` },
    { hid: 'og:site_name', property: "og:site_name", content: "Sharif Sircar's Website" },
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:title', property: 'og:title', content: pageTitle },
    { hid: 'og:description', property: 'og:description', content: description },
    // { hid: 'og:image', property: 'og:image', content: `https://www.sharif-sircar.com${ogImage}` },

    // Twitter card
    { hid: "twitter:title", name: "twitter:title", content: pageTitle },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    // { hid: "twitter:image", name: "twitter:image", content: `https://www.sharif-sircar.com${ogImage}` },
  ],
  link: [
    {
      key: "canonical",
      rel: 'canonical',
      href: `https://www.sharif-sircar.com${path}`,
    },
  ],
})
</script>

<template>
  <VApp>
<VMain>
 <Portfolio class="desktop-left-padding"/>
</VMain>

  </VApp>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400);

* {

    font-family: Ubuntu;
}

/* CSS for screens with a width less than 768px */
@media (min-width: 959px) {
  .desktop-left-padding {
    margin-left: 4%;
  }
}
</style>



