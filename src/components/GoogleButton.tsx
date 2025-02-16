import { useGoogleLogin } from '@react-oauth/google'
import { Chrome } from 'lucide-react'
import toast from 'react-hot-toast'
import { AuthButton } from './AuthButton'

interface GoogleButtonProps {
  onSuccess?: (response: any) => void
}

export function GoogleButton({ onSuccess }: GoogleButtonProps) {
  const login = useGoogleLogin({
    onSuccess: response => {
      console.log('Google login successful:', response)
      onSuccess?.(response)
    },
    onError: () => {
      toast.error('Google login failed')
    },
  })

  return (
    <AuthButton
      icon={Chrome}
      label="Google"
      onClick={() => login()}
      className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
    />
  )
}
