import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SocialButtons } from './SocialButtons'

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (e: FormEvent) => void
  onSocialSuccess?: (user: any) => void
}

export function AuthForm({ type, onSubmit, onSocialSuccess }: AuthFormProps) {
  const { t } = useTranslation()

  return (
    <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold dark:text-white">
          {t(type === 'login' ? 'auth.welcome_back' : 'auth.create_account')}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t(type === 'login' ? 'auth.no_account' : 'auth.has_account')}
          <Link
            to={type === 'login' ? '/register' : '/'}
            className="ml-1 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t(type === 'login' ? 'auth.sign_up' : 'auth.sign_in')}
          </Link>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* ... rest of the form fields ... */}
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {t('auth.or_continue_with')}
          </span>
        </div>
      </div>

      <SocialButtons onSuccess={onSocialSuccess} />
    </div>
  )
}
