<script setup lang="ts">

const { path } = useRoute()
const pageTitle = computed(() => 'DO. IT Hackathon Photos!') // Replace with your logic
const description = computed(() => 'All the photos from three days can be found in the dropbox link. Enjoy!') // Replace with your logic
const ogImage = '/hackathon/oghack.webp' // Adjust as needed


useHead({
  title: pageTitle.value,
  meta: [
    { hid: 'description', name: 'description', content: description.value },
    { hid: 'og:title', property: 'og:title', content: pageTitle.value },
    { hid: 'og:description', property: 'og:description', content: description.value },
    { hid: 'og:image', property: 'og:image', content: `${process.env.BASE_URL}${ogImage}` },

    // Twitter card
    { hid: "twitter:title", name: "twitter:title", content: pageTitle.value },
    { hid: 'twitter:description', name: 'twitter:description', content: description.value },
    { hid: "twitter:image", name: "twitter:image", content: `${process.env.BASE_URL}${ogImage}` },
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

  <v-app>
    <v-parallax src="/banner.webp" alt="Parallax image of banner.">
      <v-container class="containerAbove mt-5">
        <v-row justify="center" align-content="center">

          <v-sheet class="pa-2 ma-2 translucent">
            <h1 align="center">The link to the event photos! </h1>
            <h3 class="pa-2 ma-2">Thank you for coming to the DO. IT Hackathon! 😃</h3>
          </v-sheet>

          <v-responsive width="100%"></v-responsive>
        </v-row>

        <v-row justify="center" align-content="center">

          <v-sheet class="pa-2 ma-2 translucent">
            <NuxtLink to="https://ecumene.github.io/dontoverthinkit/" target="_blank">
              <NuxtImg src="/hackathon/hackathonLogo.webp" 
                sizes="100vw sm:50vw md:400px placeholder " />
            </NuxtLink>
          </v-sheet>

        </v-row>

        <v-row justify="center" align-content="center" class="pa-2 ma-2">
          <h3>Dropbox <a href="https://www.dropbox.com/scl/fo/xphlg3zzl9yd2po9xo4ks/ADjwv9YN7RrzwT0V-4LKxLg?rlkey=n8gd09cwmknxnf7c34b25fgbg&st=rn0zeap6&dl=0" id="style-2" data-replace="link here" target="_blank" ><span>link here</span></a></h3>
        </v-row>

        <v-row justify="center" align-content="center" class="pa-2 ma-2">
          <NuxtLink to="/photography">

            <v-btn height="30" rounded="3" elevation="2" color="#D8FBFD" class=" ma-2 glow-effect "
              aria-label="Back to photography section">

              <svg class="glow-container">
                <rect pathLength="100" stroke-linecap="round" class="glow-blur"></rect>
                <rect pathLength="100" stroke-linecap="round" class="glow-line"></rect>
              </svg>

              Back To Photograpy

              <v-tooltip aria-label="What else is here?" activator="parent" location="top">Let's look at my
                photos</v-tooltip>

            </v-btn>
          </NuxtLink>
        </v-row>

      </v-container>
    </v-parallax>
  </v-app>
</template>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400);

* {

  font-family: Ubuntu;
}

.translucent {

  background: #fff1f176;
}

.containerAbove {
  background: #fff1f176;
  box-shadow: 0 1px 40px 0 rgba(0, 0, 0, 0.187);
  border-radius: 10px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  left: 0;
  right: 0;
  border-top: 5px solid #D8FBFD;

}


/*anchor tag*/
a {
  overflow: hidden;
  position: relative;
  display: inline-block;
}

a::before,
a::after {
  content: '';
  position: absolute;
  width: 100%;
  left: 0;
}

a::before {
  background-color: #b1fcff;
  height: 2px;
  bottom: 0;
  transform-origin: 100% 50%;
  transform: scaleX(0);
  transition: transform .3s cubic-bezier(0.76, 0, 0.24, 1);
}

a::after {
  content: attr(data-replace);
  height: 100%;
  top: 0;
  transform-origin: 100% 50%;
  transform: translate3d(200%, 0, 0);
  transition: transform .3s cubic-bezier(0.76, 0, 0.24, 1);
  color: #ff0000;
  font-style: italic;

}

a:hover::before {
  transform-origin: 0% 50%;
  transform: scaleX(1);
}

a:hover::after {
  transform: translate3d(0, 0, 0);
}

a span {
  display: inline-block;
  transition: transform .3s cubic-bezier(0.76, 0, 0.24, 1);
}

a:hover span {
  transform: translate3d(-200%, 0, 0);
}

/* Presentational Styles */

a {
  text-decoration: none;
  color: #000000;
  font-weight: 700;
  vertical-align: top;
}
</style>