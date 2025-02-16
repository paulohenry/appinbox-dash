import { useCallback, useEffect } from 'react'
import { Github, Apple, Chrome } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import { AuthButton } from './AuthButton'
import { XIcon } from './XIcon'
import { handleTwitterLogin, handleAppleLogin } from '../services/auth'

interface SocialButtonsProps {
  onSuccess?: (user: any) => void
}

export function SocialButtons({ onSuccess }: SocialButtonsProps) {
  useEffect(() => {
    // Listen for messages from popup windows
    const handleMessage = (event: MessageEvent) => {
      // Verify origin
      if (event.origin !== window.location.origin) return

      const { type, data, error } = event.data
      if (error) {
        toast.error(error)
        return
      }

      switch (type) {
        case 'twitter-auth-success':
          toast.success('Successfully logged in with X!')
          onSuccess?.(data)
          break
        case 'apple-auth-success':
          toast.success('Successfully logged in with Apple!')
          onSuccess?.(data)
          break
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onSuccess])

  const handleTwitterAuth = useCallback(async () => {
    try {
      await handleTwitterLogin()
    } catch (error) {
      toast.error('X authentication failed')
    }
  }, [])

  const handleAppleAuth = useCallback(async () => {
    try {
      await handleAppleLogin()
    } catch (error) {
      toast.error('Apple authentication failed')
    }
  }, [])

  const googleLogin = useGoogleLogin({
    onSuccess: response => {
      console.log('Google login successful:', response)
      onSuccess?.(response)
      toast.success('Successfully logged in with Google!')
    },
    onError: () => {
      toast.error('Google login failed')
    },
    flow: 'implicit'
  })

  return (
    <div className="grid grid-cols-1 gap-3">
      <AuthButton
        icon={Chrome}
        label="Continue with Google"
        onClick={() => googleLogin()}
        className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
      />
      <AuthButton
        icon={Github}
        label="Continue with GitHub"
        onClick={() => toast.error('GitHub authentication not implemented yet')}
        className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
      />
      <AuthButton
        icon={XIcon}
        label="Continue with X"
        onClick={handleTwitterAuth}
        className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
      />
      <AuthButton
        icon={Apple}
        label="Continue with Apple"
        onClick={handleAppleAuth}
        className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
      />
    </div>
  )
}
