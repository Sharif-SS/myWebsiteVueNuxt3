<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      // Adjust this value based on the maximum number of images you anticipate having
      imageCount: 7,
    };
  },
});
</script>

<template>

    <VRow>
        <VCol 
        v-for="n in imageCount" :key="n"
        cols="6"
        sm="6"
        md="6"
        lg="3"
        >
            <VHover>
                <VCard>

                    <vImg 
                            :src="`/photos/Animals/image(${imageCount - n + 1}).jpg`"
                            :lazy-src="`/photos/Animals/thumbnails/image(${imageCount - n + 1}).jpg`"
                            aspect-ratio="1"
                            transition="fab-transition"
                            style="background: linear-gradient(rgb(245, 253, 255), rgba(0, 0, 0, 0.0))"
                    >

                    <template v-slot:placeholder>

                        <VRow
                            class="fill-height ma-0"
                            align="center"
                            justify="center">

                            <VProgressCircular
                                indeterminate
                                color="grey-lighten-5"
                            ></VProgressCircular>



                        </VRow>

                    </template>

                    </vImg>


                </VCard>
            </VHover>
        </VCol>

    </VRow>

</template>