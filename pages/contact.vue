<template>
  <v-app>
    <v-parallax src="/banner.webp" alt="Parallax image of banner.">
      <v-container class="form mt-5">
        <v-row no-gutters>

          <v-col cols="12" md="5" class="mobileOnly" justify="center" align-self="center">

            <v-img cover alt="An image of Sharif in an old telephone booth." transition="fab-transition"
              class="imgStyles mobilePhotos" src="/contact.jpg" lazy-src="/contactLazyLoad.jpg">

              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>

            </v-img>
          </v-col>

          <v-col>
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

            <div class="content">
              <form name="contact" action="/thank-you" netlify-honeypot="bot-field" method="post" netlify>

                <h2 class="pageTitle title">Contact Me</h2>

                <input type="hidden" name="form-name" value="contact" />
                <p class="hidden">
                  <label>Don't add anything here <input name="bot-field"></label>
                </p>

                <input type="text" placeholder="Name" class=" name formEntry" name="name" id="name" label="Name" />

                <input type="text" class="form-field  email formEntry" name="email" id="email" label="Email"
                  placeholder="Email" />

                <textarea class="form-field message formEntry" name="message" id="message" label="Message"
                  placeholder="Message"></textarea>

                <v-btn color="#D8FBFD" class="form-button formEntry glow-effect .submit" rounded="3" elevation="2"
                  type="submit" aria-label="This button sends the form.">Send
                  message</v-btn>

              </form>
            </div>
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

/*
@media (max-width: 480px) {
  .mobileOnly {
    width: 20px;
  }
}
*/

.imgStyles {
  box-shadow: 3px 3px 5px rgb(0, 0, 0);
  /* Add a drop shadow */
  border-radius: 2%;
  margin-left: 8%;
  margin-top: 5%;
  margin-bottom: 5%;
  max-height: 75vh;
}


/* Styles for mobile devices */
@media (max-width: 959px) {
  .mobilePhotos {
    display: none;
  }
}

@media (min-width: 959px) {
  .mobilePhotos {}
}


.form-button {
  margin-top: 16px;
}

.hidden {
  display: none;
}


/* form animation starts */
/* All custom effects are here */

.form {
  background: #fff1f176;
  box-shadow: 0 1px 40px 0 rgba(0, 0, 0, 0.187);
  border-radius: 10px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  left: 0;
  right: 0;
  position: absolute;
  border-top: 5px solid #D8FBFD;
  /*   z-index: 1; */
  animation: bounce 2.5s infinite;
}

::-webkit-input-placeholder {
  font-size: 1.3rem;
}

.title {
  display: block;
  margin: 10px auto 5px;
  width: 80%;
}


.pageTitle {
  font-size: 2em;
  font-weight: bold;
}

.name {
  background-color: #ebebeb;
  height: 2rem;
}

.name:hover {
  border-bottom: 5px solid #D8FBFD;
  height: 3rem;
  border-radius: 10px;
  transition: ease 0.8s;
}

.email {
  background-color: #ebebeb;
  height: 2rem;
}

.email:hover {
  border-bottom: 5px solid #D8FBFD;
  height: 3rem;
  border-radius: 10px;
  transition: ease 0.8s;
}

.message {
  background-color: #ebebeb;
  overflow: hidden;
  height: 10rem;


}

.message:hover {
  border-bottom: 5px solid #D8FBFD;
  height: 12em;
  transition: ease 0.8s;
  border-radius: 10px;

}

.formEntry {
  display: block;
  margin: 30px auto;
  min-width: 80%;
  padding: 10px;
  border-radius: 2px;
  border: none;
  transition: all 0.5s ease 0s;
}

@keyframes bounce {
  0% {
    tranform: translate(0, 4px);
  }

  50% {
    transform: translate(0, 8px);
  }
}
</style>