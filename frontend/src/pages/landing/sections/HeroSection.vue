<script setup lang="ts">
import Button from "primevue/button"

const handleGetStarted = () => {
  console.log('Get Started clicked')
  // Add your navigation logic here
}

const handleLearnMore = () => {
  console.log('Learn More clicked')
  // Add your navigation logic here
}
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to Yunimi</h1>
      <p class="hero-subtitle">
        The modern solution for your business needs. Streamline your workflow, 
        boost productivity, and achieve your goals with our innovative platform.
      </p>
      <div class="hero-actions">
        <Button 
          label="Get Started" 
          size="large" 
          class="primary-btn"
          @click="handleGetStarted"
        />
        <Button 
          label="Learn More" 
          size="large" 
          severity="secondary"
          outlined
          @click="handleLearnMore"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-btn {
  background: #ff6b6b !important;
  border-color: #ff6b6b !important;
}

.primary-btn:hover {
  background: #ff5252 !important;
  border-color: #ff5252 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 80px 20px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
}
</style>
