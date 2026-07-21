<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <v-app class="flex flex-col min-h-screen">
    <LayoutSiteHeader @toggle-nav="drawer = !drawer" />
    <LayoutSiteNav v-model="drawer" />
    <main class="pt-[50px] flex-1">
      <slot />
    </main>
    <LayoutSiteFooter />
    <UiCursorFollower />
  </v-app>
</template>
