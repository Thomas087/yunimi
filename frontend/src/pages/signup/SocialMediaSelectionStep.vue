<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import { PLATFORM_CONFIGS } from '../../constants/platforms'
import PlatformIcon from '../../components/shared/PlatformIcon.vue'

interface SocialMediaData {
  selectedPlatforms: string[]
}

interface Props {
  modelValue: SocialMediaData
  errors: Record<string, string>
}

interface Emits {
  (e: 'update:modelValue', value: SocialMediaData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const socialMediaData = computed({
  get: () => props.modelValue,
  set: (value: SocialMediaData) => emit('update:modelValue', value)
})

const socialMediaOptions = PLATFORM_CONFIGS

const togglePlatform = (platformValue: string, event?: Event) => {
  // Prevent event bubbling if this is called from checkbox click
  if (event) {
    event.stopPropagation()
  }
  
  const currentPlatforms = [...socialMediaData.value.selectedPlatforms]
  const index = currentPlatforms.indexOf(platformValue)
  
  if (index > -1) {
    // Remove if already selected
    currentPlatforms.splice(index, 1)
  } else {
    // Add if not selected
    currentPlatforms.push(platformValue)
  }
  
  socialMediaData.value = {
    ...socialMediaData.value,
    selectedPlatforms: currentPlatforms
  }
}

const isPlatformSelected = (platformValue: string) => {
  return socialMediaData.value.selectedPlatforms.includes(platformValue)
}
</script>

<template>
  <div class="social-media-step">
    <div class="signup-step-header">
      <h2 class="signup-step-title">Social Media Selection</h2>
      <p class="signup-step-subtitle">Which Chinese social media platforms do you wish to publish to?</p>
    </div>

    <div class="platform-selection">
      <div class="platform-grid">
        <div 
          v-for="platform in socialMediaOptions" 
          :key="platform.value"
          class="signup-step-card platform-card"
          :class="{ 'selected': isPlatformSelected(platform.value) }"
          @click="togglePlatform(platform.value)"
        >
          <div class="platform-content">
            <div class="platform-header">
              <PlatformIcon 
                :platform="platform.value" 
                size="large"
                :useImage="true"
              />
              <Checkbox 
                :modelValue="isPlatformSelected(platform.value)"
                :binary="true"
                @change="togglePlatform(platform.value, $event)"
                @click.stop
                class="platform-checkbox"
              />
            </div>
            <h3 class="platform-name">{{ platform.label }}</h3>
            <p class="platform-description">{{ platform.description }}</p>
          </div>
        </div>
      </div>
      
      <Message 
        v-if="errors.selectedPlatforms" 
        severity="error" 
        :closable="false"
        class="signup-error-message error-message"
      >
        {{ errors.selectedPlatforms }}
      </Message>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/signup-steps.css';

.social-media-step {
  padding: 0;
}

.platform-selection {
  margin-bottom: 0;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 1rem;
}

.platform-card {
  cursor: pointer;
  position: relative;
}

.platform-card:hover {
  transform: translateY(-4px);
}

.platform-card.selected {
  border-color: var(--p-primary-color);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.platform-content {
  text-align: center;
}

.platform-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.platform-icon {
  font-size: 2.5rem;
}

.platform-checkbox {
  margin: 0;
}

.platform-checkbox :deep(.p-checkbox-box) {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  width: 1.5rem;
  height: 1.5rem;
  transition: all 0.3s ease;
}

.platform-checkbox :deep(.p-checkbox-box.p-highlight) {
  background: var(--p-primary-color);
  border-color: var(--p-primary-color);
}

.platform-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.platform-description {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  opacity: 0.8;
}


/* Responsive Design */
@media (max-width: 768px) {
  .platform-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .platform-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  
  .platform-checkbox {
    order: -1;
  }
  
  .platform-name {
    font-size: 1.2rem;
  }
  
  .platform-description {
    font-size: 0.9rem;
  }
}
</style>
