'use client'

import React from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { login, signInWithGoogle } from '@/app/auth/actions'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Login to FactFlow AI</h1>
          
          <form action={signInWithGoogle}>
            <button type="submit" className="w-full py-2 px-4 border border-gray-600 rounded-md hover:bg-gray-700">
              Continue with Google
            </button>
          </form>

          <div className="flex items-center">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-4 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <form action={login} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" name="email"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input type="password" id="password" name="password"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••" required />
            </div>
            {error && (
              <p className="p-4 bg-red-900/50 text-red-300 text-center rounded-md">
                {error}
              </p>
            )}
            <button type="submit"
              className="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}