export function useGlow() {
  function handleGlowHover(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    if (el.dataset.glowPlayed) return
    el.dataset.glowPlayed = 'true'
    el.classList.add('glow-animate')
    el.addEventListener(
      'animationend',
      () => {
        el.classList.remove('glow-animate')
      },
      { once: true },
    )
  }

  return { handleGlowHover }
}
