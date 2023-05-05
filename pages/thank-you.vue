<template>
    <v-app>
      <v-parallax
      src="/banner.jpg"
    >
      <v-container >
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <h1>Thank you! =)</h1>
              <h3>Here is an ancient video from 2007~</h3>
              
            </v-sheet>
          </v-col>

    
          <v-responsive width="100%"></v-responsive>
    
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <iframe width="320" height="315" src="https://www.youtube.com/embed/Qit3ALTelOo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </v-sheet>
          </v-col>
    
 
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