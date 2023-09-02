<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'DefaultLayout',

  setup() {
    const title = ref('')
    const drawer = ref(false)
    
    const items = [
    //   {
    //     icon: 'mdi-home-flood',
    //     title: 'Home',
    //     to: '/',
       
    //   },
      {
        icon: 'mdi-camera-iris',
        title: 'Photography',
        to: '/photography',
        
      },

	  {
        icon: 'mdi-robot-happy',
        title: 'Portfolio',
        to: '/portfolio',
        
      },

      {
        icon: 'mdi-email',
        title: 'Contact Me',
        to: '/contact',
        
      },
    ]

    return { drawer, items, title }
  },
})
</script>


<template>
	<v-app>
		<v-app-bar
		location="top"
		app
		rounded
		color="#E0D1C8"

		height="50"    
  		elevation="5" 
		>
			<v-spacer></v-spacer>
			<v-app-bar-title>{{title}}</v-app-bar-title>
  
			<v-spacer></v-spacer>
			

			<v-btn
			height="30"   
			rounded="3"
			elevation="2"
			class="ma-0 desktopOnly"
			style="background-color: #D8FBFD; color: #000000;"
			href="/oldWebsite/index.html" target="_blank"
		  >Old Website<v-tooltip
            
		  activator="parent"
		  location="bottom"
		>Archival of my old page</v-tooltip></v-btn>
		  
		  <v-btn
		  
		  height="30"   
		  rounded="3"
		  elevation="2"
			class="ma-2"
			style="background-color: #D8FBFD; color: #000000;"
			href="https://youtu.be/dQw4w9WgXcQ"
		  >Secret button <v-tooltip
            
		  activator="parent"
		  location="bottom"
		>Are you ready???? :)</v-tooltip></v-btn>
		  
		  <v-btn 
		  class="mobileOnly"
		  style="background-color: #D8FBFD; color: #000000;"
		  height="30"   
		  rounded="3"
		  elevation="2"
			@click.stop="drawer = !drawer"
			
			>Nav<v-icon>mdi-hamburger</v-icon>
		  </v-btn>
		</v-app-bar>

		<div>
			<VApp>
				<VMain>
					<slot />
				</VMain>
			</VApp>
		</div>
		
		  <v-footer 
		  app
		  color="#E0D1C8"
		  rounded
		  height="40"    
  		elevation="5" 
		  >
			<span>&copy; {{ new Date().getFullYear() }}</span>
			
			<v-btn
			height="30"   
			rounded="3"
			elevation="2"
			color="#D8FBFD" 
			class="ma-2"
			href="https://www.linkedin.com/in/sharif-sircar/" target="_blank"
			>
			<v-icon>mdi-linkedin</v-icon>
			<v-tooltip
            
              activator="parent"
              location="top"
            >Linkedin</v-tooltip>
		  </v-btn>
  
			<v-btn
			height="30"   
			rounded="3"
			elevation="2"
			color="#D8FBFD" 
			class="ma-2"
			href="https://github.com/Sharif-SS" target="_blank"
			>
			<v-icon>mdi-github</v-icon>
			<v-tooltip
            
              activator="parent"
              location="top"
            >Github</v-tooltip>
		  </v-btn>
  
			<v-btn
			height="30"   
			rounded="3"
			elevation="2"
			color="#D8FBFD" 
			class="ma-2"
			href="https://www.youtube.com/c/sharifsircar" target="_blank"
			>
			<v-icon>mdi-youtube</v-icon>
			<v-tooltip
            
			activator="parent"
			location="top"
		  >Youtube</v-tooltip>
		  </v-btn>
  
		  </v-footer>

		<!-- Nav Desktop -->
		  <v-navigation-drawer
		  style="background: linear-gradient(rgba(253, 252, 252, 1), rgba(0, 0, 0, 0.0))"
		  color="#fdfcfc"
		  width="240"
		  expand-on-hover
		  rail
		  app
		>
		  <v-list>
			<v-list-item
			  prepend-avatar="/puffin.png"  
			  href="/"
			></v-list-item>

		  </v-list>
  
		  <v-list density="compact" nav>
			<NuxtLink v-for="(item, i) in items" :key="i" :to="item.to" exact>
				<v-list-item
				style="color: #000000;"
				:prepend-icon="item.icon">
				
				  <v-list-item-content>
					  <v-btn height="30" rounded="3" elevation="2" 
					  class="ma-2" color="#D8FBFD" >{{ item.title }}</v-btn>
				  </v-list-item-content>
				</v-list-item>
  
			  </NuxtLink>
		  </v-list>

		</v-navigation-drawer>

		  <!-- Mobile Nav -->
		  <v-navigation-drawer 
		  
		  style="background: linear-gradient(to right, rgba(253, 252, 252, 1), rgba(0, 0, 0, 0.0))"
		
		  color="#fdfcfc"
			app
			v-model="drawer"
			location="bottom"
			temporary
		  >
		  <v-list-item
		  class="mt-1"
		  prepend-avatar="/puffin.png"  
		></v-list-item>
  
		  <v-list>
			<NuxtLink v-for="(item, i) in items" :key="i" :to="item.to" exact>
			  <v-list-item
			  style="color: #000000;"
			  :prepend-icon="item.icon">
				<v-list-item-content>
					<v-btn class="ma-2" color="#D8FBFD" >{{ item.title }}</v-btn>
				</v-list-item-content>
			  </v-list-item>

			</NuxtLink>
		  </v-list>
		  </v-navigation-drawer>
  
  

  

	</v-app>



	
</template>

<style scoped>

@media (max-width: 480px) {
  .desktopOnly {
    display: none;
  }
}

@media (min-width: 1280px) {
	.mobileOnly {
	  display: none;
	}
  }
  
</style>
