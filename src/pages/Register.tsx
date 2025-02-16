import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '../components/AuthLayout'
import { PhoneInput } from '../components/PhoneInput'
import { ValidationModal } from '../components/ValidationModal'
import { handleGoogleLogin } from '../services/auth'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val, 'You must accept the terms'),
  privacyAccepted: z.boolean().refine((val) => val, 'You must accept the privacy policy'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function Register() {
  const { t } = useTranslation()
  const [validationModal, setValidationModal] = useState<{
    isOpen: boolean
    type: 'email' | 'phone'
    value: string
  }>({
    isOpen: false,
    type: 'email',
    value: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterForm) => {
    console.log('Form data:', data)
    toast.success('Registration successful!')
  }

  const handleGoogleSuccess = async (response: any) => {
    try {
      const result = await handleGoogleLogin(response.credential)
      if (result.user) {
        toast.success('Successfully registered with Google!')
      } else {
        toast.error(result.error || 'Failed to register with Google')
      }
    } catch (error) {
      toast.error('An error occurred during Google registration')
    }
  }

  const handleFieldBlur = (type: 'email' | 'phone', value: string) => {
    if (value) {
      setValidationModal({ isOpen: true, type, value })
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-xl space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold dark:text-white">
            {t('auth.create_account')}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('auth.email')}
            </label>
            <input
              type="email"
              {...register('email')}
              onBlur={(e) => handleFieldBlur('email', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Phone
            </label>
            <PhoneInput
              value={watch('phone') || ''}
              onChange={(value) => {
                setValue('phone', value)
                if (value.length >= 10) {
                  handleFieldBlur('phone', value)
                }
              }}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {t('auth.password')}
            </label>
            <input
              type="password"
              {...register('password')}
              className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('termsAccepted')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                I accept the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('privacyAccepted')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                I accept the <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </label>
            </div>
            {errors.privacyAccepted && (
              <p className="text-sm text-red-500">{errors.privacyAccepted.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('auth.sign_up')}
          </button>
        </form>
      </div>

      <ValidationModal
        isOpen={validationModal.isOpen}
        onClose={() => setValidationModal({ ...validationModal, isOpen: false })}
        type={validationModal.type}
        value={validationModal.value}
      />
    </AuthLayout>
  )
}
