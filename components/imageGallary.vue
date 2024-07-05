<script lang="ts" setup>
import Portraits from '@/components/Portraits.vue';
import Outdoors from '@/components/Outdoors.vue';
import Animals from '@/components/Animals.vue';
import Misc from '@/components/Misc.vue';
import Vehicles from '@/components/Vehicles.vue';
import Events from '@/components/Events.vue';



</script>

<template>
    <VCard class="ma-5">
        <!-- each of these are enclosed in a row -->

        <h1 class="mt-4 mb-1 text-center">Portraits </h1>
        <v-divider length="1750px" class="mb-6" :thickness="4" inset color="error"></v-divider>
        <Portraits />

        <h1 class="mt-12 mb-1 text-center">Events + BTS</h1>
        <v-divider length="1750px" class="mb-6" :thickness="4" inset color="error"></v-divider>
        <Events />

        <h1 class="mt-12 mb-1 text-center">Nature & Outdoors</h1>
        <v-divider length="1750px" class="mb-6" :thickness="4" inset color="error"></v-divider>
        <Outdoors />

        <h1 class="mt-12 mb-1 text-center">Pets 🫎</h1>
        <v-divider length="1750px" class="mb-6" :thickness="4" inset color="error"></v-divider>
        <Animals />

        <h1 class="mt-12 mb-1 text-center">Vehicles</h1>
        <v-divider length="1750px" class="mb-6" :thickness="4" inset color="error"></v-divider>
        <Vehicles />

        <h1 class="mt-12 mb-1 text-center">Other</h1>
        <v-divider length="1750px" class="mb-6" :thickness="4" inset color="error"></v-divider>
        <Misc />

    </VCard>
</template>