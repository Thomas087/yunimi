<script setup lang="ts">
import Container from '../../../components/layout/Container.vue'
import Section from '../../../components/layout/Section.vue'
import FeatureCard from '../../../components/shared/FeatureCard.vue'
import { ref } from 'vue'

const features = ref([
  {
    title: "Fast & Reliable",
    description: "Built with modern technology for optimal performance and reliability.",
    icon: "⚡"
  },
  {
    title: "Easy to Use",
    description: "Intuitive interface designed for both beginners and experts.",
    icon: "🎯"
  },
  {
    title: "Secure",
    description: "Enterprise-grade security to protect your data and privacy.",
    icon: "🔒"
  }
])
</script>

<template>
  <Section id="features" background="#f8f9fa">
    <Container>
      <h2 class="section-title">Why Choose Yunimi?</h2>
      <p class="section-subtitle">
        Discover the features that make us the preferred choice for businesses worldwide.
      </p>
      <div class="features-grid">
        <FeatureCard 
          v-for="feature in features" 
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
        />
      </div>
    </Container>
  </Section>
</template>

<style scoped>
.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.section-subtitle {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #6c757d;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>
