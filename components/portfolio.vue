<template>
<v-app>
  <v-container fluid>
    
    <v-row>
      <v-col cols="12" sm="6" md="6">
        
        <v-card elevation="3">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
            ></v-img>
          <v-card-title>This website:</v-card-title>
          <v-card-text>Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus.</v-card-text>
        </v-card>

      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-card elevation="3">
          <v-img
            src="portfolio/oldWebsite.png"
            height="300px"
            cover
            ></v-img>
          <v-card-title>Old portfolio website:</v-card-title>
          <v-card-text>Goal here was to make a website to put things together from my portfolio and have a small taste at what HTML and CSS is like to code. Still being updated, planning to add javascript elements too. Repository on GitHub.</v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="6">
        
        <v-card elevation="3">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
            ></v-img>
          <v-card-title>Barricade Board Game Group Project:
          </v-card-title>
          <v-card-text>Worked in a group project for a computer engineering course (CS2005) at my university (Memorial University of NL), teams were assigned to make a game of barricades (Malefiz) from scartch using Java. I helped with making the use case description and sequence diagram, making UI for a window and algorithm to move a pawn in the game. Was not allowed to share GitHub Repository.
          </v-card-text>
        </v-card>

      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-card elevation="3">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
            ></v-img>
          <v-card-title>Plant monitoring system: </v-card-title>
          <v-card-text>Setup around a Raspberry Pi Zero, using DHT11 sensor for the ambient temperature and YL-69 sensor for the soil moisture reading, these data will be fed into Mongo Atlas using PyMongo from the pi, the nodeJS based server side will extract the collection from MongoDB using mongoose and that will be sent off to the client (Another page added to this website) where the data will be on graph and the past data can view on a table directly on the website. Currently in the lookout for a Raspberry pi 3 to replace my zero and resume my project, most of the backend and frontend work is done. Can be seen on my repository on GitHub (Currently in progress).
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="6">
        
        <v-card elevation="3">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
            ></v-img>
          <v-card-title>Web Programming Database Project:</v-card-title>
          <v-card-text>This project was in a team of 2, where we decided to make a website using our plane crash dataset, which was imported into MongoDB atlas, where we accessed the dataset to ultimately be sent to the client (The website) and have a chart displaying stats, Google maps API used to pin locations on the map from location information from the dataset, display our dataset sorted by the fatalities or number aboard the plane on that crash, and all the corresponding code on the backend to run all that to display everything on the front end in a visually appealing way. Repository not allowed to share, screenshot below.</v-card-text>
        </v-card>

      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-card elevation="3">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
            ></v-img>
          <v-card-title>Tittle </v-card-title>
          <v-card-text> Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. </v-card-text>
          
        </v-card>
      </v-col>

    </v-row>

  
  </v-container>
</v-app>
</template>


