import { ref, reactive } from 'vue'
import { saveSignupAttempt, updateSignupAttempt, getCurrentSessionInfo, signInAnonymouslyAndGetSession, type SignupAttempt } from '../lib/supabase'

export interface SignupFormData {
  company: {
    professionalEmail: string
    name: string
    website: string
    instagram: string
  }
  socialMedia: {
    selectedPlatforms: string[]
  }
  accountCreation: {
    platformOptions: Array<{ platform: string; option: string }>
  }
  payment: Record<string, never>
}

export function useSignup() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const signupAttemptId = ref<string | null>(null)
  const sessionId = ref<string | null>(null)

  const formData = reactive<SignupFormData>({
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
    payment: {} as Record<string, never>
  })

  // Save initial signup attempt when user starts the process
  const createSignupAttempt = async () => {
    if (signupAttemptId.value) return signupAttemptId.value

    try {
      isLoading.value = true
      error.value = null

      const signupData: Partial<SignupAttempt> = {
        professional_email: formData.company.professionalEmail || null,
        company_name: formData.company.name || null,
        website_url: formData.company.website || null,
        instagram_account: formData.company.instagram || null,
        selected_platforms: formData.socialMedia.selectedPlatforms,
        platform_options: formData.accountCreation.platformOptions.reduce((acc, option) => {
          acc[option.platform] = option.option
          return acc
        }, {} as Record<string, string>),
        status: 'pending',
        completion_step: 1, // First step completed (company info)
        user_agent: navigator.userAgent,
        referrer: document.referrer
      }

      const result = await saveSignupAttempt(signupData)
      signupAttemptId.value = result.id
      return result.id
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create signup attempt'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update signup attempt with new data
  const updateSignupData = async (step: number) => {
    // Don't try to update if we don't have a signup attempt ID yet (step 0)
    if (!signupAttemptId.value) {
      return
    }

    try {
      isLoading.value = true
      error.value = null

      const updateData: Partial<SignupAttempt> = {
        professional_email: formData.company.professionalEmail,
        company_name: formData.company.name,
        website_url: formData.company.website,
        instagram_account: formData.company.instagram,
        selected_platforms: formData.socialMedia.selectedPlatforms,
        platform_options: formData.accountCreation.platformOptions.reduce((acc, option) => {
          acc[option.platform] = option.option
          return acc
        }, {} as Record<string, string>),
        completion_step: step
      }

      // Mark as completed if we're on the final step
      if (step >= 3) {
        updateData.status = 'completed'
      }

      await updateSignupAttempt(signupAttemptId.value, updateData)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update signup attempt'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Complete the signup process
  const completeSignup = async () => {
    try {
      await updateSignupData(4) // Final step (frontend step 3 = database step 4)
      return signupAttemptId.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete signup'
      throw err
    }
  }

  // Initialize session when composable is created
  const initializeSession = async () => {
    try {
      // First check if we already have a session
      let sessionInfo = await getCurrentSessionInfo()
      
      // If no session exists, sign in anonymously
      if (!sessionInfo || !sessionInfo.session_id) {
        console.log('No existing session found, signing in anonymously...')
        sessionInfo = await signInAnonymouslyAndGetSession()
      }
      
      sessionId.value = sessionInfo?.session_id || null
      console.log('Session initialized:', sessionInfo)
    } catch (err) {
      console.error('Failed to initialize session:', err)
    }
  }

  // Reset form data
  const resetForm = () => {
    formData.company = {
      professionalEmail: '',
      name: '',
      website: '',
      instagram: ''
    }
    formData.socialMedia = {
      selectedPlatforms: []
    }
    formData.accountCreation = {
      platformOptions: []
    }
    formData.payment = {} as Record<string, never>
    signupAttemptId.value = null
    error.value = null
  }

  // Initialize session on mount
  initializeSession()

  return {
    formData,
    isLoading,
    error,
    signupAttemptId,
    sessionId,
    createSignupAttempt,
    updateSignupData,
    completeSignup,
    resetForm,
    initializeSession
  }
}
