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
            bio: "Website currently still being updated, from place holder images to lorem ipsums in places.",//" From discovering myself to discovering NL, looking forward to moving on the next thing, looking to build a career in the software development industry. I pride myself on the professional work I produce in my current and past workplaces. Always excited to meet new people who have similar interests, love learning from industry experts to add to my own experience and grow! ",
            skills: ["HTML","CSS","JavaScript","Typescript", "Vue.js", "Vuetify", "Node.js", "Python", "Wordpress", "Photoshop", "Divi"],
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
                    title: "Cooking all sort of software",
                },

                
            ] as Job[],
        };
    },
    
    
});
</script>


<template>
  <v-app>
    <v-parallax
    src="/banner.jpg"
  >
  <v-container
          class="d-flex justify-center align-center text-h5 "
          style="min-height: 300px;"
        >
    
    <v-row >
      
      <v-col cols="12" md="4"
      class="mobilePhotos ">

        <v-img 
        transition="fab-transition"
        class="imgStyles ml-1"
        
        
        
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
        <h2 class="topHeaders">{{ name }}</h2>
        <h4 class="topHeaders">{{ jobTitle }}</h4>
        <p class="bio topHeaders">{{ bio }}</p>
        
        <v-row class="pt-4 px-4">
          <v-col cols="12" sm="6">
            <v-card elevation="3">
              <v-card-title>Skills</v-card-title>
              <v-card-text class=" ">
                <ul class="a">
                  <li class="list" v-for="skill in skills" :key="skill" >{{ skill }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card elevation="3">
              <v-card-title>Experience</v-card-title>
              <v-card-text class="vCardText">
                <ul class="a">
                  <li class="list" v-for="job in jobs" :key="job.company">{{ job.title }} at {{ job.company }}</li>
                  <li class="list">Visit my linkedin for more info.</li>
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
</v-parallax>


</v-app>
</template>

<style scoped>

@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400);

* {

    font-family: Ubuntu;
}

.imgStyles {

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a drop shadow */
  max-width: 90%; /* Reduce the width of the image */
  border-radius: 1%;

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

  .topHeaders{
    text-align: center;
  }
}

.v-card-text {
  font-size: 1rem; /* The fit it all in one page */
  margin-left: 10px;
  
  
}

ul.a {
  list-style-type: "\1F427";
  
}

li.list {

  margin-top: 5px;
}


</style>

