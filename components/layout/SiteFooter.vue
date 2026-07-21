<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-100 bg-white py-8 px-4">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-400">&copy; {{ year }} Sharif Sircar</span>
        <UiEasterEgg />
      </div>

      <div class="flex items-center gap-3">
        <a
          href="https://www.linkedin.com/in/sharif-sircar/"
          target="_blank"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/30 backdrop-blur-md border border-accent/50 text-gray-700 text-sm font-medium hover:bg-accent/50 transition-colors"
          aria-label="LinkedIn"
        >
          <Icon name="mdi:linkedin" class="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/sharifsircarphoto/"
          target="_blank"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/30 backdrop-blur-md border border-accent/50 text-gray-700 text-sm font-medium hover:bg-accent/50 transition-colors"
          aria-label="Instagram"
        >
          <Icon name="mdi:instagram" class="w-4 h-4" />
          Instagram
        </a>
      </div>
    </div>
  </footer>
</template>
