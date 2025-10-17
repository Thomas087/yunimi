<script setup lang="ts">
import Card from 'primevue/card'
import StepInfo from '../../components/shared/StepInfo.vue'

interface PaymentData {
  plan: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  billingAddress: string
}

interface Props {
  modelValue: PaymentData
  errors: Record<string, string>
}

interface Emits {
  (e: 'update:modelValue', value: PaymentData): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="review-step">
    <div class="step-header">
      <h2>Account Review</h2>
      <p>Your account is currently under review</p>
    </div>

    <div class="review-content">
      <Card class="review-card">
        <template #content>
          <div class="review-message">
            <div class="icon-container">
              <i class="pi pi-clock" style="font-size: 3rem; color: #007bff;"></i>
            </div>
            <h3>Your Account is Under Review</h3>
            <p class="review-text">
              Thank you for your interest in Yunimi! We are currently reviewing your account information and will reach out to you within 1 business day with more information about your account status and next steps.
            </p>
            <div class="contact-info">
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your account details</li>
                <li>We'll verify your company information</li>
                <li>You'll receive an email with your account status</li>
                <li>If approved, you'll get access to your dashboard</li>
              </ul>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <StepInfo
      title="Review Process"
      :items="[
        'Account review typically takes 1 business day',
        'We\'ll contact you via email with updates',
        'Your information is secure and confidential',
        'Contact support if you have any questions'
      ]"
      variant="info"
    />
  </div>
</template>

<style scoped>
.review-step {
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

.review-content {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.review-card {
  max-width: 600px;
  width: 100%;
  border: 2px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.review-message {
  text-align: center;
  padding: 2rem;
}

.icon-container {
  margin-bottom: 1.5rem;
}

.review-message h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.review-text {
  font-size: 1.1rem;
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-info {
  text-align: left;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.contact-info p {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.contact-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-info li {
  padding: 0.5rem 0;
  color: #6c757d;
  position: relative;
  padding-left: 1.5rem;
}

.contact-info li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .step-header h2 {
    font-size: 1.5rem;
  }
  
  .review-message {
    padding: 1.5rem;
  }
  
  .review-message h3 {
    font-size: 1.3rem;
  }
  
  .review-text {
    font-size: 1rem;
  }
}
</style>
