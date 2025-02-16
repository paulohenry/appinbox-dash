import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Github, Twitter, Apple } from 'lucide-react'
import { AuthButton } from './AuthButton'
import { GoogleButton } from './GoogleButton'

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (e: FormEvent) => void
  onGoogleSuccess?: (user: any) => void
}

export function AuthForm({ type, onSubmit, onGoogleSuccess }: AuthFormProps) {
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('auth.email')}
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            {t('auth.password')}
          </label>
          <input
            id="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t(type === 'login' ? 'auth.sign_in' : 'auth.sign_up')}
        </button>
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

      <div className="grid grid-cols-1 gap-3">
        <GoogleButton onSuccess={onGoogleSuccess} />
        <AuthButton
          icon={Github}
          label="GitHub"
          onClick={() => console.log('GitHub auth')}
        />
        <AuthButton
          icon={Twitter}
          label="X"
          onClick={() => console.log('Twitter auth')}
        />
        <AuthButton
          icon={Apple}
          label="Apple"
          onClick={() => console.log('Apple auth')}
        />
      </div>
    </div>
  )
}
