<script setup lang="ts">
import HeroSection from './landing/sections/HeroSection.vue'
import FeaturesSection from './landing/sections/FeaturesSection.vue'
import AboutSection from './landing/sections/AboutSection.vue'
import FooterSection from './landing/sections/FooterSection.vue'
import Divider from "primevue/divider"
</script>

<template>
  <div class="landing-page">
    <HeroSection />
    <FeaturesSection />
    <Divider />
    <AboutSection />
    <FooterSection />
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
