<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Navbar from '../components/layout/Navbar.vue'
import CompanyInformationStep from './signup/CompanyInformationStep.vue'
import SocialMediaSelectionStep from './signup/SocialMediaSelectionStep.vue'
import AccountCreationStep from './signup/AccountCreationStep.vue'
import PaymentStep from './signup/PaymentStep.vue'
import { useSignup } from '../composables/useSignup'

const router = useRouter()

// Use the signup composable
const { 
  formData, 
  isLoading, 
  error, 
  signupAttemptId,
  createSignupAttempt, 
  updateSignupData, 
  completeSignup 
} = useSignup()

// Step management
const activeStep = ref(0)
const stepLabels = [
  'Company Info',
  'Social Media',
  'Account Creation',
  'Payment'
]

// Screen size tracking
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value <= 768)

// Update window width on resize
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

// Computed property to show labels based on screen size and active step
const steps = computed(() => {
  return stepLabels.map((label, index) => ({
    label: isMobile.value ? (index === activeStep.value ? label : '') : label
  }))
})

// Validation state
const validationErrors = ref<Record<string, string>>({})

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
    const lastPart = parts[parts.length - 1]
    if (parts.length < 2 || !lastPart || lastPart.length < 2) return false
    
    return true
  } catch {
    return false
  }
}

const validateCurrentStep = () => {
  const errors: Record<string, string> = {}
  
  if (activeStep.value === 0) {
    if (!formData.company.professionalEmail) {
      errors.professionalEmail = 'Professional email is required'
    } else if (!isValidEmail(formData.company.professionalEmail)) {
      errors.professionalEmail = 'Please enter a valid email address'
    }
    
    if (!formData.company.name) {
      errors.companyName = 'Company name is required'
    }
    
    if (!formData.company.website) {
      errors.website = 'Website URL is required'
    } else if (!isValidUrl(formData.company.website)) {
      errors.website = 'Please enter a valid website URL (e.g., https://example.com)'
    }
    
    if (!formData.company.instagram) {
      errors.instagram = 'Instagram account is required'
    }
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
    // No validation needed for payment step - it's just a review message
  }
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const nextStep = async () => {
  if (validateCurrentStep()) {
    try {
      // Create signup attempt when moving from step 0 to step 1 (after company info is filled)
      if (activeStep.value === 0) {
        await createSignupAttemptOnFirstStep()
      }
      
      // Save current step data to Supabase (step 0 becomes step 1 in database)
      await updateSignupData(activeStep.value + 1)
      
      if (activeStep.value < stepLabels.length - 1) {
        activeStep.value++
        // Scroll to top when moving to next step
        window.scrollTo(0, 0)
      } else {
        // Complete signup (step 3 becomes step 4 in database)
        await completeSignup()
        router.push('/')
      }
    } catch (err) {
      console.error('Failed to save signup data:', err)
      // Continue with the step even if saving fails
      if (activeStep.value < stepLabels.length - 1) {
        activeStep.value++
        // Scroll to top when moving to next step
        window.scrollTo(0, 0)
      } else {
        router.push('/')
      }
    }
  }
}

const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
    // Scroll to top when moving to previous step
    window.scrollTo(0, 0)
  }
}

// Create signup attempt when user completes the first step
const createSignupAttemptOnFirstStep = async () => {
  if (!signupAttemptId.value) {
    try {
      await createSignupAttempt()
    } catch (err) {
      console.error('Failed to create signup attempt:', err)
    }
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="signup-page">
    <Navbar />
    <div class="signup-container">
      <div class="signup-header">
        <h1 class="section-title">Get Started with Yunimi</h1>
        <p class="section-subtitle">Complete your registration in just a few simple steps</p>
      </div>

      <div class="signup-card">
        <!-- Error Message -->
        <Message 
          v-if="error" 
          severity="error" 
          :closable="true"
          @close="error = null"
          class="error-message"
        >
          {{ error }}
        </Message>
        
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
      </div>

      <!-- Fixed Bottom Navigation Bar -->
      <div class="bottom-navigation">
        <div class="nav-container" :class="{ 'single-button': activeStep === stepLabels.length - 1 }">
          <Button 
            v-if="activeStep !== stepLabels.length - 1"
            label="Back" 
            severity="secondary" 
            outlined
            @click="prevStep"
            :disabled="activeStep === 0"
          />
          
          <div class="right-actions">
            <Button 
              v-if="activeStep !== stepLabels.length - 1"
              label="Cancel" 
              severity="secondary" 
              text
              @click="goBack"
            />
            <Button 
              :label="activeStep === stepLabels.length - 1 ? 'Complete Signup' : 'Next'"
              @click="nextStep"
              :loading="isLoading"
              :disabled="isLoading"
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
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #1e293b;
  padding: 80px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.signup-container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 0px; /* Compensate for fixed navbar */
}

/* Remove container constraints on mobile for better space utilization */
@media (max-width: 768px) {
  .signup-container {
    max-width: none;
    margin: 0;
    padding: 0 10px; /* Minimal padding for mobile */
  }
}

@media (max-width: 480px) {
  .signup-container {
    padding: 0 5px; /* Even more minimal padding for very small screens */
  }
}

.signup-header {
  text-align: center;
  margin-bottom: 2rem;
}
.signup-card {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.signup-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--p-primary-color);
}

.error-message {
  margin-bottom: 1rem;
}

.signup-steps {
  margin-bottom: 2rem;
}

.step-content {
  min-height: 400px;
  margin-bottom: 2rem;
  padding-bottom: 100px;
}

.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
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

.nav-container.single-button {
  justify-content: flex-end;
}

.right-actions {
  display: flex;
  gap: 1rem;
}

/* Responsive Design */
@media (max-width: 968px) {
  .signup-page {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .signup-header {
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .signup-page {
    padding: 50px 0; /* Remove horizontal padding since container handles it */
  }
  
  .signup-header {
    display: none; /* Hide header on mobile to save space */
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .signup-card {
    padding: 1.5rem; /* Reduced padding for mobile */
    margin: 0 10px; /* Add margin to prevent edge-to-edge on very small screens */
    background: transparent; /* Remove white background on mobile */
    border: none; /* Remove border on mobile */
    border-radius: 0; /* Remove border radius on mobile */
    box-shadow: none; /* Remove shadow on mobile */
  }
  
  .signup-card:hover {
    transform: none; /* Disable hover effects on mobile */
    box-shadow: none;
    border-color: transparent;
  }
  
  .step-content {
    min-height: 300px;
    padding-bottom: 120px;
  }
  
  .nav-container {
    padding: 1rem;
    gap: 0.5rem;
  }
  
  .right-actions {
    gap: 0.5rem;
  }

  .signup-container {
    margin-top: 40px;
  }
}

@media (max-width: 480px) {
  .signup-page {
    padding: 40px 0; /* Remove horizontal padding since container handles it */
  }
  
  .signup-header {
    display: none; /* Hide header on mobile to save space */
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .signup-card {
    padding: 1.25rem; /* Further reduced padding for very small screens */
    margin: 0 5px; /* Smaller margin for very small screens */
    background: transparent; /* Remove white background on mobile */
    border: none; /* Remove border on mobile */
    border-radius: 0; /* Remove border radius on mobile */
    box-shadow: none; /* Remove shadow on mobile */
  }
  
  .signup-card:hover {
    transform: none; /* Disable hover effects on mobile */
    box-shadow: none;
    border-color: transparent;
  }
  
  .step-content {
    min-height: 250px;
    padding-bottom: 100px;
  }
  
  .nav-container {
    padding: 0.75rem;
    gap: 0.25rem;
  }
  
  .right-actions {
    gap: 0.25rem;
  }
}
</style>
