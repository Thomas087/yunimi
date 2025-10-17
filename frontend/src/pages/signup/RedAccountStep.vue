<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Message from 'primevue/message'

interface RedAccountData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface Props {
  modelValue: RedAccountData
  errors: Record<string, string>
}

interface Emits {
  (e: 'update:modelValue', value: RedAccountData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const redAccountData = computed({
  get: () => props.modelValue,
  set: (value: RedAccountData) => emit('update:modelValue', value)
})

const updateField = (field: keyof RedAccountData, value: string) => {
  redAccountData.value = {
    ...redAccountData.value,
    [field]: value
  }
}

const passwordStrength = computed(() => {
  const password = redAccountData.value.password
  if (!password) return { score: 0, label: '', color: '' }
  
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  const strengthMap = [
    { score: 0, label: 'Very Weak', color: '#dc3545' },
    { score: 1, label: 'Weak', color: '#fd7e14' },
    { score: 2, label: 'Fair', color: '#ffc107' },
    { score: 3, label: 'Good', color: '#20c997' },
    { score: 4, label: 'Strong', color: '#198754' },
    { score: 5, label: 'Very Strong', color: '#0d6efd' }
  ]
  
  return strengthMap[Math.min(score, 5)]
})
</script>

<template>
  <div class="red-account-step">
    <div class="step-header">
      <h2>Create Your Red Account</h2>
      <p>Set up your account credentials to access the platform</p>
    </div>

    <div class="form-fields">
      <div class="field">
        <label for="username">Username *</label>
        <InputText
          id="username"
          v-model="redAccountData.username"
          placeholder="Choose a unique username"
          :class="{ 'p-invalid': errors.username }"
          @input="updateField('username', $event.target.value)"
        />
        <Message 
          v-if="errors.username" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.username }}
        </Message>
      </div>

      <div class="field">
        <label for="email">Email Address *</label>
        <InputText
          id="email"
          v-model="redAccountData.email"
          type="email"
          placeholder="your.email@company.com"
          :class="{ 'p-invalid': errors.email }"
          @input="updateField('email', $event.target.value)"
        />
        <Message 
          v-if="errors.email" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.email }}
        </Message>
      </div>

      <div class="field">
        <label for="password">Password *</label>
        <Password
          id="password"
          v-model="redAccountData.password"
          placeholder="Create a strong password"
          :class="{ 'p-invalid': errors.password }"
          @input="updateField('password', $event)"
          :feedback="true"
          toggleMask
        />
        <div v-if="redAccountData.password" class="password-strength">
          <div class="strength-bar">
            <div 
              class="strength-fill" 
              :style="{ 
                width: `${(passwordStrength.score / 5) * 100}%`,
                backgroundColor: passwordStrength.color
              }"
            ></div>
          </div>
          <span 
            class="strength-label" 
            :style="{ color: passwordStrength.color }"
          >
            {{ passwordStrength.label }}
          </span>
        </div>
        <Message 
          v-if="errors.password" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.password }}
        </Message>
      </div>

      <div class="field">
        <label for="confirmPassword">Confirm Password *</label>
        <Password
          id="confirmPassword"
          v-model="redAccountData.confirmPassword"
          placeholder="Confirm your password"
          :class="{ 'p-invalid': errors.confirmPassword }"
          @input="updateField('confirmPassword', $event)"
          toggleMask
        />
        <Message 
          v-if="errors.confirmPassword" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.confirmPassword }}
        </Message>
      </div>
    </div>

    <div class="step-info">
      <div class="info-card">
        <h4>Password Requirements</h4>
        <ul>
          <li>At least 8 characters long</li>
          <li>Contains uppercase and lowercase letters</li>
          <li>Includes at least one number</li>
          <li>Contains special characters for better security</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.red-account-step {
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

.password-strength {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-label {
  font-size: 0.85rem;
  font-weight: 500;
  min-width: 80px;
}

.error-message {
  margin-top: 0.25rem;
}

.step-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #28a745;
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
  
  .form-fields {
    gap: 1.25rem;
  }
  
  .step-info {
    padding: 1rem;
  }
  
  .password-strength {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .strength-bar {
    width: 100%;
  }
}
</style>
