<template>
    <VCard
    class="ma-5"
    >
        <VRow>
            <VCol 
            v-for="n in 200"
            cols="6"
            sm="6"
            md="6"
            lg="3"
            >
                <VHover>
                    <VCard>

                        <vImg
                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"

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
</VCard>
</template>