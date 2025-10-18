<script setup lang="ts">
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
  <section id="features" class="features-section">
    <div class="features-container">
      <div class="features-header">
        <h2 class="section-title">Easily promote your brand in China</h2>
        <p class="section-subtitle">
          We make all of your social media content visible to Chinese users.
        </p>
      </div>
      <div class="features-grid">
        <FeatureCard 
          v-for="feature in features" 
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
  padding: 80px 20px;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #1e293b;
}

.section-subtitle {
  font-size: 1.25rem;
  margin-bottom: 0;
  opacity: 0.7;
  line-height: 1.6;
  color: #1e293b;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  align-items: stretch;
}

/* Responsive Design */
@media (max-width: 968px) {
  .features-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .features-header {
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .features-section {
    padding: 50px 20px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .features-section {
    padding: 40px 20px;
  }
  
  .features-header {
    margin-bottom: 2.5rem;
  }
}
</style>
