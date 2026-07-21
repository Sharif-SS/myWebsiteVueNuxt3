<script setup lang="ts">
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
  }),
)

const { handleSubmit, errors } = useForm({
  validationSchema,
})

const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: message } = useField<string>('message')

const formRef = ref<HTMLFormElement>()

const onSubmit = handleSubmit(() => {
  formRef.value?.submit()
})

useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Get in touch with Sharif Sircar.' },
    { property: 'og:url', content: 'https://www.sharif-sircar.com/contact' },
    { property: 'og:title', content: 'Contact — Sharif Sircar' },
    { property: 'og:description', content: 'Send a message.' },
  ],
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: 'https://www.sharif-sircar.com/contact',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-[url('/banner.webp')] bg-fixed bg-cover bg-center">
    <div class="min-h-screen backdrop-blur-[2px] bg-white/30 py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Photo -->
          <div class="hidden md:block md:w-2/5 flex-shrink-0 animate-float">
            <img
              src="/contact.jpg"
              alt="Sharif in an old telephone booth"
              class="w-full rounded-xl shadow-lg"
            >
          </div>

          <!-- Form card -->
          <div class="w-full md:w-3/5 animate-bounce-card">
            <div class="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border-t-4 border-accent p-8">
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Contact</h1>
              <p class="text-gray-500 mb-8 max-w-lg">
                Have a project in mind or just want to say hello? Drop me a message.
              </p>

              <form
                ref="formRef"
                name="contact"
                action="/thank-you"
                method="post"
                netlify
                netlify-honeypot="bot-field"
                class="space-y-6"
                @submit="onSubmit"
              >
                <input type="hidden" name="form-name" value="contact">

                <p class="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out
                    <input name="bot-field" tabindex="-1" autocomplete="off">
                  </label>
                </p>

                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name" v-model="name" name="name" type="text"
                    class="form-input block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-500"
                    placeholder="Your name"
                  >
                  <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email" v-model="email" name="email" type="email"
                    class="form-input block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-500"
                    placeholder="your@email.com"
                  >
                  <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message" v-model="message" name="message" rows="6"
                    class="form-input block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-500 resize-y"
                    placeholder="What's on your mind?"
                  />
                  <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
                </div>

                <button
                  type="submit"
                  class="inline-flex items-center px-6 py-2.5 rounded-lg bg-accent/30 backdrop-blur-md border border-accent/50 text-gray-900 text-sm font-medium hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </form>

              <div class="mt-10 pt-6 border-t border-gray-200">
                <p class="text-sm text-gray-500 mb-3">Find me elsewhere</p>
                <div class="flex gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input:hover {
  border-bottom: 4px solid #D8FBFD;
  border-radius: 10px;
}

.form-input:focus {
  border-bottom: 4px solid #D8FBFD;
  border-radius: 10px;
}
</style>
