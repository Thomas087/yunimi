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
  <Section>
    <Container>
      <div class="about-content">
        <div class="about-text">
          <h2>About Yunimi</h2>
          <p>
            We are passionate about creating solutions that make a difference. 
            Our team of experts works tirelessly to deliver products that not only 
            meet your needs but exceed your expectations.
          </p>
          <p>
            Founded with a vision to simplify complex processes, Yunimi has grown 
            to become a trusted partner for businesses of all sizes. We believe 
            in the power of technology to transform the way we work and live.
          </p>
          <Button 
            label="Contact Us" 
            size="large"
            @click="handleContact"
          />
        </div>
        <div class="about-stats">
          <StatCard value="10K+" label="Happy Customers" />
          <StatCard value="99.9%" label="Uptime" />
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
