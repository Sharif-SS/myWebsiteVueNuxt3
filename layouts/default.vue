<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <v-app>
    <LayoutSiteHeader @toggle-nav="drawer = !drawer" />
    <LayoutSiteNav v-model="drawer" />
    <main class="pt-[50px] pb-[40px] min-h-screen">
      <slot />
    </main>
    <LayoutSiteFooter />
  </v-app>
</template>
