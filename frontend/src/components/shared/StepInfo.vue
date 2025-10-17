<script setup lang="ts">
interface Props {
  title: string
  items: string[]
  variant?: 'info' | 'success' | 'warning' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info'
})

</script>

<template>
  <div class="step-info">
    <div class="info-card">
      <h4>{{ title }}</h4>
      <ul>
        <li v-for="item in items" :key="item" v-html="item"></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.step-info {
  background: var(--surface-50, #f8f9fa);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--p-primary-color)
}

.info-card h4 {
  color: var(--text-color, #2c3e50);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.info-card ul {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--text-color-secondary, #6c757d);
}

.info-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.info-card li strong {
  color: var(--text-color, #2c3e50);
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-info {
    padding: 1rem;
  }
}
</style>
