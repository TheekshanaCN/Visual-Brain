'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AuthModal } from '@/components/AuthModal'
import { useUser } from '@clerk/nextjs'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const triggerRef = useRef<HTMLButtonElement>(null)
  
  const mode = searchParams.get('mode') as 'sign-in' | 'sign-up' || 'sign-in'
  const callbackUrl = searchParams.get('callback') || '/dashboard'

  useEffect(() => {
    // Auto-click the trigger to open the modal on page load
    if (triggerRef.current && !isSignedIn) {
      triggerRef.current.click()
    }
  }, [isSignedIn])

  useEffect(() => {
    // Redirect to callback URL after successful sign in
    if (isLoaded && isSignedIn) {
      router.push(callbackUrl)
    }
  }, [isLoaded, isSignedIn, callbackUrl, router])

  const handleModalClose = () => {
    // Redirect to newboard if modal is closed without signing in
    router.push('/newboard')
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
          Your Unicorn Awaits
        </h1>
        <p className="text-muted-foreground">
          {mode === 'sign-in' ? 'Sign in to continue' : 'Create your account to get started'}
        </p>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        trigger={<button ref={triggerRef} className="hidden" />} 
        mode={mode}
        onOpenChange={(open) => {
          if (!open && !isSignedIn) {
            handleModalClose()
          }
        }}
      />
    </main>
  )
}