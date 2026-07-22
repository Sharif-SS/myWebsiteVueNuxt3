<script setup lang="ts">
defineProps<{
  categories: string[]
  active: string
}>()

const emit = defineEmits<{
  select: [category: string]
}>()
</script>

<template>
  <div class="-mx-4 px-4 overflow-x-auto scrollbar-hide">
    <div class="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap">
      <button
        v-for="cat in categories"
        :key="cat"
        class="shrink-0 px-5 py-2 rounded-lg text-sm font-medium backdrop-blur-md border transition-colors"
        :class="cat === active
          ? 'bg-accent/40 border-accent/60 text-gray-900 shadow-sm'
          : 'bg-accent/15 border-accent/20 text-gray-700 hover:bg-accent/30'"
        @click="emit('select', cat)"
      >
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
