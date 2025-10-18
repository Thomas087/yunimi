<script setup lang="ts">
interface Props {
  value: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="stat-card">
    <h3 class="stat-value">{{ value }}</h3>
    <p class="stat-label">{{ label }}</p>
  </div>
</template>

<style scoped>
.stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  color: #64748b;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
