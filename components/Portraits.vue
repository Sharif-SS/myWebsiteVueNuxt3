

<template>

    <VRow>
        <VCol 
        
        v-for="n in 11" :key="n"
        cols="6"
        sm="6"
        md="6"
        lg="3"
        >
            <VHover>
                <VCard>

                    <vImg 
                            :src="`/photos/Portraits/image(${n}).jpg`"
                            :lazy-src="`/photos/Portraits/thumbnails/image(${n}).jpg`"
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