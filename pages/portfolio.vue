<script setup lang="ts">
import Portfolio from '@/components/portfolio.vue';
</script>

<template>
  <VApp>
<VMain>
 <Portfolio class="desktop-left-padding"/>
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
    margin-left: 4%;
  }
}
</style>



