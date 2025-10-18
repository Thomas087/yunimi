<script setup lang="ts">
import Container from '../../../components/layout/Container.vue'
import Section from '../../../components/layout/Section.vue'
import FeatureCard from '../../../components/shared/FeatureCard.vue'
import { ref } from 'vue'

const features = ref([
  {
    title: "AI-powered Translation",
    description: "We translate your content into Chinese using A.I. for Chinese users to see.",
    icon: "/images/landing/features/ai.svg"
  },
  {
    title: "Automated Publishing",
    description: "We publish your content to WeChat, Douyin, Red, Weibo & beyond automatically.",
    icon: "/images/landing/features/publication.svg"
  },
  {
    title: "Human review",
    description: "We review your content to ensure it meets brand guidelines and follows Chinese regulations.",
    icon: "/images/landing/features/verification.svg"
  }
])
</script>

<template>
  <Section id="features" background="#f8f9fa">
    <Container>
      <h2 class="section-title">Easily promote your brand in China</h2>
      <p class="section-subtitle">
        We make all of your social media content visible to Chinese users.
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
