<script setup lang="ts">
interface CategoryOption {
  label: string
  primary?: boolean
}

defineProps<{
  categories: CategoryOption[]
  active: string
}>()

const emit = defineEmits<{
  select: [category: string]
}>()
</script>

<template>
  <nav aria-label="Photography categories" class="-mx-4 px-4 overflow-x-auto scrollbar-hide">
    <div class="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap">
      <template v-for="(cat, i) in categories" :key="cat.label">
        <button
          class="shrink-0 rounded-lg border backdrop-blur-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-dark"
          :class="[
            cat.primary
              ? 'px-5 py-2.5 text-sm font-semibold shadow-sm'
              : 'px-3.5 py-2 text-[13px] font-medium',
            { 'ml-4 sm:ml-5': i > 0 && !cat.primary && (categories[i - 1]?.primary) },
            cat.label === active
              ? cat.primary
                ? 'bg-accent text-gray-900 border-accent shadow-md'
                : 'bg-accent/50 text-gray-900 border-accent'
              : cat.primary
                ? 'bg-accent/60 text-gray-800 border-accent/70 hover:bg-accent/85'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700',
          ]"
          :aria-current="cat.label === active ? 'true' : undefined"
          :aria-pressed="cat.label === active"
          @click="emit('select', cat.label)"
        >
          {{ cat.label }}
        </button>
      </template>
    </div>
  </nav>
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
