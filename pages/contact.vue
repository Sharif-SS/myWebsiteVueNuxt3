<script lang="ts">
</script>

<template>
    <v-app>
       
      <v-container>
        <v-row no-gutters>
            <v-col cols="6">
              <v-sheet class="pa-6 ma-2">
                <v-img 
            
                align-center
                max-width="600"
                aspect-ratio="1/1"
                contain
                class="imgStyles "
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
                <v-sheet class="pa-2 ma-2">
    
                        <v-row>
                          <v-col >
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
  
  </v-app>
  </template>

  <style scoped>

  @media (max-width: 480px) {
    .mobileOnly {
      width: 300px;
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