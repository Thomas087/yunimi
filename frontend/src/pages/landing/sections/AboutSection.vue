<script setup lang="ts">
import Button from "primevue/button"
import Container from '../../../components/layout/Container.vue'
import Section from '../../../components/layout/Section.vue'
import StatCard from '../../../components/shared/StatCard.vue'

const handleContact = () => {
  console.log('Contact clicked')
  // Add your contact logic here
}
</script>

<template>
  <Section id="about">
    <Container>
      <div class="about-content">
        <div class="about-text">
          <h2>About Yunimi</h2>
          <p>
            Based in Beijing, Shanghai and Paris, we are a dedicated team of developers and marketers passionate about bridging the gap between Western brands and Chinese consumers.
          </p>
          <p>
            Our solutions are easy to use, compliant with Chinese regulations. Our support team is available 24/7 to help you with any questions you may have.
          </p>
          <Button 
            label="Get started" 
            size="large"
            @click="handleContact"
          />
        </div>
        <div class="about-stats">
          <StatCard value="300+" label="Happy Customers" />
          <StatCard value="35 000" label="Posts published" />
          <StatCard value="24/7" label="Support" />
        </div>
      </div>
    </Container>
  </Section>
</template>

<style scoped>
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #6c757d;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-stats {
    flex-direction: row;
    justify-content: space-around;
  }
}

@media (max-width: 480px) {
  .about-text h2 {
    font-size: 2rem;
  }
}
</style>
