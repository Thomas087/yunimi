<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
}

defineProps<Props>()
</script>

<template>
  <div class="feature-card">
    <div class="feature-icon">
      <img :src="icon" :alt="title" class="icon-image" />
    </div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.feature-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.05);
}

.icon-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .feature-icon {
    width: 70px;
    height: 70px;
  }
  
  .icon-image {
    width: 42px;
    height: 42px;
  }
  
  .feature-title {
    font-size: 1.375rem;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 1.75rem 1.25rem;
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
  }
  
  .icon-image {
    width: 36px;
    height: 36px;
  }
  
  .feature-title {
    font-size: 1.25rem;
  }
  
  .feature-description {
    font-size: 0.95rem;
  }
}
</style>
