<script lang="ts">
import Portfolio from '@/components/portfolio.vue';

import { defineComponent} from 'vue';


interface Job {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
}

export default defineComponent({
    name: "AboutMe",
    data() {
        return {
            profilePicture: "/profilePhoto.jpg",
            lazyPicture: "/profilePhotoLazyLoad.jpg",
            name: "Sharif Sircar",
            jobTitle: "Junior Software Developer",
            bio: "Website currently still being updated, from place holder images to lorem ipsums in places. From discovering myself to discovering NL, looking forward to moving on the next thing, looking to build a career in the software development industry. I pride myself on the professional work I produce in my current and past workplaces. Always excited to meet new people who have similar interests, love learning from industry experts to add to my own experience and grow! ",
            skills: ["JavaScript", "Vue.js", "Node.js", "HTML", "CSS", "Python", "Wordpress", "Divi"],
            jobs: [
                {
                    company: "Robot Interactive.",
                    title: "Junior Software Developer",
                },
                {
                    company: "Memorial University of NL.",
                    title: "Project Assistant",
                },
                {
                    company: "Multiple Resturants :)",
                    title: "Not Cooking software",
                },
            ] as Job[],
        };
    },
    
    
});
</script>


<template>
  <v-app>

  <v-container
          class="d-flex justify-center align-center text-h5"
          style="min-height: 300px;"
        >
    
    <v-row>
      
      <v-col cols="12" md="4">

        <v-img 
        class="mobilePhotos imgStyles"
        
        aspect-ratio="4/3"
        
        :src="profilePicture" 
        :lazy-src="lazyPicture"
        >


        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>

        </v-img>

      </v-col>

      <v-col cols="12" md="8">
        <h2>{{ name }}</h2>
        <h4>{{ jobTitle }}</h4>
        <p class="bio">{{ bio }}</p>
        
        <v-row>
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-title>Skills</v-card-title>
              <v-card-text class="vCardText">
                <ul>
                  <li v-for="skill in skills" :key="skill">{{ skill }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-title>Experience</v-card-title>
              <v-card-text class="vCardText">
                <ul>
                  <li v-for="job in jobs" :key="job.company">{{ job.title }} at {{ job.company }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

       <!-- Mid page -->
       <Portfolio/>
      
      </v-row>
  </v-container>



</v-app>
</template>

<style>

@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400);

* {

    font-family: Ubuntu;
}

.imgStyles {

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a drop shadow */
  max-width: 90%; /* Reduce the width of the image */
}

/* Styles for mobile devices */
@media (max-width: 959px) {
  .mobilePhotos {
    max-width: 45%; /* Reduce the width of the image */
    display: block; /* Make the image a block element */
    margin: 0 auto; /* Center the image horizontally */
  }
  .bio {
    font-size: 1.0rem; /* The fit it all in one page */

  }
}

.vCardText {
  font-size: 1rem; /* The fit it all in one page */

}
</style>

