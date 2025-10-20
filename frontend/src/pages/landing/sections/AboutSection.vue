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
  <section id="about" class="about-section">
    <div class="about-container">
      <div class="about-header">
        <h2 class="section-title">About Yunimi</h2>
        <p class="section-subtitle">
          Bridging the gap between Western brands and Chinese consumers with innovative solutions.
        </p>
      </div>
      
      <div class="about-content">
        <div class="about-text-card">
          <div class="about-text">
            <p class="about-description">
              Based in Beijing, Shanghai and Paris, we are a dedicated team of developers and marketers passionate about bridging the gap between Western brands and Chinese consumers.
            </p>
            <p class="about-description">
              Our solutions are easy to use, compliant with Chinese regulations. Our support team is available 24/7 to help you with any questions you may have.
            </p>
            <div class="about-action">
              <Button 
                label="Get started" 
                size="large"
                @click="handleGetStarted"
              />
            </div>
          </div>
        </div>
        
        <div class="about-stats">
          <div class="stat-item">
            <div class="stat-value">300+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">35,000</div>
            <div class="stat-label">Posts Published</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">24/7</div>
            <div class="stat-label">Support</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e293b;
  padding: 80px 20px;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
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

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.about-text-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--p-primary-color);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  margin: 0;
}

.about-action {
  margin-top: 1rem;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
}

@media (min-width: 768px) {
.about-stats > div:first-child {
  padding-top: 0;
}
}

.stat-item {
  text-align: center;
  padding: 1.5rem 0;
}

.stat-value {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #1e293b, var(--p-primary-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  color: #64748b;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}

/* Responsive Design */
@media (max-width: 968px) {
  .about-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .about-header {
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-section {
    padding: 50px 20px;
  }
  
  .about-text-card {
    padding: 2rem;
  }
  
  .about-stats {
    flex-direction: row;
    justify-content: space-around;
    gap: 1.5rem;
  }
  
  .stat-value {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .about-section {
    padding: 40px 20px;
  }
  
  .about-header {
    margin-bottom: 2.5rem;
  }
  
  .about-text-card {
    padding: 1.5rem;
  }
  
  .about-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .stat-value {
    font-size: 2.25rem;
  }
}
</style>
