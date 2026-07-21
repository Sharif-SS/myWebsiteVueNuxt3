<script setup lang="ts">
defineProps<{
  groups: string[][]
  active: string
}>()

const emit = defineEmits<{
  select: [category: string]
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <template v-for="(group, gi) in groups" :key="gi">
      <span v-if="gi > 0" class="text-gray-300 select-none mx-1">|</span>
      <button
        v-for="cat in group"
        :key="cat"
        class="px-5 py-2 rounded-lg text-sm font-medium backdrop-blur-md border transition-colors"
        :class="cat === active
          ? 'bg-accent/40 border-accent/60 text-gray-900 shadow-sm'
          : 'bg-accent/15 border-accent/20 text-gray-700 hover:bg-accent/30'"
        @click="emit('select', cat)"
      >
        {{ cat }}
      </button>
    </template>
  </div>
</template>
