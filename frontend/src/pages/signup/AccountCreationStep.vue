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
    <div class="signup-step-header">
      <h2 class="signup-step-title">Account Creation</h2>
      <p class="signup-step-subtitle">Let us know about your social media accounts for the selected platforms</p>
    </div>

    <div class="platform-accounts">
      <div 
        v-for="platform in selectedPlatforms" 
        :key="platform"
        class="platform-account-card"
      >
        <div class="signup-step-card account-card">
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
          
          <div class="signup-field account-option">
            <label :for="`${platform}-option`" class="signup-field-label option-label">
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
              class="signup-dropdown account-dropdown"
            />
            <Message 
              v-if="getPlatformError(platform)" 
              severity="error" 
              :closable="false"
              class="signup-error-message error-message"
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
@import '../../styles/signup-steps.css';

.account-creation-step {
  padding: 0;
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

/* Responsive Design */
@media (max-width: 768px) {
  .platform-accounts {
    gap: 1.5rem;
  }
  
  .platform-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
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
