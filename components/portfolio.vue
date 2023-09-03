<template>
  <v-app>
    <h1 class="mt-6 mb-1 text-center">Portfolio: </h1>
    <v-divider :thickness="4" inset color="error"></v-divider>

    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-card elevation="3">


            <v-carousel show-arrows="hover" height="300px" hide-delimiter-background cycle delimiter-icon="mdi-bird">
              <v-carousel-item src="portfolio/EST.png"></v-carousel-item>

              <v-carousel-item src="portfolio/NAIA.png"></v-carousel-item>
            </v-carousel>

            <v-card-title>WordPress and Vue 2 + BootstrapVue Project - <a href="https://engagecreative.ca/">Engage
                Creative</a>:</v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              BootstrapVue
              <v-tooltip activator="parent" location="top">With BootstrapVue you can build responsive, mobile-first, and
                ARIA accessible projects on the web using Vue.js </v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Vue.js
              <v-tooltip activator="parent" location="top">Vue.js is an open-source model–view–viewmodel front end
                JavaScript framework for building user interfaces and single-page applications.</v-tooltip>
            </v-btn>
            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              TypeScript
              <v-tooltip activator="parent" location="top">TypeScript is a free and open-source programming language
                developed by Microsoft that adds static typing with optional type annotations to JavaScript.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              CSS
              <v-tooltip activator="parent" location="top">CSS is the language we use to style an HTML document. CSS
                describes how HTML elements should be displayed.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              WordPress
              <v-tooltip activator="parent" location="top">
                WordPress is a web content management system.</v-tooltip>
            </v-btn>

            <v-card-text>East Coast Trail's <a href="https://eastcoasttrail.com/choose-a-path/">Choose a path page</a>,
              KML files with path info imported into Waymark.
              <a href="https://aquacultureportal.ca">NAIA</a> - Newfoundland Aquaculture Industry Association project,
              updated BootstrapVue and Vue 2 code to create a
              dynamic platform for efficient file management and display from Firebase. </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-card elevation="3">

            <v-carousel show-arrows="hover" height="300px" hide-delimiter-background cycle delimiter-icon="mdi-bird">
              <v-carousel-item src="portfolio/nlfdrogues-min.png"></v-carousel-item>

              <v-carousel-item src="portfolio/oceanicReleaf-min.png"></v-carousel-item>
            </v-carousel>

            <v-card-title>WordPress sites - <a href="https://gorobot.ca">Robot Interactive + Marketing</a>:
            </v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              WordPress
              <v-tooltip activator="parent" location="top">
                WordPress is a web content management system.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Divi Builder
              <v-tooltip activator="parent" location="top">
                Divi isn't just a WordPress theme, it's a complete design framework that allows you to design and
                customize every part of your website from the ground up.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              CSS
              <v-tooltip activator="parent" location="top">
                CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed.
              </v-tooltip>
            </v-btn>



            <v-card-text>Notable pages during my time at Robot. NFLD Rogues (Slide 1) - <a
                href="https://nfldrogues.ca/schedule/">Schedule page</a> and
              Oceanic's new <a href="https://staging.oceanicreleaf.ca/locations/">location page</a> (Slide 2).
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>

        <v-col cols="12" sm="6" md="6">

          <v-card elevation="3">
            <v-img src="portfolio/dvgui-min.png" height="300px"></v-img>
            <v-card-title>Data Visualization GUI - <a href="https://engagecreative.ca/">Engage
                Creative</a>:</v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Vue.js
              <v-tooltip activator="parent" location="top">Vue.js is an open-source model–view–viewmodel front end
                JavaScript framework for building user interfaces and single-page applications.</v-tooltip>
            </v-btn>
            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              TypeScript
              <v-tooltip activator="parent" location="top">TypeScript is a free and open-source programming language
                developed by Microsoft that adds static typing with optional type annotations to JavaScript.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              WebSocket
              <v-tooltip activator="parent" location="top">WebSocket is a computer communications protocol,
                providing full-duplex communication channels over a single TCP connection.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Vuetify
              <v-tooltip activator="parent" location="top">Vuetify is a UI Library with
                beautifully handcrafted Vue Components.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              CSS
              <v-tooltip activator="parent" location="top">CSS is the language we use to style an HTML document. CSS
                describes how HTML elements should be displayed.</v-tooltip>
            </v-btn>

            <v-card-text>Tasked to create a website from scratch accessing a JSON file sent over from the server using
              a WebSocket connection and parsing that data to be editable. Validated when saved, and with user input
              wherever possible.</v-card-text>
          </v-card>

        </v-col>

        <v-col cols="12" sm="6" md="6">

          <v-card elevation="3">
            <v-img src="/puffin.png" height="300px"></v-img>
            <v-card-title>This website:</v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Vue.js
              <v-tooltip activator="parent" location="top">Vue.js is an open-source model–view–viewmodel front end
                JavaScript framework for building user interfaces and single-page applications.</v-tooltip>
            </v-btn>
            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              TypeScript
              <v-tooltip activator="parent" location="top">TypeScript is a free and open-source programming language
                developed by Microsoft that adds static typing with optional type annotations to JavaScript.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Nuxt.js
              <v-tooltip activator="parent" location="top">Nuxt. js makes the routing system as easy as creating
                directories and files in the pages directory. It automatically generates a router file based on the files
                and folder structure of that directory.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Vuetify
              <v-tooltip activator="parent" location="top">Vuetify is a UI Library with
                beautifully handcrafted Vue Components.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              CSS
              <v-tooltip activator="parent" location="top">CSS is the language we use to style an HTML document. CSS
                describes how HTML elements should be displayed.</v-tooltip>
            </v-btn>

            <v-card-text>A fruition of what I learned during my time in my internship. Updated from time to time
              :)</v-card-text>
          </v-card>

        </v-col>



      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-card elevation="3">
            <v-img src="portfolio/oldWebsite.jpg" height="300px"></v-img>
            <v-card-title>Old portfolio website:</v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              HTML
              <v-tooltip activator="parent" location="top">The HyperText Markup Language or HTML is the standard markup
                language for documents designed to be displayed in a web browser.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              CSS
              <v-tooltip activator="parent" location="top">CSS is the language we use to style an HTML document. CSS
                describes how HTML elements should be displayed.</v-tooltip>
            </v-btn>

            <v-card-text>Goal here was to make a website to put things together from my portfolio and have a small taste
              at what HTML and CSS is like to code.</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-card elevation="3">

            <v-carousel show-arrows="hover" height="300px" hide-delimiter-background cycle delimiter-icon="mdi-bird">
              <v-carousel-item src="portfolio/pi.jpg"></v-carousel-item>

              <v-carousel-item src="portfolio/pi2.png"></v-carousel-item>
            </v-carousel>

            <v-card-title>Plant monitoring system: </v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Python
              <v-tooltip activator="parent" location="top">
                Python is a high-level, general-purpose programming language.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              PyMongo
              <v-tooltip activator="parent" location="top">
                PyMongo is a Python distribution containing tools for working with MongoDB.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              JavaScript
              <v-tooltip activator="parent" location="top">
                Programming language that is one of the core technologies of the World Wide Web, alongside HTML and
                CSS.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Express.js
              <v-tooltip activator="parent" location="top">
                It is a back end web application framework for building RESTful APIs with Node.js.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Node.js
              <v-tooltip activator="parent" location="top">
                Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS,
                and more.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              JavaScript
              <v-tooltip activator="parent" location="top">
                Programming language that is one of the core technologies of the World Wide Web, alongside HTML and
                CSS.</v-tooltip>
            </v-btn>

            <v-card-text>Setup around a Raspberry Pi Zero, using DHT11 sensor for the ambient temperature
              and YL-69 sensor for the soil moisture reading, these data will be fed into Mongo Atlas using
              PyMongo from the pi, the nodeJS based server side will extract the collection from MongoDB using
              mongoose and that will be sent off to the client (Another page added to this website) where the
              data was displayed on the graph and the past data can view on a table directly on the website.
              This was tested on a local host and stopped there.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Buttom row -->
      <v-row>
        <v-col cols="12" sm="6" md="6">

          <v-card elevation="3">

            <v-carousel show-arrows="hover" height="300px" hide-delimiter-background cycle delimiter-icon="mdi-bird">
              <v-carousel-item src="portfolio/DatabaseDemo.PNG"></v-carousel-item>

              <v-carousel-item src="portfolio/HomePageDemo.jpg"></v-carousel-item>
            </v-carousel>

            <v-card-title>Web course - Database Project:</v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              MongoDB
              <v-tooltip activator="parent" location="top">
                MongoDB is a source-available cross-platform document-oriented database program.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Express.js
              <v-tooltip activator="parent" location="top">
                It is a back end web application framework for building RESTful APIs with Node.js.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              Node.js
              <v-tooltip activator="parent" location="top">
                Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS,
                and more.</v-tooltip>
            </v-btn>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              JavaScript
              <v-tooltip activator="parent" location="top">
                Programming language that is one of the core technologies of the World Wide Web, alongside HTML and
                CSS.</v-tooltip>
            </v-btn>

            <v-card-text>This project was in a team of 2, where we decided to make a website using our plane crash
              dataset, which was imported into MongoDB atlas, where we accessed the dataset to ultimately be sent to the
              client (The website) and have a chart displaying stats, Google maps API used to pin locations on the map
              from location information from the dataset, display our dataset sorted by the fatalities or number aboard
              the plane on that crash, and all the corresponding code on the backend to run all that to display everything
              on the front end in a visually appealing way. Repository not allowed to share, screenshot
              below.</v-card-text>
          </v-card>

        </v-col>

        <v-col cols="12" sm="6" md="6">

          <v-card elevation="3">
            <v-carousel show-arrows="hover" height="300px" hide-delimiter-background cycle delimiter-icon="mdi-bird">
              <v-carousel-item src="portfolio/mal1.png"></v-carousel-item>

              <v-carousel-item src="portfolio/mal2.png"></v-carousel-item>

              <v-carousel-item src="portfolio/mal3.png"></v-carousel-item>
            </v-carousel>

            <v-card-title>Barricade Board Game Group Project:
            </v-card-title>

            <v-btn class="ma-2" rounded="lg" color="#D8FBFD">
              JAVA
              <v-tooltip activator="parent" location="top">Java is a high-level, class-based, object-oriented programming
                language that is designed to have as few implementation dependencies as possible.</v-tooltip>
            </v-btn>

            <v-card-text>Worked in a group project for a computer engineering course (CS2005) at my university (Memorial
              University of NL), teams were assigned to make a game of barricades (Malefiz) from scartch using Java. I
              helped with making the use case description and sequence diagram, making UI for a window and algorithm to
              move a pawn in the game. Was not allowed to share GitHub Repository.
            </v-card-text>
          </v-card>

        </v-col>

      </v-row>


    </v-container>
  </v-app>
</template>


<style scoped> .v-row {}
</style>