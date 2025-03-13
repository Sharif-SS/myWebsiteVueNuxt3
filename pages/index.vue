<script setup lang="ts">

const description = 'I am on a continuous journey of self-improvement, always seeking to learn, refine, and build. Whether it is new skills, creative projects, or innovative solutions. My curiosity drives me to explore different disciplines, connect ideas, and help others navigate challenges. Explore my photography while you are here! :).';
const ogImage = '/ogImage.jpg';

useHead({
  title: "Sharif's Homepage",
  meta: [
    { hid: 'og:url', property: 'og:url', content: 'https://www.sharif-sircar.com' },
    { hid: 'og:site_name', property: 'og:site_name', content: "Sharif Sircar's Website" },
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:image', property: 'og:image', content: `https://www.sharif-sircar.com${ogImage}` },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    { hid: 'twitter:image', name: 'twitter:image', content: `https://www.sharif-sircar.com${ogImage}` },
  ],
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: 'https://www.sharif-sircar.com/',
    },
  ],
});

const name = 'Sharif Sircar';
const jobTitle = 'Exploring Growth, Learning, and Innovation';
const bio = 'I am on a continuous journey of self-improvement, always seeking to learn, refine, and build. Whether it is new skills, creative projects, or innovative solutions. My curiosity drives me to explore different disciplines, connect ideas, and help others navigate challenges. Explore my photography while you are here! :)';
const skills = ['Training & Support', 'Reporting', 'Data Analysis', 'Documentation',  'CRM Systems', 'CMS Systems', 'Event Photography', 'Photoshop', 'Google Tag Manager', 'Google Analytics', 'Storytelling','Mistakes' ];
const jobs = [
  {
    company: 'The Leap Method (Carol Bartlett)',
    title: 'Web Development Consultant',
  },
  {
    company: 'Robot Interactive.',
    title: 'Junior Software Developer',
  },
  {
    company: 'Memorial University of NL.',
    title: 'Project Assistant',
  },
];
</script>

<template>
  <v-app>
    <v-parallax src="/banner.webp" alt="Parallax image of banner.">
      <v-container justify="center" class="d-flex text-h5 ">
        <v-row justify="center" class="d-flex justify-center">
          <v-col cols="12">
            <h2 class="mt-5 text-center">{{ name }}</h2>
          </v-col>
          <v-col cols="12">
            <h4 class="text-center">{{ jobTitle }} 
              <NuxtLink to="/photography">
                <v-btn height="30" rounded="3" elevation="2" color="#D8FBFD" class="ma-2 glow-effect"
                  aria-label="Sharif's photography shortcut button">
                  <svg class="glow-container">
                    <rect pathLength="100" stroke-linecap="round" class="glow-blur"></rect>
                    <rect pathLength="100" stroke-linecap="round" class="glow-line"></rect>
                  </svg>
                  To photography section
                  <v-tooltip aria-label="Tooltip shows link to photography page on hover." activator="parent"
                    location="top">Takes you to photography section :)</v-tooltip>
                </v-btn>
              </NuxtLink>
            </h4>
          </v-col>
          <p class="bio text-center ">{{ bio }}</p>

          <v-row justify="center">
            <div class="container">

              <v-col cols="12" sm="6">

                <div class="box">
                  <span></span>
                  <div class="content">
                    <h2>Experience</h2>
                    <ul class="a">
                      <li class="list" v-for="job in jobs" :key="job.company">{{ job.title }} at {{ job.company }}</li>
                      <li class="list"> <a href="https://www.linkedin.com/in/sharif-sircar/">Visit my linkedin for
                          more!</a> </li>
                    </ul>
                  </div>
                </div>

              </v-col>

              <v-col justify="center" cols="12" sm="6">

                <div class="box">
                  <span></span>
                  <div class="content">
                    <h2>Skill Stack</h2>
                    <ul class="a two-column">
                      <li class="list" v-for="skill in skills" :key="skill">{{ skill }}</li>
                    </ul>
                  </div>
                </div>

              </v-col>

            </div>
          </v-row>
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


  .bio {
    font-size: 1.5rem;
    /* The fit it all in one page */
    max-width: 70%;
  }


  .two-column {
    column-count: 2;
    column-gap: 1rem;
    /* Adjust the gap between columns as needed */
  }
}

/* Styles for mobile devices */
@media (max-width: 959px) {

  .bio {
    font-size: 1.0rem;
    /* The fit it all in one page */
    margin-left: 4%;
    margin-right: 4%;
  }
}

.v-card-text {
  font-size: 1rem;
  /* The fit it all in one page */
  margin-left: 10px;


}

.two-column {
  column-count: 2;
  column-gap: 1rem;
  /* Adjust the gap between columns as needed */
}

ul.a {
  list-style-type: "\1F427";

}

li.list {

  margin-top: 5px;
}

/* test code */




.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 0;
}

.container .box {
  position: relative;
  /* width: 320px;*/
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px;
  transition: 0.5s;
}

.container .box::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  text-decoration: none;
  background: #ffffff;
  border-radius: 8px;
  transform: skewX(25deg);
  transition: 0.5s;
}

.container .box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
  filter: blur(30px);
}

.container .box:hover:before,
.container .box:hover:after {
  transform: skewX(0deg);
  left: 20px;
  width: calc(100% - 90px);

}

.container .box:nth-child(1):before,
.container .box:nth-child(1):after {
  background: linear-gradient(315deg, #ffc0c0, #d8fbfd)
}

.container .box:nth-child(2):before,
.container .box:nth-child(2):after {
  background: linear-gradient(315deg, #ffc0c0, #d8fbfd)
}

.container .box span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.container .box span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.1spx);
  opacity: 0;
  transition: 0.1s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.211)
}

.container .box:hover span::before {
  top: -50px;
  left: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
}

.container .box span::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.033);
  backdrop-filter: blur(0px);
  opacity: 0;
  transition: 0.5s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.275);
  animation-delay: -2s;
}

.container .box:hover span:after {
  bottom: -50px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
}

@keyframes animate {

  0%,
  100% {
    transform: translateY(10px);
  }

  50% {
    transform: translate(-10px);
  }
}

.container .box .content {
  position: relative;
  left: 0;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
  transform: 0.5s;
  color: #000000;
  font-size: 1rem;
}

.container .box:hover .content {
  /* left: -25px;*/
  padding: 60px 40px;
}

.container .box .content h2 {
  font-size: 1.2rem;
  color: #000000;
  margin-bottom: 10px;
}

.container .box .content p {
  font-size: 1rem;
  margin-bottom: 10px;
  line-height: 1.4em;
}

.container .box .content a {
  display: inline-block;
  font-size: 1rem;
  color: #111;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  margin-top: 5px;
}

.container .box .content a:hover {
  background: #d8fbfd;
  /*border: 1px solid rgba(255, 0, 88, 0.4);*/
  box-shadow: 0 1px 15px rgba(1, 1, 1, 0.2);

}
</style>
