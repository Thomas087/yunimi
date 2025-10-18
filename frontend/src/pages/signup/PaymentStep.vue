<script setup lang="ts">

type PaymentData = Record<string, never>

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
    <div class="signup-step-header">
      <h2 class="signup-step-title">Account Review</h2>
      <p class="signup-step-subtitle">Your account is currently under review</p>
    </div>

    <div class="review-content">
      <p class="review-text">
        Thank you for your interest in Yunimi! We are currently reviewing your account information and will reach out to you within 1 business day with more information about your account status and next steps.
      </p>
      <div class="contact-info">
        <p class="contact-title"><strong>What happens next?</strong></p>
        <ul class="contact-list">
          <li>Our team will review your account details</li>
          <li>We'll verify your company information</li>
          <li>You'll receive an email with your account status</li>
          <li>If approved, you'll get access to your dashboard</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/signup-steps.css';

.review-step {
  padding: 0;
}

.review-content {
  text-align: center;
  margin-bottom: 0;
}

.icon-container {
  margin-bottom: 2rem;
}

.review-icon {
  font-size: 4rem;
  color: var(--p-primary-color);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 50%;
  padding: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
}

.review-text {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-info {
  text-align: left;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
}

.contact-title {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  padding: 0.75rem 0;
  color: #64748b;
  position: relative;
  padding-left: 2rem;
  font-size: 1rem;
  line-height: 1.5;
}

.contact-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--p-primary-color);
  font-weight: bold;
  font-size: 1.1rem;
  top: 0.75rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .review-text {
    font-size: 1rem;
  }
  
  .review-icon {
    font-size: 3rem;
    width: 5rem;
    height: 5rem;
    padding: 1rem;
  }
  
  .contact-info {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .review-text {
    font-size: 0.95rem;
  }
  
  .review-icon {
    font-size: 2.5rem;
    width: 4rem;
    height: 4rem;
    padding: 0.75rem;
  }
  
  .contact-info {
    padding: 1.25rem;
  }
  
  .contact-list li {
    font-size: 0.9rem;
    padding: 0.5rem 0;
    padding-left: 1.75rem;
  }
}
</style>
