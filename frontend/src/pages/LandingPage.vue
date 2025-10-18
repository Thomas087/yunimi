<script setup lang="ts">
import Navbar from '../components/layout/Navbar.vue'
import HeroSection from './landing/sections/HeroSection.vue'
import FeaturesSection from './landing/sections/FeaturesSection.vue'
import PricingSection from './landing/sections/PricingSection.vue'
import AboutSection from './landing/sections/AboutSection.vue'
import FooterSection from './landing/sections/FooterSection.vue'
import Divider from "primevue/divider"
</script>

<template>
  <div class="landing-page">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
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
