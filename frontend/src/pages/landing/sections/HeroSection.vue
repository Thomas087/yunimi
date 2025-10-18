<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from "primevue/button"

const router = useRouter()

const handleGetStarted = () => {
  router.push('/signup')
  // Ensure we scroll to top after navigation
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-container">
      <!-- Left Panel: Text + Button -->
      <div class="hero-left">
        <h1 class="hero-title">One-click translation & publishing for China's biggest social media</h1>
        <p class="hero-subtitle">
          Expand your brand presence on WeChat, Douyin, Red, Weibo & beyond
        </p>
        <div class="hero-actions">
          <Button 
            label="Get started" 
            size="large" 
            class="primary-btn"
            @click="handleGetStarted"
          />
        </div>
      </div>
      
      <!-- Right Panel: Hero Image -->
      <div class="hero-right">
        <img 
          src="/images/landing/hero-pic-1.png" 
          alt="Hero illustration" 
          class="hero-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  margin-top: 20px; /* Compensate for fixed navbar */
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-left {
  text-align: left;
}

.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
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
@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-left {
    text-align: center;
  }
  
  .hero-actions {
    justify-content: center;
  }
}

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
    padding: 0px 20px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-container {
    gap: 2rem;
  }
}
</style>
