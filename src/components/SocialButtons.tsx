import { Github, Apple, Chrome } from 'lucide-react'
import { AuthButton } from './AuthButton'
import { XIcon } from './XIcon'
import { handleTwitterLogin, handleAppleLogin, handleGitHubLogin } from '../services/auth'

interface SocialButtonsProps {
  onSuccess?: (user: any) => void
}

export function SocialButtons({ onSuccess }: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <AuthButton
        icon={Chrome}
        label="Continue with Google"
        onClick={() => {
          // Google login is handled by GoogleOAuthProvider
        }}
      />
      <AuthButton
        icon={Github}
        label="Continue with GitHub"
        onClick={async () => {
          const response = await handleGitHubLogin()
          if (response.user) {
            onSuccess?.(response.user)
          }
        }}
      />
      <AuthButton
        icon={XIcon}
        label="Continue with X"
        onClick={async () => {
          const response = await handleTwitterLogin()
          if (response.user) {
            onSuccess?.(response.user)
          }
        }}
      />
      <AuthButton
        icon={Apple}
        label="Continue with Apple"
        onClick={async () => {
          const response = await handleAppleLogin()
          if (response.user) {
            onSuccess?.(response.user)
          }
        }}
      />
    </div>
  )
}
