import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { AuthLayout } from '../components/AuthLayout'
import { PhoneInput } from '../components/PhoneInput'
import { VerificationModal } from '../components/VerificationModal'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val, 'You must accept the terms'),
  privacyAccepted: z.boolean().refine((val) => val, 'You must accept the privacy policy'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function Register() {
  const navigate = useNavigate()
  const [verificationModal, setVerificationModal] = useState({
    isOpen: false,
    phoneNumber: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Registration failed')
    }
  }

  const handlePhoneChange = async (value: string) => {
    setValue('phone', value)
    const isValid = await trigger('phone')
    if (isValid && value.length >= 10) {
      setVerificationModal({ isOpen: true, phoneNumber: value })
    }
  }

  const handlePhoneVerified = () => {
    // Here you would typically store the verification status
    console.log('Phone verified')
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-xl space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold dark:text-white">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
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
              onChange={handlePhoneChange}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
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
            Create Account
          </button>
        </form>
      </div>

      <VerificationModal
        isOpen={verificationModal.isOpen}
        onClose={() => setVerificationModal({ ...verificationModal, isOpen: false })}
        phoneNumber={verificationModal.phoneNumber}
        onVerify={handlePhoneVerified}
      />
    </AuthLayout>
  )
}
