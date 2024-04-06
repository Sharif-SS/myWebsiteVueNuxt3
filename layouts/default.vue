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
		<v-app-bar location="top" app rounded color="#F8EDEB" height="50" elevation="5">
			<v-spacer></v-spacer>
			<v-app-bar-title>{{ title }}</v-app-bar-title>

			<v-spacer></v-spacer>


			<v-btn height="30" rounded="3" elevation="2" class="ma-0 desktopOnly"
				style="background-color: #D8FBFD; color: #000000;" href="/oldWebsite/index.html" target="_blank"
				aria-label="Button leads to my old website.">Old Website<v-tooltip
					aria-label="Shows additional text mentioning it being an archival." activator="parent"
					location="bottom">Archival of my old page</v-tooltip></v-btn>

			<v-btn height="30" rounded="3" elevation="2" class="ma-2" style="background-color: #D8FBFD; color: #000000;"
				href="https://youtu.be/dQw4w9WgXcQ"
				aria-label="Rick Roll button, says secret button as a little joke">

				Secret button <v-tooltip
					aria-label="Tooltip shows are you ready on hover, in a cheeky way" activator="parent"
					location="bottom">Are you ready???? :)</v-tooltip></v-btn>

			<v-btn class="mobileOnly glow-effect" style="background-color: #D8FBFD; color: #000000;" height="30" rounded="3"
				elevation="2" aria-label="Brings up navigation"
				@click.stop="drawer = !drawer">
				<svg class="glow-container">
					<rect pathLength="100" stroke-linecap="round" class="glow-blur"></rect>
					<rect pathLength="100" stroke-linecap="round" class="glow-line"></rect>
				  </svg>
				<v-icon>mdi-menu</v-icon>
			</v-btn>
		</v-app-bar>

		<div>
			<VApp>
				<VMain>
					<slot />
				</VMain>
			</VApp>
		</div>

		<v-footer aria-label="This is the footer bar of the page." app color="#F8EDEB" rounded height="40" elevation="5">
			<span>&copy; {{ new Date().getFullYear() }}</span>

			<v-btn height="30" rounded="3" elevation="2" color="#D8FBFD" class="ma-2"
				href="https://www.linkedin.com/in/sharif-sircar/" target="_blank" aria-label="Sharif's linkedin button">
				<v-icon>mdi-linkedin</v-icon>
				<v-tooltip aria-label="Tooltip shows linkedin on hover." activator="parent"
					location="top">Linkedin</v-tooltip>
			</v-btn>

			<v-btn height="30" rounded="3" elevation="2" color="#D8FBFD" class="ma-2" href="https://github.com/Sharif-SS"
				target="_blank" aria-label="Sharif's github button">
				<v-icon>mdi-github</v-icon>
				<v-tooltip aria-label="Tooltip shows github on hover." activator="parent" location="top">Github</v-tooltip>
			</v-btn>

			<v-btn height="30" rounded="3" elevation="2" color="#D8FBFD" class="ma-2"
				href="https://www.youtube.com/c/sharifsircar" target="_blank" aria-label="Sharif's youtube button">
				<v-icon>mdi-youtube</v-icon>
				<v-tooltip aria-label="Tooltip shows Youtube on hover." activator="parent"
					location="top">Youtube</v-tooltip>
			</v-btn>

		</v-footer>

		<!-- Nav Desktop -->
		<v-navigation-drawer aria-label="Left side navigation slider on hover"
			style="background: linear-gradient(rgba(253, 252, 252, 1), rgba(0, 0, 0, 0.0))" color="#fdfcfc" width="240"
			expand-on-hover rail app>
			<v-list>
				<v-list-item height="70" prepend-avatar="/puffin.png" href="/"
					aria-label="Clicking this takes you back to the homepage if already not there.">
					<v-btn height="30" rounded="3" elevation="2" class="ma-2" color="#D8FBFD">Home</v-btn>
				
				</v-list-item>

			</v-list>

			<v-list density="compact" nav>
				<NuxtLink v-for="(item, i) in items" :key="i" :to="item.to" exact>
					<v-list-item style="color: #000000;" :prepend-icon="item.icon"
						:aria-label="`Navigate to ${item.title}`">

						<v-list-item-content>
							<v-btn height="30" rounded="3" elevation="2" class="ma-2" color="#D8FBFD">{{ item.title
							}}</v-btn>
						</v-list-item-content>
					</v-list-item>

				</NuxtLink>
			</v-list>

		</v-navigation-drawer>

		<!-- Mobile Nav -->
		<v-navigation-drawer style="background: linear-gradient(to right, rgba(253, 252, 252, 1), rgba(0, 0, 0, 0.0))"
			color="#fdfcfc" app v-model="drawer" location="top" width="300" temporary>
			<v-list>
				<v-list-item prepend-avatar="/puffin.png" href="/">
					<v-btn class="ma-2" color="#D8FBFD">Home</v-btn>

				</v-list-item>

			</v-list>

			<v-list>
				<NuxtLink v-for="(item, i) in items" :key="i" :to="item.to" exact>
					<v-list-item style="color: #000000;" :prepend-icon="item.icon">
						<v-list-item-content>
							<v-btn class="ma-2" color="#D8FBFD">{{ item.title }}</v-btn>
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
