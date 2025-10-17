import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bbqbdogaxpmzjnkbwinf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicWJkb2dheHBtempua2J3aW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2ODUwNjQsImV4cCI6MjA3NjI2MTA2NH0.b_acnbzclUiXHnG9hAk-hzKt2p_8jjOU_EtYuaCXOy8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to sign in anonymously and get session info
export async function signInAnonymouslyAndGetSession() {
  try {
    const { data, error } = await supabase.auth.signInAnonymously()
    
    if (error) {
      console.error('Error signing in anonymously:', error)
      throw error
    }
    
    console.log('Anonymous sign in successful:', data)
    
    return {
      session_id: data.session?.access_token ? data.session.access_token.substring(0, 32) : null,
      user_id: data.user?.id || null,
      is_authenticated: false, // Anonymous users are not considered authenticated
      session: data.session
    }
  } catch (error) {
    console.error('Failed to sign in anonymously:', error)
    throw error
  }
}

// Helper function to get current session info
export async function getCurrentSessionInfo() {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  
  return {
    session_id: session?.access_token ? session.access_token.substring(0, 32) : null,
    user_id: session?.user?.id || null,
    is_authenticated: !!session?.user && session.user.aud !== 'anonymous'
  }
}

// Type definitions for our signup attempts table
export interface SignupAttempt {
  id?: string
  created_at?: string
  updated_at?: string
  session_id?: string
  user_id?: string
  professional_email: string | null
  company_name: string | null
  website_url: string | null
  instagram_account: string | null
  selected_platforms: string[]
  platform_options: Record<string, string>
  selected_plan?: string
  card_number?: string
  expiry_date?: string
  cvv?: string
  cardholder_name?: string
  billing_address?: string
  status?: 'pending' | 'completed' | 'failed' | 'cancelled'
  completion_step?: number
  ip_address?: string
  user_agent?: string
  referrer?: string
}

// Helper function to save signup attempt
export async function saveSignupAttempt(data: Partial<SignupAttempt>) {
  try {
    console.log('Attempting to save signup attempt with data:', data)
    
    // Get current session info
    const sessionInfo = await getCurrentSessionInfo()
    console.log('Current session info:', sessionInfo)
    
    // Add session information to the data
    const dataWithSession = {
      ...data,
      session_id: sessionInfo?.session_id,
      user_id: sessionInfo?.user_id
    }
    
    const { data: result, error } = await supabase
      .from('signup_attempts')
      .insert([dataWithSession])
      .select()

    console.log('Supabase response:', { result, error })

    if (error) {
      console.error('Error saving signup attempt:', error)
      throw error
    }

    if (!result || result.length === 0) {
      throw new Error('No data returned from insert operation')
    }

    return result[0] // Return the first (and only) inserted record
  } catch (error) {
    console.error('Failed to save signup attempt:', error)
    throw error
  }
}

// Helper function to update signup attempt
export async function updateSignupAttempt(id: string, data: Partial<SignupAttempt>) {
  try {
    console.log('Attempting to update signup attempt:', id, 'with data:', data)
    
    // Get current session info for validation
    const sessionInfo = await getCurrentSessionInfo()
    console.log('Current session info for update:', sessionInfo)
    
    // Add session information to the data
    const dataWithSession = {
      ...data,
      session_id: sessionInfo?.session_id,
      user_id: sessionInfo?.user_id
    }
    
    // Build the query with session validation
    let query = supabase
      .from('signup_attempts')
      .update(dataWithSession)
      .eq('id', id)
    
    // Add session-based filtering for anonymous users
    if (sessionInfo?.session_id && !sessionInfo?.is_authenticated) {
      query = query.eq('session_id', sessionInfo.session_id)
    }
    // Add user-based filtering for authenticated users
    else if (sessionInfo?.user_id && sessionInfo?.is_authenticated) {
      query = query.eq('user_id', sessionInfo.user_id)
    }
    
    const { data: result, error } = await query.select()

    console.log('Supabase update response:', { result, error })

    if (error) {
      console.error('Error updating signup attempt:', error)
      throw error
    }

    if (!result || result.length === 0) {
      throw new Error('No data returned from update operation - record may not belong to current session')
    }

    return result[0] // Return the first (and only) updated record
  } catch (error) {
    console.error('Failed to update signup attempt:', error)
    throw error
  }
}

// Helper function to get signup attempts for current session
export async function getSignupAttemptsForSession() {
  try {
    const sessionInfo = await getCurrentSessionInfo()
    console.log('Getting signup attempts for session:', sessionInfo)
    
    if (!sessionInfo) {
      throw new Error('No session information available')
    }
    
    let query = supabase
      .from('signup_attempts')
      .select('*')
      .order('created_at', { ascending: false })
    
    // Add session-based filtering for anonymous users
    if (sessionInfo.session_id && !sessionInfo.is_authenticated) {
      query = query.eq('session_id', sessionInfo.session_id)
    }
    // Add user-based filtering for authenticated users
    else if (sessionInfo.user_id && sessionInfo.is_authenticated) {
      query = query.eq('user_id', sessionInfo.user_id)
    }
    
    const { data: result, error } = await query

    if (error) {
      console.error('Error getting signup attempts:', error)
      throw error
    }

    return result || []
  } catch (error) {
    console.error('Failed to get signup attempts:', error)
    throw error
  }
}

// Helper function to get a specific signup attempt with session validation
export async function getSignupAttemptById(id: string) {
  try {
    const sessionInfo = await getCurrentSessionInfo()
    console.log('Getting signup attempt by ID:', id, 'for session:', sessionInfo)
    
    if (!sessionInfo) {
      throw new Error('No session information available')
    }
    
    let query = supabase
      .from('signup_attempts')
      .select('*')
      .eq('id', id)
    
    // Add session-based filtering for anonymous users
    if (sessionInfo.session_id && !sessionInfo.is_authenticated) {
      query = query.eq('session_id', sessionInfo.session_id)
    }
    // Add user-based filtering for authenticated users
    else if (sessionInfo.user_id && sessionInfo.is_authenticated) {
      query = query.eq('user_id', sessionInfo.user_id)
    }
    
    const { data: result, error } = await query.single()

    if (error) {
      console.error('Error getting signup attempt:', error)
      throw error
    }

    return result
  } catch (error) {
    console.error('Failed to get signup attempt:', error)
    throw error
  }
}
