<script setup lang="ts">
import { ref, onMounted } from 'vue'

const images = ref<string[]>([])

onMounted(async () => {
    const imageModules = import.meta.glob('/public/photos/Misc/*.{png,jpg,jpeg,webp}')
    for (const path in imageModules) {
        const imagePath = path.replace('/public', '')
        images.value.push(imagePath)
    }
})
</script>

<template>
    <VRow>
        <VCol v-for="(image, index) in images" :key="index" cols="6" sm="6" md="6" lg="3">
            <VHover>
                <VCard class="image-card">
                    <div class="image-container">
                        <NuxtImg 
                            :src="image" 
                            :placeholder="[50, 50]"
                            placeholder-class="loading-placeholder"
                            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 400px"
                            loading="lazy"
                            class="event-image"
                        />
                    </div>
                </VCard>
            </VHover>
        </VCol>
    </VRow>
</template>

<style scoped>
/* <vcard/>  */
.image-card {
    background: linear-gradient(45deg, rgba(216,251,253,0.945679012345679) 10%, rgba(0,0,0,0) 100%);
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
/* In div surrounding our <NuxtImg/>  */
.image-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* <NuxtImg/>  */
.event-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
/* Styles for the loaded image */
img:not(.loading-placeholder) {
    filter: blur(0);
    transform: scale(1);
    
}

/* Optional: Add a fade-in effect */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

img:not(.loading-placeholder) {
    animation: fadeIn 0.8s ease-in-out;
}
</style>