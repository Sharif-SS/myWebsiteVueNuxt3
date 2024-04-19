<template>
  <v-app>
    <v-parallax src="/banner.jpg" alt="Parallax image of banner.">
      <v-container >
        <v-row justify="center" align-content="center">

          <v-sheet class="pa-2 ma-2">
            <h1 align="center">Thank you! 😃</h1>
            <h3>We will talk soon, in the meantime, here is an ancient video from 2007.</h3>
          </v-sheet>

          <v-responsive width="100%"></v-responsive>
        </v-row>

        <v-row justify="center" align-content="center">

          <v-sheet class="pa-2 ma-2">
            <iframe width="320" height="315" src="https://www.youtube.com/embed/Qit3ALTelOo"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </v-sheet>

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
</style>