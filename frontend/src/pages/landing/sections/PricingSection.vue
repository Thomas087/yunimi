<script setup lang="ts">
import { ref } from 'vue'
import Button from "primevue/button"

const plans = ref([
  {
    name: "Starter",
    price: "$99",
    features: [
      "AI translations",
      "Automated publishing",
      "1 social network"
    ],
    popular: false
  },
  {
    name: "Standard",
    price: "$149",
    features: [
      "AI translations",
      "Automated publishing",
      "3 social networks"
    ],
    popular: true
  },
  {
    name: "Advanced",
    price: "$199",
    features: [
      "AI translations",
      "Automated publishing",
      "5 social networks",
      "Human review"
    ],
    popular: false
  }
])

const handleGetStarted = (planName: string) => {
  // Navigate to signup with plan selection
  console.log(`Selected plan: ${planName}`)
  // You can add routing logic here if needed
}
</script>

<template>
  <section id="pricing" class="pricing-section">
    <div class="pricing-container">
      <div class="pricing-header">
        <h2 class="section-title">Choose your plan</h2>
        <p class="section-subtitle">
          Select the perfect plan for your brand's needs in China.
        </p>
      </div>
      
      <div class="pricing-grid">
        <div 
          v-for="plan in plans" 
          :key="plan.name"
          class="pricing-card"
          :class="{ 'popular': plan.popular }"
        >
          <div v-if="plan.popular" class="popular-badge">
            Most Popular
          </div>
          
          <div class="plan-header">
            <h3 class="plan-name">{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="price-amount">{{ plan.price }}</span>
              <span class="price-period">/month</span>
            </div>
          </div>
          
          <div class="plan-features">
            <ul class="features-list">
              <li v-for="feature in plan.features" :key="feature" class="feature-item">
                <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="plan-action">
            <Button 
              :label="plan.popular ? 'Get Started' : 'Choose Plan'"
              :severity="plan.popular ? 'primary' : 'secondary'"
              size="large"
              class="plan-button"
              @click="handleGetStarted(plan.name)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e293b;
  padding: 80px 20px;
}

.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-header {
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

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  align-items: stretch;
}

.pricing-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.pricing-card.popular {
  border-color: #3b82f6;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}

.price-amount {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.price-period {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

.plan-features {
  flex: 1;
  margin-bottom: 2rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #374151;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #10b981;
  flex-shrink: 0;
}

.plan-action {
  margin-top: auto;
}

.plan-button {
  width: 100%;
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 968px) {
  .pricing-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .pricing-header {
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pricing-section {
    padding: 50px 20px;
  }
  
  .pricing-card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .pricing-section {
    padding: 40px 20px;
  }
  
  .pricing-header {
    margin-bottom: 2.5rem;
  }
  
  .price-amount {
    font-size: 2.5rem;
  }
  
  .pricing-card {
    padding: 1.5rem 1rem;
  }
}
</style>
