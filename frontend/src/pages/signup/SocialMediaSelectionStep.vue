<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'

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

const socialMediaOptions = [
  { 
    value: 'red', 
    label: 'Red', 
    description: 'China\'s leading social media platform',
    icon: '🔴'
  },
  { 
    value: 'weibo', 
    label: 'Weibo', 
    description: 'China\'s Twitter equivalent',
    icon: '📱'
  },
  { 
    value: 'wechat', 
    label: 'WeChat', 
    description: 'Multi-purpose messaging and social app',
    icon: '💬'
  },
  { 
    value: 'douyin', 
    label: 'Douyin', 
    description: 'China\'s TikTok - short video platform',
    icon: '🎵'
  }
]

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
    <div class="step-header">
      <h2>Social Media Selection</h2>
      <p>Which Chinese social media platforms do you wish to publish to?</p>
    </div>

    <div class="platform-selection">
      <div class="platform-grid">
        <div 
          v-for="platform in socialMediaOptions" 
          :key="platform.value"
          class="platform-card"
          :class="{ 'selected': isPlatformSelected(platform.value) }"
          @click="togglePlatform(platform.value)"
        >
          <div class="platform-content">
            <div class="platform-header">
              <span class="platform-icon">{{ platform.icon }}</span>
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
        class="error-message"
      >
        {{ errors.selectedPlatforms }}
      </Message>
    </div>

    <div class="step-info">
      <div class="info-card">
        <h4>Why select social media platforms?</h4>
        <ul>
          <li>We'll help you optimize content for each platform's unique audience</li>
          <li>Different platforms have different content formats and best practices</li>
          <li>You can always add or remove platforms later in your account settings</li>
          <li>Each platform offers different engagement and reach opportunities</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.social-media-step {
  padding: 1rem 0;
}

.step-header {
  text-align: center;
  margin-bottom: 2rem;
}

.step-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.platform-selection {
  margin-bottom: 2rem;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.platform-card {
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.platform-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}

.platform-card.selected {
  border-color: #007bff;
  background-color: #f8f9ff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.platform-content {
  text-align: center;
}

.platform-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.platform-icon {
  font-size: 2rem;
}

.platform-checkbox {
  margin: 0;
}

.platform-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.platform-description {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.error-message {
  margin-top: 1rem;
}

.step-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #17a2b8;
}

.info-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.info-card ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #6c757d;
}

.info-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-header h2 {
    font-size: 1.5rem;
  }
  
  .platform-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .platform-card {
    padding: 1.25rem;
  }
  
  .step-info {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .platform-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  
  .platform-checkbox {
    order: -1;
  }
}
</style>
