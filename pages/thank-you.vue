<script setup lang="ts">
useHead({
  title: 'Thank You',
  meta: [
    { name: 'description', content: 'Message sent — thank you!' },
  ],
})
</script>

<template>
  <div class="bg-white min-h-screen flex items-center justify-center">
    <div class="max-w-lg mx-auto px-4 py-16 text-center">
      <div class="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="mdi:check" class="w-8 h-8 text-white" />
      </div>

      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Thank You</h1>
      <p class="text-gray-500 mb-8 max-w-sm mx-auto">
        Your message has been sent. I'll get back to you as soon as I can.
      </p>

      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Back Home
      </NuxtLink>
    </div>
  </div>
</template>
