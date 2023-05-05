
<template>
    <v-app>
      <v-parallax
      src="/banner.jpg"
    >
      <v-container>
        <v-row no-gutters>
            <v-col cols="12" md="4"
            class="mobileOnly">
              <v-sheet class="pa-6 ma-2">
                
                <v-img 
                
                class="imgStyles mobilePhotos"
                src="/contact.jpg" 
                lazy-src="/contactLazyLoad.jpg"
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

              </v-sheet>
            </v-col>
            <v-col >
                <v-sheet class="pa-2 ma-2 mt-12 rounded-lg" elevation="3">
                        <v-row>
                          <v-col >

                  <!-- dummy so netlify knows what's coming -->
                    <!-- <div class="container">
                      <h1 class="title">
                        Contact
                      </h1>
                      <div class="content">
                        
                    <form name="contact" action="/thank-you" netlify-honeypot="bot-field" method="post" netlify>
                          <input type="hidden" name="form-name" value="contact" />
                          <p class="hidden">     
                            <label>Don’t fill this out: <input name="bot-field"></label>   
                          </p>
                          <label class="form-label" for="name">
                            Name:
                          </label>
                          <input class="form-field" name="name" id="name" />
                          <label class="form-label" for="email">
                            Email:
                          </label>
                          <input class="form-field" name="email" id="email" />
                          <label class="form-label" for="message">
                            Message:
                          </label>
                          <textarea class="form-field" name="message" id="message"></textarea>
                          <input class="form-button" type="submit" value="Send message" />
                        </form>
                      </div>
                    </div> -->

                            <h2>
                              Contact Me
                            </h2>
                          </v-col>
                        </v-row>
                        <v-row >
                          <v-col  >
                            <div class="content">
                              <form name="contact" action="/thank-you" netlify-honeypot="bot-field" method="post" netlify>
                                <input type="hidden" name="form-name" value="contact" />
                                <p class="hidden">
                                  <label>Don't add anything here <input name="bot-field"></label>
                                </p>
                                <v-text-field class="form-field" name="name" id="name" label="Name"></v-text-field>
                                <v-text-field class="form-field" name="email" id="email" label="Email"></v-text-field>
                                <v-textarea class="form-field" name="message" id="message" label="Message"></v-textarea>
                                <v-btn color="#D8FBFD" class="form-button" type="submit">Send message</v-btn>
                              </form>
                            </div>
                          </v-col>
                        </v-row>
    
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

  @media (max-width: 480px) {
    .mobileOnly {
      width: 20px;
    }
  }
  
 .imgStyles {

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a drop shadow */
  max-width: 90%; /* Reduce the width of the image */
  border-radius: 1%;
  
  
}

.v-sheet {

  
  
  
}

/* Styles for mobile devices */
@media (max-width: 959px) {
  .mobilePhotos {
    max-width: 50%; /* Reduce the width of the image */
    display: block; /* Make the image a block element */
    margin: 0 auto; /* Center the image horizontally */
  }
}

  .content {
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }

  .form-field {
    margin-bottom: 16px;
  }

  .form-button {
    margin-top: 16px;
  }

  .hidden {
    display: none;
  }
</style>