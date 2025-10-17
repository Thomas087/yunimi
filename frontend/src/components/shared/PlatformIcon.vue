<script setup lang="ts">
import { computed } from 'vue'
import { getPlatformIcon, getPlatformImagePath } from '../../constants/platforms'

interface Props {
  platform: string
  size?: 'small' | 'medium' | 'large'
  useImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  useImage: false
})

const icon = computed(() => getPlatformIcon(props.platform))
const imagePath = computed(() => getPlatformImagePath(props.platform))

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'platform-icon-small'
    case 'large':
      return 'platform-icon-large'
    default:
      return 'platform-icon-medium'
  }
})
</script>

<template>
  <div class="platform-icon-wrapper" :class="sizeClasses">
    <img 
      v-if="useImage && imagePath" 
      :src="imagePath" 
      :alt="`${platform} icon`"
      class="platform-icon-image"
      @error="$event.target.style.display = 'none'"
    />
    <span 
      v-else 
      class="platform-icon-emoji"
    >
      {{ icon }}
    </span>
  </div>
</template>

<style scoped>
.platform-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.platform-icon-small {
  width: 24px;
  height: 24px;
}

.platform-icon-medium {
  width: 32px;
  height: 32px;
}

.platform-icon-large {
  width: 48px;
  height: 48px;
}

.platform-icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.platform-icon-emoji {
  font-size: inherit;
  line-height: 1;
}
</style>
