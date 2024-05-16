<script lang="ts" setup>
interface Props {
  path: string
  title: string
  date: string
  description: string
  image: string
  alt: string
  ogImage: string
  tags: Array<string>
  published: boolean
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog.jpg',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog.jpg',
  tags: () => [],
  published: false,
})
</script>

<template>
  <article class="tw-group tw-border tw-dark:border-gray-800  tw-m-2 tw-overflow-hidden tw-rounded-2xl tw-shadow-sm tw-text-zinc-700 tw-dark:text-zinc-300  ">
    <NuxtLink :to="path">
      <NuxtImg
        class="tw-lg:h-48 tw-md:h-36 tw-w-full tw-object-cover tw-object-center tw-rounded-t-2xl tw-shadow-lg tw-group-hover:scale-[1.02] tw-transition-all tw-duration-500"
        width="300"
        :src="image"
        :alt="alt"
      />
      <div class="px-3 pb-4">
        <div class="tw-text-black tw-dark:text-zinc-300    tw-pt-3 tw-pb-2">
          <div class="tw-flex tw-items-center">
            <LogoDate />
            {{ date }}
          </div>
          <div class="tw-flex tw-items-center tw-gap-1 tw-flex-wrap">
            <LogoTag />
            <template v-for="tag in tags" :key="tag">
              <span>{{ tag }}</span>
            </template>
          </div>
        </div>
        <h2 class="tw-text-xl tw-font-semibold  tw-text-black tw-dark:text-zinc-300   tw-pb-1 tw-group-hover:text-sky-700 tw-dark:group-hover:text-sky-400">
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2 text-base">
          {{ description }}
        </p>
        <div class="flex group-hover:underline text-sky-700 dark:text-sky-400 items-center py-2">
          <p>Read More</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
