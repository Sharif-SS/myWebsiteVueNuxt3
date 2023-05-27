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
            bio: "Embarking on a journey of self-discovery and improvement, I am eagerly anticipating what lies ahead. I am determined to continue building a successful career in the software development industry and take great pride in the high-quality work I have produced in my past and current positions. I relish the opportunity to connect with like-minded individuals who share my passion for this field and welcome the chance to learn from industry experts to expand my knowledge and expertise.",
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
      
      <!-- image -->
      <v-col cols="12" md="4"
      class=" d-flex align-center justify-center pt-0">

        <v-img 
        transition="fab-transition"
        class="imgStyles ml-1 mobilePhotos"
        height="792"
        
        contain
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

      <!--text beside image -->
      <v-col cols="12" md="8" class="topRowChunk pt-12">
        <h2 class="topHeaders">{{ name }}</h2>
        <h4 class="topHeaders jobTitle">{{ jobTitle }}</h4>
        <p class="bio topHeaders ">{{ bio }}</p>
        
       
        <v-row class="pt-10 px-4 skillExp">

          <v-col class="skillCard" cols="12" sm="6">
            <v-card elevation="3">
              <v-card-title>Skills</v-card-title>
              <v-divider :thickness="4" color="error"></v-divider>
              <v-card-text class="two-column ">
                <ul class="a">
                  <li class="list" v-for="skill in skills" :key="skill" >{{ skill }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col class="experienceCard" cols="12" sm="6">
            <v-card elevation="3">
              <v-card-title>Experience</v-card-title>
              <v-divider :thickness="4" color="error"></v-divider>
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

.v-divider {
  margin-left: 2%;
  margin-right: 2%;
  opacity: 10%;

}

/* Styles for large devices */
@media (min-width: 959px) {

  .imgStyles {

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a drop shadow */
    max-height: 90%; /* Reduce the width of the image */
    border-radius: 1%;
    /*margin-top: 10%;*/
    
  }

  .individualChunk{
    padding-top: 5%;
  }

  .jobTitle {

    padding-top: 1.5%;
  }

  .bio {
    padding-top: 3%;
    font-size: 1.2rem; /* The fit it all in one page */
  }

  .skillExp {
    
  }

  .two-column {
    column-count: 2;
    column-gap: 1rem; /* Adjust the gap between columns as needed */
  }

  .skillCard{
    padding-right: 2rem;
  }
}



/* Styles for mobile devices */
@media (max-width: 959px) {
  .mobilePhotos {
    max-width: 50%; /* Reduce the width of the image */
    display: none; /* Make the image a block element */

  }


  .bio {
    font-size: 1.0rem; /* The fit it all in one page */
    margin-left: 2%;
    margin-right: 2%;

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

