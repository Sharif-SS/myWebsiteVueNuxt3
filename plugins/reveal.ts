export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      if (el.classList.contains('revealed')) return

      const reveal = () => {
        el.classList.add('revealed')
        observer?.disconnect()
        window.removeEventListener('load', reveal)
      }

      // Mark hidden only post-hydration, so the server-rendered content is
      // never invisible while the client is still booting ("blank page").
      el.classList.add('reveal-ready')

      if (!('IntersectionObserver' in window)) return reveal()

      let observer: IntersectionObserver | null = null
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal()
        },
        // threshold: 0 => fire as soon as ANY part is visible. A strict
        // threshold (e.g. 0.1 = 10% of the element) never fires for very tall
        // elements like the ~7k px gallery grid, leaving them invisible
        // ("blank until I scroll/category-switch").
        { threshold: 0 },
      )

      // Observe on the next paint so the hidden state is applied before the
      // observer decides whether the element is already in view.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => observer?.observe(el))
      })

      // Safety net: if the observer never fires (broken IO, missed frames,
      // DOM replacement), never leave content invisible.
      window.addEventListener('load', reveal)
    },
  })
})
