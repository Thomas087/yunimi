# Supabase Integration for Yunimi Signup

This document describes the Supabase integration that stores all signup form data in a remote database.

## Database Schema

The `signup_attempts` table stores all information collected during the signup process:

### Core Fields

- `id` - UUID primary key
- `created_at` - Timestamp when the signup attempt was created
- `updated_at` - Timestamp when the record was last updated
- `status` - Current status: 'pending', 'completed', 'failed', 'cancelled'
- `completion_step` - Which step the user completed (1-4, where 1=company info, 2=social media, 3=account creation, 4=payment)

### Company Information

- `professional_email` - User's professional email address
- `company_name` - Company name
- `website_url` - Company website URL
- `instagram_account` - Instagram account handle

### Social Media Selection

- `selected_platforms` - Array of selected social media platforms
- `platform_options` - JSONB object mapping platforms to account creation options

### Payment Information

- `selected_plan` - Selected subscription plan
- `card_number` - Credit card number (should be encrypted in production)
- `expiry_date` - Card expiry date
- `cvv` - Card CVV (should be encrypted in production)
- `cardholder_name` - Name on the card
- `billing_address` - Billing address

### Metadata

- `ip_address` - User's IP address
- `user_agent` - Browser user agent
- `referrer` - Referring page URL

## Security Features

- **Row Level Security (RLS)** enabled
- Anonymous users can insert signup attempts
- Authenticated users can only view their own records
- Service role has full access for admin operations

## Usage

### Frontend Integration

The signup process automatically saves data to Supabase at each step:

1. **Initial Creation**: When the user completes the first step (company information), a new record is created
2. **Step Updates**: Each time the user moves to the next step, the record is updated with new data
3. **Completion**: When the signup is completed, the status is set to 'completed'

### Key Files

- `src/lib/supabase.ts` - Supabase client configuration and helper functions
- `src/composables/useSignup.ts` - Vue composable for managing signup state and database operations
- `src/pages/SignupPage.vue` - Updated to use the Supabase integration

### Environment Variables

The following environment variables can be set to configure the Supabase connection:

```env
VITE_SUPABASE_URL=https://bbqbdogaxpmzjnkbwinf.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Database Operations

### Creating a Signup Attempt

```typescript
import { saveSignupAttempt } from '@/lib/supabase'

const result = await saveSignupAttempt({
  professional_email: 'user@company.com',
  company_name: 'Example Company',
  // ... other fields
})
```

### Updating a Signup Attempt

```typescript
import { updateSignupAttempt } from '@/lib/supabase'

const result = await updateSignupAttempt(signupId, {
  selected_platforms: ['wechat', 'douyin'],
  completion_step: 2,
})
```

## Production Considerations

1. **Payment Data Security**: Credit card information should be encrypted or handled by a PCI-compliant payment processor
2. **Environment Variables**: Use environment variables for all sensitive configuration
3. **Error Handling**: The current implementation continues the signup flow even if database operations fail
4. **Data Validation**: Additional server-side validation should be implemented
5. **Rate Limiting**: Consider implementing rate limiting to prevent abuse

## Monitoring

You can monitor signup attempts through the Supabase dashboard or by querying the database directly:

```sql
-- View all signup attempts
SELECT * FROM signup_attempts ORDER BY created_at DESC;

-- Count signups by status
SELECT status, COUNT(*) FROM signup_attempts GROUP BY status;

-- View incomplete signups
SELECT * FROM signup_attempts WHERE status = 'pending';
```
