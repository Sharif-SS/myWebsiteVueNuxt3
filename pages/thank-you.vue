<template>
  <v-app>
    <v-parallax src="/banner.webp" alt="Parallax image of banner.">
      <v-container class="containerAbove mt-5">
        <v-row justify="center" align-content="center">

          <v-sheet class="pa-2 ma-2 translucent">
            <h1 align="center">Thank you! 😃</h1>
            <h3>We will talk soon, in the meantime, here is an old video from 2007.</h3>
          </v-sheet>

          <v-responsive width="100%"></v-responsive>
        </v-row>

        <v-row justify="center" align-content="center">

          <v-sheet class="pa-2 ma-2">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/Qit3ALTelOo"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </v-sheet>

        </v-row>

        <v-row justify="center" align-content="center" class="pa-2 ma-2">

          <NuxtLink to="/">
          <v-btn height="30" rounded="3" elevation="2" color="#D8FBFD" class=" ma-2 glow-effect "
            aria-label="Back to homepage">
            <svg class="glow-container">
              <rect pathLength="100" stroke-linecap="round" class="glow-blur"></rect>
              <rect pathLength="100" stroke-linecap="round" class="glow-line"></rect>
            </svg>
            Back Home
            <v-tooltip aria-label="What else is here?" activator="parent" location="top">What else is on my
              website?</v-tooltip>
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
</style>