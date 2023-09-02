<script setup lang="ts">
import ImageGallary from '@/components/imageGallary.vue';


</script>

<template>
  <VApp>
<VMain>
 
  <ImageGallary class="desktop-left-padding"/>
</VMain>

  </VApp>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400);

* {

    font-family: Ubuntu;
}

/* CSS for screens with a width less than 768px */
@media (min-width: 959px) {
  .desktop-left-padding {
    padding-left: 4%;
  }
}
</style>




