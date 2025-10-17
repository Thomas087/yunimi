<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
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

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const paymentData = computed({
  get: () => props.modelValue,
  set: (value: PaymentData) => emit('update:modelValue', value)
})

const updateField = (field: keyof PaymentData, value: string) => {
  paymentData.value = {
    ...paymentData.value,
    [field]: value
  }
}

const planOptions = [
  { label: 'Starter - $29/month', value: 'starter' },
  { label: 'Professional - $79/month', value: 'professional' },
  { label: 'Enterprise - $199/month', value: 'enterprise' }
]

const formatCardNumber = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  // Add spaces every 4 digits
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const formatExpiryDate = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  // Add slash after 2 digits
  if (digits.length >= 2) {
    return digits.substring(0, 2) + '/' + digits.substring(2, 4)
  }
  return digits
}

const handleCardNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatCardNumber(target.value)
  updateField('cardNumber', formatted)
}

const handleExpiryInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatExpiryDate(target.value)
  updateField('expiryDate', formatted)
}
</script>

<template>
  <div class="payment-step">
    <div class="step-header">
      <h2>Choose Your Plan & Payment</h2>
      <p>Select a plan that fits your needs and complete your payment</p>
    </div>

    <div class="payment-content">
      <div class="plan-selection">
        <h3>Select Your Plan</h3>
        <div class="plan-options">
          <Card 
            v-for="plan in planOptions" 
            :key="plan.value"
            class="plan-card"
            :class="{ 'selected': paymentData.plan === plan.value }"
            @click="updateField('plan', plan.value)"
          >
            <template #content>
              <div class="plan-content">
                <h4>{{ plan.label.split(' - ')[0] }}</h4>
                <p class="plan-price">{{ plan.label.split(' - ')[1] }}</p>
                <div class="plan-features">
                  <div v-if="plan.value === 'starter'" class="features">
                    <p>• Up to 5 team members</p>
                    <p>• Basic analytics</p>
                    <p>• Email support</p>
                  </div>
                  <div v-else-if="plan.value === 'professional'" class="features">
                    <p>• Up to 25 team members</p>
                    <p>• Advanced analytics</p>
                    <p>• Priority support</p>
                    <p>• API access</p>
                  </div>
                  <div v-else-if="plan.value === 'enterprise'" class="features">
                    <p>• Unlimited team members</p>
                    <p>• Custom analytics</p>
                    <p>• 24/7 phone support</p>
                    <p>• Full API access</p>
                    <p>• Custom integrations</p>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <Message 
          v-if="errors.plan" 
          severity="error" 
          :closable="false"
          class="error-message"
        >
          {{ errors.plan }}
        </Message>
      </div>

      <div class="payment-form">
        <h3>Payment Information</h3>
        <div class="form-fields">
          <div class="field">
            <label for="cardNumber">Card Number *</label>
            <InputText
              id="cardNumber"
              :value="paymentData.cardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              :class="{ 'p-invalid': errors.cardNumber }"
              @input="handleCardNumberInput"
            />
            <Message 
              v-if="errors.cardNumber" 
              severity="error" 
              :closable="false"
              class="error-message"
            >
              {{ errors.cardNumber }}
            </Message>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="expiryDate">Expiry Date *</label>
              <InputText
                id="expiryDate"
                :value="paymentData.expiryDate"
                placeholder="MM/YY"
                maxlength="5"
                :class="{ 'p-invalid': errors.expiryDate }"
                @input="handleExpiryInput"
              />
              <Message 
                v-if="errors.expiryDate" 
                severity="error" 
                :closable="false"
                class="error-message"
              >
                {{ errors.expiryDate }}
              </Message>
            </div>

            <div class="field">
              <label for="cvv">CVV *</label>
              <InputText
                id="cvv"
                v-model="paymentData.cvv"
                placeholder="123"
                maxlength="4"
                :class="{ 'p-invalid': errors.cvv }"
                @input="updateField('cvv', $event.target.value)"
              />
              <Message 
                v-if="errors.cvv" 
                severity="error" 
                :closable="false"
                class="error-message"
              >
                {{ errors.cvv }}
              </Message>
            </div>
          </div>

          <div class="field">
            <label for="cardholderName">Cardholder Name *</label>
            <InputText
              id="cardholderName"
              v-model="paymentData.cardholderName"
              placeholder="John Doe"
              :class="{ 'p-invalid': errors.cardholderName }"
              @input="updateField('cardholderName', $event.target.value)"
            />
            <Message 
              v-if="errors.cardholderName" 
              severity="error" 
              :closable="false"
              class="error-message"
            >
              {{ errors.cardholderName }}
            </Message>
          </div>

          <div class="field">
            <label for="billingAddress">Billing Address</label>
            <InputText
              id="billingAddress"
              v-model="paymentData.billingAddress"
              placeholder="123 Main St, City, State 12345"
              @input="updateField('billingAddress', $event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <StepInfo
      title="Secure Payment"
      :items="[
        'Your payment information is encrypted and secure',
        'We accept all major credit cards',
        'You can cancel or change your plan anytime',
        'First month is free with any plan'
      ]"
      variant="success"
    />
  </div>
</template>

<style scoped>
.payment-step {
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

.payment-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.plan-selection h3,
.payment-form h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.plan-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.plan-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.plan-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}

.plan-card.selected {
  border-color: #007bff;
  background-color: #f8f9ff;
}

.plan-content {
  text-align: center;
}

.plan-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.plan-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 1rem;
}

.plan-features {
  text-align: left;
}

.features p {
  margin: 0.25rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

.error-message {
  margin-top: 0.25rem;
}


/* Responsive Design */
@media (max-width: 768px) {
  .payment-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .step-header h2 {
    font-size: 1.5rem;
  }
  
  .field-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
}
</style>
