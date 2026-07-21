<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <LayoutSiteHeader @toggle-nav="drawer = !drawer" />
    <LayoutSiteNav v-model="drawer" />
    <main class="pt-[50px] flex-1">
      <slot />
    </main>
    <LayoutSiteFooter />
    <UiCursorFollower />
  </div>
</template>
