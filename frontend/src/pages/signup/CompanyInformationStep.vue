<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import StepInfo from '../../components/shared/StepInfo.vue'

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
      <h2>Company Information</h2>
      <p>Tell us about your company to get started</p>
    </div>

    <div class="form-fields">
      <div class="field">
        <label for="professionalEmail">Professional Email *</label>
        <InputText
          id="professionalEmail"
          v-model="companyData.professionalEmail"
          type="email"
          placeholder="your.email@company.com"
          :class="{ 'p-invalid': errors.professionalEmail }"
          @input="updateField('professionalEmail', $event.target.value)"
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
        <label for="companyName">Company Name *</label>
        <InputText
          id="companyName"
          v-model="companyData.name"
          placeholder="Enter your company name"
          :class="{ 'p-invalid': errors.companyName }"
          @input="updateField('name', $event.target.value)"
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
        <label for="website">Website URL *</label>
        <InputText
          id="website"
          v-model="companyData.website"
          placeholder="https://yourcompany.com"
          :class="{ 'p-invalid': errors.website }"
          @input="updateField('website', $event.target.value)"
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
        <label for="instagram">Instagram Account *</label>
        <div class="input-group">
          <span class="input-prefix">@</span>
          <InputText
            id="instagram"
            v-model="companyData.instagram"
            placeholder="yourcompany"
            :class="{ 'p-invalid': errors.instagram }"
            @input="updateField('instagram', $event.target.value)"
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

    <StepInfo
      title="Why do we need this information?"
      :items="[
        'Professional email helps us verify your business identity',
        'Company name helps us personalize your experience',
        'Website URL allows us to verify your business',
        'Instagram account helps us connect your social presence'
      ]"
      variant="primary"
    />
  </div>
</template>

<style scoped>
.company-info-step {
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

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 12px;
  color: #6c757d;
  font-weight: 500;
  z-index: 1;
}

.input-group :deep(.p-inputtext) {
  padding-left: 2rem;
}

.error-message {
  margin-top: 0.25rem;
}


/* Responsive Design */
@media (max-width: 768px) {
  .step-header h2 {
    font-size: 1.5rem;
  }
  
  .form-fields {
    gap: 1.25rem;
  }
  
}
</style>
