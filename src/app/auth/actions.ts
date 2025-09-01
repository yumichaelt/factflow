'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers' // Import cookies

export async function signInWithGoogle() {
  const cookieStore = cookies() // Get the cookie store
  const supabase = createClient(cookieStore) // Pass cookieStore to createClient
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `/auth/callback`,
    },
  })

  if (error) {
    console.error('Google Sign-In Error:', error)
    return redirect('/login?error=Could not authenticate with Google')
  }

  if (data.url) {
    return redirect(data.url) // Use the URL from the Supabase client
  }

  return redirect('/login?error=Could not get Google auth URL')
}

export async function logout() {
  const cookieStore = cookies() // Get the cookie store
  const supabase = createClient(cookieStore) // Pass cookieStore to createClient
  await supabase.auth.signOut()
  return redirect('/login')
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const cookieStore = cookies() // Get the cookie store
  const supabase = createClient(cookieStore) // Pass cookieStore to createClient

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login Error:', error)
    return redirect('/login?error=Could not authenticate user')
  }

  return redirect('/')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const cookieStore = cookies() // Get the cookie store
  const supabase = createClient(cookieStore) // Pass cookieStore to createClient

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This is where the user will be redirected after clicking the
      // confirmation link in the email.
      emailRedirectTo: `/auth/callback`,
    },
  })

  if (error) {
    console.error('Signup Error:', error)
    return redirect('/signup?error=Could not authenticate user')
  }

  return redirect('/signup?message=Check email to continue sign up process')
}
