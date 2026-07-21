<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="fixed bottom-0 left-0 right-0 z-50 h-[40px] bg-surface shadow-md flex items-center justify-between px-4 text-sm"
  >
    <span>&copy; {{ year }}</span>

    <div class="flex items-center gap-1">
      <a
        href="https://www.linkedin.com/in/sharif-sircar/"
        target="_blank"
        class="h-[30px] w-[30px] rounded bg-accent flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="LinkedIn"
      >
        <Icon name="mdi:linkedin" class="w-4 h-4" />
      </a>
      <a
        href="https://www.instagram.com/sharifsircarphoto/"
        target="_blank"
        class="h-[30px] w-[30px] rounded bg-accent flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Instagram"
      >
        <Icon name="mdi:instagram" class="w-4 h-4" />
      </a>
      <a
        href="https://www.youtube.com/c/sharifsircar"
        target="_blank"
        class="h-[30px] w-[30px] rounded bg-accent flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="YouTube"
      >
        <Icon name="mdi:youtube" class="w-4 h-4" />
      </a>
    </div>
  </footer>
</template>
