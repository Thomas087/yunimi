<script setup lang="ts">
import Card from "primevue/card"

interface Props {
  title: string
  description: string
  icon: string
}

defineProps<Props>()
</script>

<template>
  <Card class="feature-card">
    <template #header>
      <div class="feature-icon">
        <img :src="icon" :alt="title" class="icon-image" />
      </div>
    </template>
    <template #title>
      <h3>{{ title }}</h3>
    </template>
    <template #content>
      <p>{{ description }}</p>
    </template>
  </Card>
</template>

<style scoped>
.feature-card {
  text-align: center;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6c757d;
  line-height: 1.6;
}
</style>
