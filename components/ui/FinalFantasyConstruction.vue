<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

defineProps<{
  title: string
}>()

const chocoboEl = ref<HTMLElement | null>(null)
const puffinEl = ref<HTMLElement | null>(null)

const chocobo = reactive({
  x: 200, y: 300,
  facing: -1, speed: 0.6,
  targetX: 300, targetY: 400,
  pauseTimer: 0, isPaused: false,
})

const puffin = reactive({
  x: 500, y: 400,
  facing: 1, speed: 0.9,
  targetX: 400, targetY: 300,
  pauseTimer: 0, isPaused: false,
})

let rafId = 0
let sW = 0
let sH = 0

function randTarget(margin = 120) {
  return {
    x: margin + Math.random() * Math.max(100, sW - margin * 2),
    y: margin + Math.random() * Math.max(100, sH - margin * 2),
  }
}

function updateBird(b: typeof chocobo) {
  if (b.isPaused) {
    b.pauseTimer--
    if (b.pauseTimer <= 0) {
      const t = randTarget()
      b.targetX = t.x
      b.targetY = t.y
      b.isPaused = false
    }
    return
  }
  const dx = b.targetX - b.x
  const dy = b.targetY - b.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < 3) {
    b.pauseTimer = 30 + Math.random() * 90
    b.isPaused = true
    return
  }
  const step = Math.min(b.speed, dist)
  b.x += (dx / dist) * step
  b.y += (dy / dist) * step
  b.facing = dx > 0 ? 1 : -1
  // keep in bounds
  const margin = 60
  b.x = Math.max(margin, Math.min(sW - margin, b.x))
  b.y = Math.max(margin, Math.min(sH - margin, b.y))
}

function tick() {
  updateBird(chocobo)
  updateBird(puffin)
  if (chocoboEl.value) {
    chocoboEl.value.style.transform = `translate(${chocobo.x}px, ${chocobo.y}px) scaleX(${chocobo.facing})`
  }
  if (puffinEl.value) {
    puffinEl.value.style.transform = `translate(${puffin.x}px, ${puffin.y}px) scaleX(${puffin.facing})`
  }
  rafId = requestAnimationFrame(tick)
}

function onResize() {
  sW = window.innerWidth
  sH = window.innerHeight
}

onMounted(() => {
  onResize()
  const t1 = randTarget()
  Object.assign(chocobo, { x: t1.x, y: t1.y, targetX: 0, targetY: 0 })
  const t2 = randTarget()
  Object.assign(puffin, { x: t2.x, y: t2.y, targetX: 0, targetY: 0 })
  const ct = randTarget()
  chocobo.targetX = ct.x
  chocobo.targetY = ct.y
  const pt = randTarget()
  puffin.targetX = pt.x
  puffin.targetY = pt.y
  window.addEventListener('resize', onResize)
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="ff-container">
    <!-- Stars -->
    <div class="stars-layer" aria-hidden="true">
      <div
        v-for="i in 80" :key="i" class="star" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${2 + Math.random() * 4}s`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
        }"
      />
    </div>

    <!-- Floating orbs -->
    <div class="orbs-layer" aria-hidden="true">
      <div
        v-for="i in 6" :key="'o' + i" class="orb" :style="{
          left: `${10 + (i - 1) * 16}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${5 + i}s`,
          width: `${6 + i * 2}px`,
          height: `${6 + i * 2}px`,
        }"
      />
    </div>

    <!-- Scanline overlay -->
    <div class="scanlines" aria-hidden="true" />

    <!-- Main content box -->
    <div class="ff-content">
      <!-- Crystal crown -->
      <div class="crystal" aria-hidden="true">
        <div class="crystal-inner" />
        <div class="crystal-glow" />
      </div>

      <!-- Title -->
      <h1 class="ff-title">{{ title }}</h1>

      <!-- Under construction message in a FF battle-style box -->
      <div class="message-box">
        <div class="message-box-border">
          <div class="message-box-inner">
            <p class="message-text">Under major construction.</p>
            <p class="message-text">Thank you! — Sharif</p>
          </div>
        </div>
      </div>

      <!-- Moogle easter egg -->
      <div class="moogle" aria-hidden="true">
        <span class="moogle-text">Kupo!</span>
      </div>
    </div>

    <!-- Chocobo -->
    <div ref="chocoboEl" class="chocobo" aria-hidden="true">
      <div class="chocobo-body">
        <div class="body-highlight" />
        <div class="belly-patch" />
        <div class="chocobo-wing" />
        <div class="chocobo-tail" />
      </div>
      <div class="chocobo-neck" />
      <div class="chocobo-head">
        <div class="head-crest1" />
        <div class="head-crest2" />
        <div class="head-crest3" />
        <div class="chocobo-beak" />
        <div class="chocobo-eye">
          <div class="eye-pupil" />
          <div class="eye-shine" />
        </div>
      </div>
      <div class="chocobo-leg-left">
        <div class="foot" />
      </div>
      <div class="chocobo-leg-right">
        <div class="foot" />
      </div>
    </div>

    <!-- Puffin -->
    <div ref="puffinEl" class="puffin" aria-hidden="true">
      <div class="puffin-body">
        <div class="puffin-belly" />
        <div class="puffin-wing" />
      </div>
      <div class="puffin-head">
        <div class="puffin-face" />
        <div class="puffin-beak">
          <div class="beak-orange" />
          <div class="beak-yellow" />
          <div class="beak-blue" />
          <div class="beak-tip" />
        </div>
        <div class="puffin-eye">
          <div class="puffin-eye-pupil" />
        </div>
        <div class="puffin-eye-back" />
      </div>
      <div class="puffin-leg-left">
        <div class="puffin-foot" />
      </div>
      <div class="puffin-leg-right">
        <div class="puffin-foot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ff-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 30%, #0d0d3b 60%, #0a0a2e 100%);
  overflow: hidden;
  font-family: 'Georgia', 'Times New Roman', serif;
}

/* Stars */
.stars-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Floating orbs */
.orbs-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  bottom: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 180, 255, 0.4), transparent 70%);
  animation: float linear infinite;
  filter: blur(1px);
}

@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-60vh) scale(1.5); opacity: 0.7; }
  100% { transform: translateY(-120vh) scale(0.5); opacity: 0; }
}

/* Scanlines */
.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  animation: scanline-move 8s linear infinite;
}

@keyframes scanline-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

/* Content */
.ff-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 90vw;
}

/* Crystal */
.crystal {
  position: relative;
  width: 80px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.crystal-inner {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid rgba(100, 180, 255, 0.6);
  position: relative;
  animation: crystal-pulse 3s ease-in-out infinite;
}

.crystal-inner::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -15px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid rgba(100, 180, 255, 0.4);
}

.crystal-glow {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 180, 255, 0.3), transparent 70%);
  animation: crystal-pulse 3s ease-in-out infinite;
  filter: blur(10px);
}

@keyframes crystal-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; }
}

/* Title */
.ff-title {
  font-size: clamp(1.5rem, 5vw, 3rem);
  color: #f0d080;
  text-shadow:
    0 0 10px rgba(240, 208, 128, 0.5),
    0 0 30px rgba(240, 208, 128, 0.3),
    0 0 60px rgba(240, 208, 128, 0.1);
  font-weight: bold;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  animation: title-glow 4s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% { text-shadow: 0 0 10px rgba(240, 208, 128, 0.5), 0 0 30px rgba(240, 208, 128, 0.3); }
  50% { text-shadow: 0 0 20px rgba(240, 208, 128, 0.8), 0 0 50px rgba(240, 208, 128, 0.5), 0 0 80px rgba(240, 208, 128, 0.2); }
}

/* Message box (FF battle-style) */
.message-box {
  max-width: 600px;
  width: 100%;
}

.message-box-border {
  border: 2px solid #8a7a4a;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(20, 15, 40, 0.95), rgba(30, 20, 50, 0.95));
  padding: 3px;
  box-shadow:
    0 0 15px rgba(138, 122, 74, 0.3),
    inset 0 0 15px rgba(138, 122, 74, 0.1);
}

.message-box-inner {
  border: 1px solid #6a5a3a;
  border-radius: 5px;
  padding: 2rem 2.5rem;
  text-align: center;
}

.message-text {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #e0d0a0;
  line-height: 1.8;
  letter-spacing: 0.05em;
}

.message-text:first-child {
  margin-bottom: 0.5rem;
}

/* Moogle easter egg */
.moogle {
  position: fixed;
  bottom: 20px;
  right: 24px;
  animation: moogle-bounce 3s ease-in-out infinite;
  cursor: default;
}

.moogle-text {
  font-family: 'Georgia', serif;
  font-size: 0.75rem;
  color: #b8a87a;
  letter-spacing: 0.1em;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.moogle:hover .moogle-text {
  opacity: 1;
  color: #f0d080;
  text-shadow: 0 0 10px rgba(240, 208, 128, 0.5);
}

@keyframes moogle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ============================================ */
/* CHOCBO — Final Fantasy style                 */
/* ============================================ */
.chocobo {
  position: fixed;
  left: 0;
  top: 0;
  width: 140px;
  height: 130px;
  pointer-events: none;
  z-index: 5;
}

/* Legs */
.chocobo-leg-left,
.chocobo-leg-right {
  position: absolute;
  bottom: 12px;
  width: 6px;
  height: 28px;
  background: linear-gradient(180deg, #d4a820, #b89018);
  border-radius: 3px;
  transform-origin: top center;
}

.chocobo-leg-left {
  left: 46px;
  animation: leg-walk 0.4s ease-in-out infinite;
}

.chocobo-leg-right {
  left: 74px;
  animation: leg-walk 0.4s ease-in-out infinite reverse;
}

.foot {
  position: absolute;
  bottom: -4px;
  left: -3px;
  width: 12px;
  height: 5px;
  background: #c89a18;
  border-radius: 50% 50% 30% 30%;
}

@keyframes leg-walk {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}

/* Body — big round yellow */
.chocobo-body {
  position: absolute;
  bottom: 36px;
  left: 30px;
  width: 80px;
  height: 65px;
  background: radial-gradient(ellipse at 45% 40%, #fce84a 0%, #f0d030 40%, #d4a820 100%);
  border-radius: 50% 50% 45% 48%;
  z-index: 2;
  animation: body-bob 0.5s ease-in-out infinite;
  overflow: hidden;
}

.body-highlight {
  position: absolute;
  top: 4px;
  left: 10px;
  width: 40px;
  height: 24px;
  background: radial-gradient(ellipse, rgba(255, 255, 200, 0.5), transparent 70%);
  border-radius: 50%;
}

.belly-patch {
  position: absolute;
  bottom: 6px;
  left: 14px;
  width: 44px;
  height: 20px;
  background: radial-gradient(ellipse at 50% 50%, #f5e8a0, #e8d470 50%, transparent 100%);
  border-radius: 50%;
}

@keyframes body-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

/* Wing */
.chocobo-wing {
  position: absolute;
  top: 16px;
  left: -8px;
  width: 22px;
  height: 28px;
  background: radial-gradient(ellipse at 70% 50%, #e8c830, #c49a18);
  border-radius: 70% 20% 50% 40%;
  z-index: 3;
  animation: wing-flap 0.6s ease-in-out infinite;
  transform-origin: right center;
  box-shadow: -1px 2px 0 rgba(180, 140, 20, 0.3);
}

@keyframes wing-flap {
  0%, 100% { transform: rotate(-5deg) scaleY(1); }
  50% { transform: rotate(-20deg) scaleY(0.7); }
}

/* Tail */
.chocobo-tail {
  position: absolute;
  top: 8px;
  right: -12px;
  width: 20px;
  height: 34px;
  background: linear-gradient(135deg, #e8c830, #b89810);
  border-radius: 10% 60% 20% 50%;
  z-index: 1;
  animation: tail-wag 0.8s ease-in-out infinite;
  transform-origin: left center;
  box-shadow: -2px 0 0 rgba(180, 140, 20, 0.2);
}

@keyframes tail-wag {
  0%, 100% { transform: rotate(10deg); }
  50% { transform: rotate(25deg); }
}

/* Neck */
.chocobo-neck {
  position: absolute;
  bottom: 82px;
  left: 52px;
  width: 22px;
  height: 30px;
  background: linear-gradient(180deg, #fae14a, #e0c830);
  border-radius: 8px 8px 10px 10px;
  transform: rotate(10deg);
  z-index: 3;
  animation: neck-bob 0.5s ease-in-out infinite;
}

@keyframes neck-bob {
  0%, 100% { transform: rotate(8deg) translateY(0); }
  50% { transform: rotate(12deg) translateY(-1px); }
}

/* Head */
.chocobo-head {
  position: absolute;
  bottom: 98px;
  left: 42px;
  width: 42px;
  height: 34px;
  background: radial-gradient(ellipse at 45% 50%, #fce84a, #e0c830);
  border-radius: 50% 50% 45% 48%;
  z-index: 4;
  animation: head-bob 0.5s ease-in-out infinite;
}

@keyframes head-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

/* Crest feathers — 3 red plumes */
.head-crest1,
.head-crest2,
.head-crest3 {
  position: absolute;
  border-radius: 2px;
  z-index: 6;
  transform-origin: bottom center;
  animation: crest-wobble 1.5s ease-in-out infinite;
}

.head-crest1 {
  top: -18px;
  left: 12px;
  width: 0;
  height: 0;
  border-bottom: 20px solid #e04028;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  transform: rotate(-10deg);
  filter: drop-shadow(0 1px 2px rgba(200, 50, 20, 0.3));
}

.head-crest1::after {
  content: '';
  position: absolute;
  top: 6px;
  left: -3px;
  width: 6px;
  height: 4px;
  background: radial-gradient(ellipse, rgba(255, 200, 100, 0.3), transparent);
  border-radius: 50%;
}

.head-crest2 {
  top: -15px;
  left: 22px;
  width: 0;
  height: 0;
  border-bottom: 16px solid #e04830;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  transform: rotate(15deg);
  animation-delay: 0.2s;
}

.head-crest3 {
  top: -14px;
  left: 4px;
  width: 0;
  height: 0;
  border-bottom: 14px solid #c83020;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  transform: rotate(-25deg);
  animation-delay: -0.3s;
  opacity: 0.8;
}

@keyframes crest-wobble {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(8deg); }
}

/* Beak */
.chocobo-beak {
  position: absolute;
  top: 12px;
  left: -14px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 16px solid #e89828;
  z-index: 7;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
}

/* Eye */
.chocobo-eye {
  position: absolute;
  top: 12px;
  left: 20px;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle at 40% 35%, #4a3020, #1a0a00);
  border-radius: 50%;
  z-index: 7;
  animation: blink 3.5s ease-in-out infinite;
}

.eye-pupil {
  position: absolute;
  top: 1px;
  left: 3px;
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.7;
}

.eye-shine {
  position: absolute;
  top: 3px;
  left: 5px;
  width: 1.5px;
  height: 1.5px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.4;
}

@keyframes blink {
  0%, 95%, 100% { transform: scaleY(1); }
  96%, 98% { transform: scaleY(0.1); }
}

/* ============================================ */
/* PUFFIN                                        */
/* ============================================ */
.puffin {
  position: fixed;
  left: 0;
  top: 0;
  width: 80px;
  height: 110px;
  pointer-events: none;
  z-index: 5;
}

/* Legs */
.puffin-leg-left,
.puffin-leg-right {
  position: absolute;
  bottom: 8px;
  width: 4px;
  height: 22px;
  background: #e87818;
  border-radius: 2px;
  transform-origin: top center;
}

.puffin-leg-left {
  left: 28px;
  animation: leg-walk 0.5s ease-in-out infinite;
}

.puffin-leg-right {
  left: 46px;
  animation: leg-walk 0.5s ease-in-out infinite reverse;
}

.puffin-foot {
  position: absolute;
  bottom: -3px;
  left: -3px;
  width: 10px;
  height: 4px;
  background: #e87818;
  border-radius: 40% 40% 20% 20%;
}

/* Body — black oval with white belly */
.puffin-body {
  position: absolute;
  bottom: 28px;
  left: 18px;
  width: 50px;
  height: 56px;
  background: radial-gradient(ellipse at 50% 40%, #2a2a2a, #1a1a1a);
  border-radius: 45% 45% 40% 42%;
  z-index: 2;
  animation: body-bob 0.6s ease-in-out infinite;
  overflow: hidden;
}

.puffin-belly {
  position: absolute;
  top: 14px;
  left: 6px;
  width: 32px;
  height: 34px;
  background: radial-gradient(ellipse at 50% 40%, #f0f0f0, #e0e0e0);
  border-radius: 45% 45% 40% 42%;
}

.puffin-wing {
  position: absolute;
  top: 18px;
  left: -4px;
  width: 16px;
  height: 24px;
  background: radial-gradient(ellipse at 60% 50%, #2a2a2a, #111);
  border-radius: 60% 20% 50% 30%;
  z-index: 3;
  animation: wing-flap 0.8s ease-in-out infinite;
  transform-origin: right center;
}

/* Head */
.puffin-head {
  position: absolute;
  bottom: 74px;
  left: 24px;
  width: 36px;
  height: 30px;
  z-index: 4;
  animation: head-bob 0.6s ease-in-out infinite;
}

.puffin-face {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, #f5f5f5, #e8e8e8);
  border-radius: 50% 50% 45% 48%;
}

/* Eye */
.puffin-eye {
  position: absolute;
  top: 10px;
  left: 14px;
  width: 6px;
  height: 7px;
  background: #111;
  border-radius: 50%;
  z-index: 2;
  animation: blink 4s ease-in-out infinite;
}

.puffin-eye-pupil {
  position: absolute;
  top: 1px;
  left: 2px;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.6;
}

.puffin-eye-back {
  position: absolute;
  top: 8px;
  left: 10px;
  width: 14px;
  height: 11px;
  background: #1a1a1a;
  border-radius: 50% 50% 45% 48%;
  z-index: 1;
}

/* Beak — colorful triangle */
.puffin-beak {
  position: absolute;
  top: 12px;
  left: -14px;
  width: 20px;
  height: 14px;
  z-index: 3;
}

.beak-orange {
  position: absolute;
  top: 0; left: 0; right: 4px; bottom: 0;
  background: #e87818;
  clip-path: polygon(100% 0, 100% 100%, 0 50%);
  border-radius: 2px;
}

.beak-yellow {
  position: absolute;
  top: 3px;
  left: 4px;
  width: 10px;
  height: 3px;
  background: #f0d030;
}

.beak-blue {
  position: absolute;
  top: 7px;
  left: 2px;
  width: 12px;
  height: 3px;
  background: #4080b0;
}

.beak-tip {
  position: absolute;
  top: 4px;
  right: 0;
  width: 6px;
  height: 6px;
  background: #c86010;
  border-radius: 0 0 3px 0;
}

@media (max-width: 640px) {
  .ff-content {
    gap: 1.5rem;
    padding: 1rem;
  }

  .crystal {
    width: 60px;
    height: 75px;
  }

  .crystal-inner {
    border-left-width: 22px;
    border-right-width: 22px;
    border-bottom-width: 45px;
  }

  .crystal-inner::after {
    top: 12px;
    left: -11px;
    border-left-width: 11px;
    border-right-width: 11px;
    border-top-width: 22px;
  }

  .crystal-glow {
    width: 80px;
    height: 80px;
  }

  .message-box-inner {
    padding: 1.5rem 1.5rem;
  }
}
</style>
