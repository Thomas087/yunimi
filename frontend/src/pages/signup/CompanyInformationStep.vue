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

const updateField = (field: keyof CompanyData, value: string) => {
  companyData.value = {
    ...companyData.value,
    [field]: value
  }
}
</script>

<template>
  <div class="company-info-step">
    <div class="step-header">
      <h2 class="step-title">Company Information</h2>
      <p class="step-subtitle">Tell us about your company to get started</p>
    </div>

    <div class="form-fields">
      <div class="field">
        <label for="professionalEmail" class="field-label">Professional Email *</label>
        <InputText
          id="professionalEmail"
          v-model="companyData.professionalEmail"
          type="email"
          placeholder="your.email@company.com"
          :class="{ 'p-invalid': errors.professionalEmail }"
          @input="updateField('professionalEmail', ($event.target as HTMLInputElement).value)"
          class="form-input"
        />
        <Message 
          v-if="errors.professionalEmail" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.professionalEmail }}
        </Message>
      </div>

      <div class="field">
        <label for="companyName" class="field-label">Company Name *</label>
        <InputText
          id="companyName"
          v-model="companyData.name"
          placeholder="Enter your company name"
          :class="{ 'p-invalid': errors.companyName }"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
          class="form-input"
        />
        <Message 
          v-if="errors.companyName" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.companyName }}
        </Message>
      </div>

      <div class="field">
        <label for="website" class="field-label">Website URL *</label>
        <InputText
          id="website"
          v-model="companyData.website"
          placeholder="https://yourcompany.com"
          :class="{ 'p-invalid': errors.website }"
          @input="updateField('website', ($event.target as HTMLInputElement).value)"
          class="form-input"
        />
        <Message 
          v-if="errors.website" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.website }}
        </Message>
      </div>

      <div class="field">
        <label for="instagram" class="field-label">Instagram Account *</label>
        <div class="input-group">
          <span class="input-prefix">@</span>
          <InputText
            id="instagram"
            v-model="companyData.instagram"
            placeholder="yourcompany"
            :class="{ 'p-invalid': errors.instagram }"
            @input="updateField('instagram', ($event.target as HTMLInputElement).value)"
            class="form-input"
          />
        </div>
        <Message 
          v-if="errors.instagram" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.instagram }}
        </Message>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-info-step {
  padding: 0;
}

.step-header {
  text-align: center;
  margin-bottom: 3rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.step-subtitle {
  font-size: 1.1rem;
  margin-bottom: 0;
  opacity: 0.7;
  color: #1e293b;
  margin-left: auto;
  margin-right: auto;
}

.form-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-label {
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.form-input {
  width: 100%;
}

.form-input :deep(.p-inputtext) {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #ffffff;
}

.form-input :deep(.p-inputtext:focus) {
  border-color: var(--p-primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.form-input :deep(.p-inputtext:hover) {
  border-color: #cbd5e1;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 1rem;
  color: #64748b;
  font-weight: 500;
  z-index: 1;
  font-size: 1rem;
}

.input-group :deep(.p-inputtext) {
  padding-left: 2.5rem;
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
  .form-fields {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .step-title {
    font-size: 1.75rem;
  }
  
  .step-header {
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .step-title {
    font-size: 1.5rem;
  }
  
  .step-header {
    margin-bottom: 1.5rem;
  }
  
  .form-fields {
    gap: 1.25rem;
  }
}
</style>
