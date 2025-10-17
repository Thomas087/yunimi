<script setup lang="ts">
interface Props {
  maxWidth?: string
  padding?: string
}

withDefaults(defineProps<Props>(), {
  maxWidth: '1200px',
  padding: '0 20px'
})
</script>

<template>
  <div class="container" :style="{ maxWidth, padding }">
    <slot />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
}
</style>
