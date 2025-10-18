<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

interface CompanyData {
  professionalEmail: string
  name: string
  website: string
  instagram: string
}

interface Props {
  modelValue: CompanyData
  errors: Record<string, string>
}

interface Emits {
  (e: 'update:modelValue', value: CompanyData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const companyData = computed({
  get: () => props.modelValue,
  set: (value: CompanyData) => emit('update:modelValue', value)
})

// Validation helper functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidUrl = (url: string): boolean => {
  if (!url || url.trim().length === 0) return false
  
  try {
    // Add protocol if missing
    const urlToTest = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
    const urlObj = new URL(urlToTest)
    
    // Check if it has a valid hostname (domain)
    if (!urlObj.hostname || urlObj.hostname.length < 3) return false
    
    // Check if hostname contains at least one dot (for domain extension)
    if (!urlObj.hostname.includes('.')) return false
    
    // Check if hostname doesn't contain spaces or invalid characters
    if (urlObj.hostname.includes(' ') || urlObj.hostname.includes('..')) return false
    
    // Check that the domain extension is at least 2 characters
    const parts = urlObj.hostname.split('.')
    if (parts.length < 2 || parts[parts.length - 1].length < 2) return false
    
    return true
  } catch {
    return false
  }
}

const updateField = (field: keyof CompanyData, value: string) => {
  companyData.value = {
    ...companyData.value,
    [field]: value
  }
}
</script>

<template>
  <div class="company-info-step">
    <div class="signup-step-header">
      <h2 class="signup-step-title">Company Information</h2>
      <p class="signup-step-subtitle">Tell us about your company to get started</p>
    </div>

    <div class="form-fields">
      <div class="signup-field field">
        <label for="professionalEmail" class="signup-field-label field-label">Professional Email *</label>
        <InputText
          id="professionalEmail"
          name="professionalEmail"
          v-model="companyData.professionalEmail"
          type="email"
          autocomplete="email"
          placeholder="your.email@company.com"
          :class="{ 
            'p-invalid': errors.professionalEmail || (companyData.professionalEmail && !isValidEmail(companyData.professionalEmail))
          }"
          @input="updateField('professionalEmail', ($event.target as HTMLInputElement).value)"
          class="signup-form-input form-input"
        />
        <Message 
          v-if="errors.professionalEmail || (companyData.professionalEmail && !isValidEmail(companyData.professionalEmail))" 
          severity="error" 
          :closable="false"
          class="signup-error-message error-message"
        >
          {{ errors.professionalEmail || 'Please enter a valid email address' }}
        </Message>
      </div>

      <div class="signup-field field">
        <label for="companyName" class="signup-field-label field-label">Company Name *</label>
        <InputText
          id="companyName"
          name="companyName"
          v-model="companyData.name"
          type="text"
          autocomplete="organization"
          placeholder="Enter your company name"
          :class="{ 'p-invalid': errors.companyName }"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
          class="signup-form-input form-input"
        />
        <Message 
          v-if="errors.companyName" 
          severity="error" 
          :closable="false"
          class="signup-error-message error-message"
        >
          {{ errors.companyName }}
        </Message>
      </div>

      <div class="signup-field field">
        <label for="website" class="signup-field-label field-label">Website URL *</label>
        <InputText
          id="website"
          name="website"
          v-model="companyData.website"
          type="url"
          autocomplete="url"
          placeholder="https://yourcompany.com"
          :class="{ 
            'p-invalid': errors.website || (companyData.website && !isValidUrl(companyData.website))
          }"
          @input="updateField('website', ($event.target as HTMLInputElement).value)"
          class="signup-form-input form-input"
        />
        <Message 
          v-if="errors.website || (companyData.website && !isValidUrl(companyData.website))" 
          severity="error" 
          :closable="false"
          class="signup-error-message error-message"
        >
          {{ errors.website || 'Please enter a valid website URL (e.g., https://example.com)' }}
        </Message>
      </div>

      <div class="signup-field field">
        <label for="instagram" class="signup-field-label field-label">Instagram Account *</label>
        <div class="signup-input-group input-group">
          <span class="signup-input-prefix input-prefix">@</span>
          <InputText
            id="instagram"
            name="instagram"
            v-model="companyData.instagram"
            type="text"
            autocomplete="username"
            placeholder="yourcompany"
            :class="{ 'p-invalid': errors.instagram }"
            @input="updateField('instagram', ($event.target as HTMLInputElement).value)"
            class="signup-form-input form-input"
          />
        </div>
        <Message 
          v-if="errors.instagram" 
          severity="error" 
          :closable="false"
          class="signup-error-message error-message"
        >
          {{ errors.instagram }}
        </Message>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/signup-steps.css';

.company-info-step {
  padding: 0;
}

.form-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 0;
}


/* Responsive Design */
@media (max-width: 768px) {
  .form-fields {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .form-fields {
    gap: 1.25rem;
  }
}
</style>
