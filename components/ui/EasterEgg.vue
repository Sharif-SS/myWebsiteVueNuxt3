<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)

function show() { open.value = true }
function close() { open.value = false }
function onKeydown(e: KeyboardEvent) { if (e.key === 'Escape') close() }

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <button class="egg-button" aria-label="Easter egg" data-cursor="hammer" @click="show">
    <div class="egg-wrapper">
      <div class="egg">
        <div class="crack-1" />
        <div class="chip" />
        <div class="inner-glow" />
      </div>
    </div>
  </button>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        @click.self="close"
      >
        <div class="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl">
          <button
            class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Close video"
            @click="close"
          >
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>
          <div class="aspect-video">
            <iframe
              :src="open ? 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0' : ''"
              class="w-full h-full"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.egg-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: relative;

  &:hover .egg,
  &:active .egg {
    animation: egg-hover-crack 0.6s ease-in-out forwards;
  }

  &:hover .crack-1,
  &:active .crack-1 {
    animation: crack-hover-flash 0.6s ease-in-out forwards;
  }

  &:hover .chip,
  &:active .chip {
    animation: chip-hover-fly 0.6s ease-in-out forwards;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192, 160, 80, 0.35) 0%, transparent 70%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
  }
}

@media (pointer: coarse) {
  .egg-button:active::before {
    opacity: 1;
    animation: touch-pulse 0.4s ease-out;
  }
}

@keyframes touch-pulse {
  0% { transform: scale(0.3); opacity: 0.7; }
  100% { transform: scale(1.8); opacity: 0; }
}

.egg-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 26px;
    height: 5px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
    animation: shadow-pulse 4s ease-in-out infinite;
  }
}

.egg {
  width: 35px;
  height: 46px;
  position: relative;
  animation: egg-cycle 4s ease-in-out infinite;
  transform-origin: center bottom;
  z-index: 1;
}

.egg::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: radial-gradient(ellipse at 40% 30%, #fffcf5 0%, #f5ede0 35%, #ece0cc 75%, #e0d0b8 100%);
  box-shadow:
    0 2px 8px rgba(0,0,0,0.08),
    0 8px 16px rgba(0,0,0,0.04),
    inset 0 -5px 10px rgba(0,0,0,0.05),
    inset 0 3px 8px rgba(255,255,255,0.6);
}

.inner-glow {
  position: absolute;
  inset: 15%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,200,100,0.15) 0%, transparent 70%);
  animation: glow-pulse 4s ease-in-out infinite;
  pointer-events: none;
}

.crack-1 {
  position: absolute;
  top: 26%;
  left: 44%;
  width: 3px;
  height: 42%;
  background: linear-gradient(180deg, #8a7a6a, #6b5c4b, #5a4a3a);
  transform: translateX(-50%) rotate(3deg);
  clip-path: polygon(
    50% 0%,
    25% 10%,
    60% 22%,
    30% 36%,
    65% 48%,
    35% 62%,
    55% 76%,
    40% 90%,
    50% 100%
  );
  opacity: 0;
  animation: crack-cycle 4s ease-in-out infinite;
  border-radius: 1px;
}

.egg::after {
  content: '';
  position: absolute;
  top: 38%;
  left: 52%;
  width: 2px;
  height: 22%;
  background: linear-gradient(180deg, #8a7a6a, #6b5c4b);
  transform: rotate(-5deg);
  clip-path: polygon(
    50% 0%,
    35% 20%,
    60% 40%,
    40% 60%,
    55% 80%,
    50% 100%
  );
  opacity: 0;
  animation: crack-secondary-cycle 4s ease-in-out infinite;
  border-radius: 1px;
}

.chip {
  position: absolute;
  top: 42%;
  left: 42%;
  width: 8px;
  height: 6px;
  background: #ece0cc;
  border-radius: 40% 60% 50% 50%;
  z-index: 2;
  opacity: 0;
  animation: chip-cycle 4s ease-in-out infinite;
}

@keyframes egg-cycle {
  0%, 100% { transform: scale(1) rotate(0deg) translateY(0); }
  4% { transform: scale(1.015) rotate(0.5deg) translateY(-1px); }
  10% { transform: scale(0.99) rotate(-0.3deg) translateY(0); }
  16% { transform: scale(1.01) rotate(0.2deg) translateY(0); }
  22% { transform: scale(1) rotate(0deg) translateY(0); }
  /* build tension */
  50% { transform: scale(1.01) rotate(0deg) translateY(0); }
  52% { transform: scale(0.97) rotate(0deg) translateY(0); }
  /* VIOLENT CRACK ATTEMPT */
  54% { transform: scale(1.08) rotate(-6deg) translateY(-3px); }
  56% { transform: scale(1.1) rotate(7deg) translateY(-5px); }
  58% { transform: scale(1.06) rotate(-5deg) translateY(-2px); }
  60% { transform: scale(1.12) rotate(8deg) translateY(-6px); }
  62% { transform: scale(1.07) rotate(-4deg) translateY(-1px); }
  64% { transform: scale(1.03) rotate(2deg) translateY(0); }
  66% { transform: scale(1) rotate(0deg) translateY(0); }
  /* aftershocks */
  70% { transform: scale(1.02) rotate(-1deg) translateY(-1px); }
  74% { transform: scale(0.99) rotate(1deg) translateY(0); }
  78% { transform: scale(1.01) rotate(-0.5deg) translateY(0); }
  82% { transform: scale(1) rotate(0deg) translateY(0); }
}

@keyframes crack-cycle {
  0%, 50% { opacity: 0; }
  53% { opacity: 0; }
  54% { opacity: 0.9; transform: translateX(-50%) rotate(3deg) scaleX(1); }
  56% { opacity: 1; transform: translateX(-50%) rotate(3deg) scaleX(1.2); }
  60% { opacity: 0.9; transform: translateX(-50%) rotate(3deg) scaleX(1); }
  66% { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes crack-secondary-cycle {
  0%, 52% { opacity: 0; }
  56% { opacity: 0; }
  58% { opacity: 0.8; }
  62% { opacity: 0.6; }
  66% { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes chip-cycle {
  0%, 53% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
  55% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
  56% { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
  62% { opacity: 0.6; transform: translate(10px, -8px) scale(0.8) rotate(45deg); }
  66% { opacity: 0; transform: translate(16px, -12px) scale(0.4) rotate(90deg); }
  100% { opacity: 0; transform: translate(16px, -12px) scale(0.4) rotate(90deg); }
}

@keyframes glow-pulse {
  0%, 50% { transform: scale(0.8); opacity: 0.3; }
  53% { transform: scale(1); opacity: 0.8; }
  56% { transform: scale(1.3); opacity: 0.4; }
  60% { transform: scale(1.5); opacity: 0.2; }
  66% { transform: scale(0.8); opacity: 0.3; }
  100% { transform: scale(0.8); opacity: 0.3; }
}

@keyframes shadow-pulse {
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
  50% { transform: translateX(-50%) scale(0.95); opacity: 0.5; }
  54% { transform: translateX(-50%) scale(0.7); opacity: 0.3; }
  58% { transform: translateX(-50%) scale(0.9); opacity: 0.5; }
  64% { transform: translateX(-50%) scale(1); opacity: 0.6; }
}

@keyframes egg-hover-crack {
  0% { transform: scale(1) rotate(0deg) translateY(0); }
  15% { transform: scale(1.05) rotate(-5deg) translateY(-2px); }
  30% { transform: scale(1.12) rotate(7deg) translateY(-5px); }
  45% { transform: scale(1.06) rotate(-3deg) translateY(-1px); }
  65% { transform: scale(1.02) rotate(1deg) translateY(0); }
  100% { transform: scale(1) rotate(0deg) translateY(0); }
}

@keyframes crack-hover-flash {
  0% { opacity: 0; }
  10% { opacity: 0; }
  20% { opacity: 1; transform: translateX(-50%) rotate(3deg) scaleX(1.2); }
  40% { opacity: 0.8; }
  60% { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes chip-hover-fly {
  0% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
  15% { opacity: 0; transform: translate(0, 0) scale(0.5) rotate(0deg); }
  20% { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
  45% { opacity: 0.5; transform: translate(14px, -10px) scale(0.6) rotate(60deg); }
  70% { opacity: 0; transform: translate(20px, -16px) scale(0.3) rotate(120deg); }
  100% { opacity: 0; transform: translate(20px, -16px) scale(0.3) rotate(120deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
