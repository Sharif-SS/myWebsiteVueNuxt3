<script setup lang="ts">
</script>

<template>
  <div class="about-photo">
    <div class="about-photo__frame">
      <img
        src="/aboutPhoto.webp"
        alt="Sharif Sircar"
        class="about-photo__image"
      >
      <div class="about-photo__caption">
        <span class="about-photo__name">Sharif Sircar</span>
        <span class="about-photo__role">Photographer &amp; Host</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-photo {
  max-width: 340px;

  @media (max-width: 640px) {
    max-width: 320px;
    margin: 0 auto;
  }

  &__frame {
    position: relative;
    aspect-ratio: 3 / 4;
    border-radius: 12px;
    overflow: hidden;
    background: #e5e7eb;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    @media (max-width: 640px) {
      aspect-ratio: 4 / 5;
      box-shadow: 0 3px 14px rgba(0, 0, 0, 0.07);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1.25rem;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.35) 60%,
      transparent 100%
    );
    color: #fff;
    pointer-events: none;
  }

  &__name {
    font-weight: 700;
    font-size: 1.1rem;
    line-height: 1.2;
  }

  &__role {
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 0.9;
  }
}
</style>
