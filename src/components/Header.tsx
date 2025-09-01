import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/actions'
import Link from 'next/link'
import { cookies } from 'next/headers' // Import cookies

export default async function Header() {
  const cookieStore = cookies() // Get the cookie store
  const supabase = createClient(cookieStore) // Pass cookieStore to createClient
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">FactFlow AI</Link>
        
        {/* --- DEBUGGING START --- */}
        <div className="absolute top-0 left-0 bg-red-500 text-white p-2 text-xs font-mono">
          DEBUG: user is {user ? user.email : 'NULL'}
        </div>
        {/* --- DEBUGGING END --- */}

        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">{user.email}</span>
              <form action={logout}>
                <button 
                  type="submit"
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white">Login</Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
