<script setup lang="ts">
import { computed } from 'vue'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
import Card from 'primevue/card'
import { getPlatformConfig } from '../../constants/platforms'
import PlatformIcon from '../../components/shared/PlatformIcon.vue'

interface PlatformAccountOption {
  platform: string
  option: string
}

interface AccountCreationData {
  platformOptions: PlatformAccountOption[]
}

interface Props {
  modelValue: AccountCreationData
  errors: Record<string, string>
  selectedPlatforms: string[]
}

interface Emits {
  (e: 'update:modelValue', value: AccountCreationData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const accountCreationData = computed({
  get: () => props.modelValue,
  set: (value: AccountCreationData) => emit('update:modelValue', value)
})

const accountOptions = [
  { label: 'I already have an account', value: 'existing' },
  { label: 'I\'ll create an account myself', value: 'self_create' },
  { label: 'I need help creating an account', value: 'need_help' }
]

const getPlatformLabel = (platformValue: string): string => {
  const config = getPlatformConfig(platformValue)
  return config ? config.label : platformValue
}

const updatePlatformOption = (platform: string, option: string) => {
  const currentOptions = [...accountCreationData.value.platformOptions]
  const existingIndex = currentOptions.findIndex(item => item.platform === platform)
  
  if (existingIndex > -1) {
    // Update existing option
    currentOptions[existingIndex] = { platform, option }
  } else {
    // Add new option
    currentOptions.push({ platform, option })
  }
  
  accountCreationData.value = {
    ...accountCreationData.value,
    platformOptions: currentOptions
  }
}

const getPlatformOption = (platform: string) => {
  const option = accountCreationData.value.platformOptions.find(item => item.platform === platform)
  return option ? option.option : ''
}

const getPlatformError = (platform: string) => {
  return props.errors[`${platform}_option`] || ''
}
</script>

<template>
  <div class="account-creation-step">
    <div class="step-header">
      <h2>Account Creation</h2>
      <p>Let us know about your social media accounts for the selected platforms</p>
    </div>

    <div class="platform-accounts">
      <div 
        v-for="platform in selectedPlatforms" 
        :key="platform"
        class="platform-account-card"
      >
        <Card class="account-card">
          <template #content>
            <div class="platform-header">
              <div class="platform-info">
                <PlatformIcon 
                  :platform="platform" 
                  size="medium"
                  :useImage="true"
                />
                <h3 class="platform-name">{{ getPlatformLabel(platform) }}</h3>
              </div>
            </div>
            
            <div class="account-option">
              <label :for="`${platform}-option`" class="option-label">
                Account Status
              </label>
              <Dropdown
                :id="`${platform}-option`"
                :modelValue="getPlatformOption(platform)"
                :options="accountOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select an option"
                :class="{ 'p-invalid': getPlatformError(platform) }"
                @change="updatePlatformOption(platform, $event.value)"
                class="account-dropdown"
              />
              <Message 
                v-if="getPlatformError(platform)" 
                severity="error" 
                :closable="false"
                class="error-message"
              >
                {{ getPlatformError(platform) }}
              </Message>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div class="step-info">
      <div class="info-card">
        <h4>Account Creation Options</h4>
        <ul>
          <li><strong>I already have an account:</strong> We'll help you connect your existing account</li>
          <li><strong>I'll create an account myself:</strong> You'll handle account creation independently</li>
          <li><strong>I need help creating an account:</strong> Our team will guide you through the process</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-creation-step {
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

.platform-accounts {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.platform-account-card {
  width: 100%;
}

.account-card {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.account-card:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.platform-header {
  margin-bottom: 1.5rem;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.platform-icon {
  font-size: 1.5rem;
}

.platform-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.account-option {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

.account-dropdown {
  width: 100%;
}

.error-message {
  margin-top: 0.25rem;
}

.step-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #6f42c1;
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
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.info-card li strong {
  color: #2c3e50;
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-header h2 {
    font-size: 1.5rem;
  }
  
  .platform-accounts {
    gap: 1.25rem;
  }
  
  .step-info {
    padding: 1rem;
  }
  
  .platform-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .platform-info {
    text-align: center;
  }
  
  .platform-icon {
    font-size: 2rem;
  }
}
</style>
