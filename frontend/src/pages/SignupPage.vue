<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import Card from 'primevue/card'
import CompanyInformationStep from './signup/CompanyInformationStep.vue'
import SocialMediaSelectionStep from './signup/SocialMediaSelectionStep.vue'
import AccountCreationStep from './signup/AccountCreationStep.vue'
import PaymentStep from './signup/PaymentStep.vue'

const router = useRouter()

// Step management
const activeStep = ref(0)
const steps = [
  { label: 'Company Info' },
  { label: 'Social Media' },
  { label: 'Account Creation' },
  { label: 'Payment' }
]

// Form data
const formData = reactive({
  company: {
    professionalEmail: '',
    name: '',
    website: '',
    instagram: ''
  },
  socialMedia: {
    selectedPlatforms: []
  },
  accountCreation: {
    platformOptions: []
  },
  payment: {
    plan: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  }
})

// Validation state
const validationErrors = ref<Record<string, string>>({})

const validateCurrentStep = () => {
  const errors: Record<string, string> = {}
  
  if (activeStep.value === 0) {
    if (!formData.company.professionalEmail) errors.professionalEmail = 'Professional email is required'
    if (!formData.company.name) errors.companyName = 'Company name is required'
    if (!formData.company.website) errors.website = 'Website URL is required'
    if (!formData.company.instagram) errors.instagram = 'Instagram account is required'
  } else if (activeStep.value === 1) {
    if (formData.socialMedia.selectedPlatforms.length === 0) {
      errors.selectedPlatforms = 'Please select at least one social media platform'
    }
  } else if (activeStep.value === 2) {
    // Validate that each selected platform has an option chosen
    formData.socialMedia.selectedPlatforms.forEach(platform => {
      const hasOption = formData.accountCreation.platformOptions.some(
        option => option.platform === platform
      )
      if (!hasOption) {
        errors[`${platform}_option`] = `Please select an option for ${platform}`
      }
    })
  } else if (activeStep.value === 3) {
    if (!formData.payment.plan) errors.plan = 'Please select a plan'
    if (!formData.payment.cardNumber) errors.cardNumber = 'Card number is required'
    if (!formData.payment.expiryDate) errors.expiryDate = 'Expiry date is required'
    if (!formData.payment.cvv) errors.cvv = 'CVV is required'
    if (!formData.payment.cardholderName) errors.cardholderName = 'Cardholder name is required'
  }
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const nextStep = () => {
  if (validateCurrentStep()) {
    if (activeStep.value < steps.length - 1) {
      activeStep.value++
    } else {
      // Complete signup
      completeSignup()
    }
  }
}

const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

const completeSignup = () => {
  // Here you would typically send the data to your backend
  console.log('Signup completed:', formData)
  
  // Show success message and redirect
  router.push('/')
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-header">
        <h1>Get Started with Yunimi</h1>
        <p>Complete your registration in just a few simple steps</p>
      </div>

      <Card class="signup-card">
        <template #content>
          <Steps 
            :model="steps" 
            :activeStep="activeStep"
            class="signup-steps"
          />
          
          <div class="step-content">
            <CompanyInformationStep 
              v-if="activeStep === 0"
              v-model="formData.company"
              :errors="validationErrors"
            />
            
            <SocialMediaSelectionStep 
              v-if="activeStep === 1"
              v-model="formData.socialMedia"
              :errors="validationErrors"
            />
            
            <AccountCreationStep 
              v-if="activeStep === 2"
              v-model="formData.accountCreation"
              :errors="validationErrors"
              :selectedPlatforms="formData.socialMedia.selectedPlatforms"
            />
            
            <PaymentStep 
              v-if="activeStep === 3"
              v-model="formData.payment"
              :errors="validationErrors"
            />
          </div>
        </template>
      </Card>

      <!-- Fixed Bottom Navigation Bar -->
      <div class="bottom-navigation">
        <div class="nav-container">
          <Button 
            label="Back" 
            severity="secondary" 
            outlined
            @click="prevStep"
            :disabled="activeStep === 0"
          />
          
          <div class="right-actions">
            <Button 
              label="Cancel" 
              severity="secondary" 
              text
              @click="goBack"
            />
            <Button 
              :label="activeStep === steps.length - 1 ? 'Complete Signup' : 'Next'"
              @click="nextStep"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.signup-container {
  max-width: 800px;
  margin: 0 auto;
}

.signup-header {
  text-align: center;
  margin-bottom: 2rem;
}

.signup-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.signup-header p {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.signup-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.signup-steps {
  margin-bottom: 2rem;
}

.step-content {
  min-height: 400px;
  margin-bottom: 2rem;
  padding-bottom: 100px; /* Add padding to prevent content from being hidden behind fixed nav */
}

.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e9ecef;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right-actions {
  display: flex;
  gap: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .signup-page {
    padding: 1rem 0.5rem;
  }
  
  .signup-header h1 {
    font-size: 2rem;
  }
  
  .nav-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .right-actions {
    width: 100%;
    justify-content: space-between;
  }
  
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem;
  }
}
</style>
