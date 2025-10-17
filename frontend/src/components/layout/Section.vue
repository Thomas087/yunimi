<script setup lang="ts">
interface Props {
  padding?: string
  background?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  padding: '100px 20px',
  background: 'transparent'
})
</script>

<template>
  <section 
    class="section" 
    :class="className"
    :style="{ padding, background }"
  >
    <slot />
  </section>
</template>

<style scoped>
.section {
  width: 100%;
}
</style>
