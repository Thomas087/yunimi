<script setup lang="ts">
import { computed } from 'vue'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
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
  console.log('updatePlatformOption called with:', { platform, option })
  console.log('Current platformOptions before update:', accountCreationData.value.platformOptions)
  
  const currentOptions = [...accountCreationData.value.platformOptions]
  const existingIndex = currentOptions.findIndex(item => item.platform === platform)
  
  if (existingIndex > -1) {
    // Update existing option
    currentOptions[existingIndex] = { platform, option }
  } else {
    // Add new option
    currentOptions.push({ platform, option })
  }
  
  console.log('Updated platformOptions:', currentOptions)
  
  accountCreationData.value = {
    ...accountCreationData.value,
    platformOptions: currentOptions
  }
  
  console.log('Final accountCreationData.value:', accountCreationData.value)
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
      <h2 class="step-title">Account Creation</h2>
      <p class="step-subtitle">Let us know about your social media accounts for the selected platforms</p>
    </div>

    <div class="platform-accounts">
      <div 
        v-for="platform in selectedPlatforms" 
        :key="platform"
        class="platform-account-card"
      >
        <div class="account-card">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-creation-step {
  padding: 0;
}

.step-header {
  text-align: center;
  margin-bottom: 3rem;
}

.step-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: #1e293b;
}

.step-subtitle {
  font-size: 1.1rem;
  margin-bottom: 0;
  opacity: 0.7;
  line-height: 1.6;
  color: #1e293b;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.platform-accounts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 0;
}

.platform-account-card {
  width: 100%;
}

.account-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.account-card:hover {
  border-color: var(--p-primary-color);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.platform-header {
  margin-bottom: 2rem;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.platform-icon {
  font-size: 2rem;
}

.platform-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
}

.account-option {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-label {
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.account-dropdown {
  width: 100%;
}

.account-dropdown :deep(.p-dropdown) {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.account-dropdown :deep(.p-dropdown:not(.p-disabled):hover) {
  border-color: #cbd5e1;
}

.account-dropdown :deep(.p-dropdown:not(.p-disabled).p-focus) {
  border-color: var(--p-primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.account-dropdown :deep(.p-dropdown-label) {
  padding: 0.875rem 1rem;
  font-size: 1rem;
}

.error-message {
  margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 968px) {
  .step-title {
    font-size: 2rem;
  }
  
  .step-subtitle {
    font-size: 1rem;
  }
  
  .step-header {
    margin-bottom: 2.5rem;
  }
}

@media (max-width: 768px) {
  .platform-accounts {
    gap: 1.5rem;
  }
  
  .account-card {
    padding: 1.5rem;
  }
  
  .step-title {
    font-size: 1.75rem;
  }
  
  .step-header {
    margin-bottom: 2rem;
  }
  
  .platform-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .account-card {
    padding: 1.25rem;
  }
  
  .step-title {
    font-size: 1.5rem;
  }
  
  .step-header {
    margin-bottom: 1.5rem;
  }
  
  .platform-info {
    text-align: center;
    align-items: center;
  }
  
  .platform-icon {
    font-size: 2.5rem;
  }
  
  .platform-name {
    font-size: 1.2rem;
  }
}
</style>
