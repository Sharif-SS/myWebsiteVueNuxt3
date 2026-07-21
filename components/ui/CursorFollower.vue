<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dot = ref({ x: -100, y: -100 })
const ring = ref({ x: -100, y: -100 })
const isHovering = ref(false)
const hammerMode = ref(false)
const isTouch = ref(false)

let raf: number | null = null
let tx = -100
let ty = -100

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function tick() {
  dot.value.x = lerp(dot.value.x, tx, 0.15)
  dot.value.y = lerp(dot.value.y, ty, 0.15)
  ring.value.x = lerp(ring.value.x, tx, 0.06)
  ring.value.y = lerp(ring.value.y, ty, 0.06)
  raf = requestAnimationFrame(tick)
}

function onMove(e: MouseEvent) {
  tx = e.clientX
  ty = e.clientY
}

function checkHover(e: MouseEvent) {
  const target = e.target as HTMLElement
  const interactive = target.closest('a, button, [data-cursor-hover]')
  isHovering.value = !!interactive
  const hammer = target.closest('[data-cursor="hammer"]')
  hammerMode.value = !!hammer
}

onMounted(() => {
  isTouch.value = window.matchMedia('(pointer: coarse)').matches
  if (isTouch.value) return

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseover', checkHover)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', checkHover)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div v-show="!isTouch" class="cursor-follower" :class="{ active: isHovering }" aria-hidden="true">
    <div class="cursor-ring" :class="{ hovering: isHovering, hammer: hammerMode }" :style="{ left: ring.x + 'px', top: ring.y + 'px' }" />
    <div v-if="!hammerMode" class="cursor-dot" :style="{ left: dot.x + 'px', top: dot.y + 'px' }" />
    <div v-else class="cursor-hammer" :style="{ left: dot.x + 'px', top: dot.y + 'px' }" />
  </div>
</template>

<style lang="scss" scoped>
.cursor-follower {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;

  &.active {
    opacity: 1;
  }
}

.cursor-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #666;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1.5px solid rgba(100, 100, 100, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s ease,
    height 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease;

  &.hovering {
    width: 48px;
    height: 48px;
    border-color: rgba(100, 100, 100, 0.5);
    background: rgba(100, 100, 100, 0.04);
  }

  &.hammer {
    width: 40px;
    height: 40px;
    border-color: #c0a050;
    background: rgba(192, 160, 80, 0.08);
    box-shadow: 0 0 12px rgba(192, 160, 80, 0.15);
  }
}

.cursor-hammer {
  position: absolute;
  width: 22px;
  height: 28px;
  transform: translate(-50%, -50%) rotate(-25deg);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 15px;
    background: #a0522d;
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 11px;
    background: linear-gradient(180deg, #999, #777);
    border-radius: 2.5px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  }
}
</style>
