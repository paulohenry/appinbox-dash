import { FormEvent } from 'react'
import toast from 'react-hot-toast'
import { AuthForm } from '../components/AuthForm'
import { AuthLayout } from '../components/AuthLayout'
import { handleGoogleLogin } from '../services/auth'

export default function Login() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    toast.success('Login functionality to be implemented')
  }

  const handleGoogleSuccess = async (response: any) => {
    try {
      const result = await handleGoogleLogin(response.credential)
      if (result.user) {
        toast.success('Successfully logged in with Google!')
      } else {
        toast.error(result.error || 'Failed to login with Google')
      }
    } catch (error) {
      toast.error('An error occurred during Google login')
    }
  }

  return (
    <AuthLayout>
      <AuthForm 
        type="login" 
        onSubmit={handleSubmit}
        onGoogleSuccess={handleGoogleSuccess}
      />
    </AuthLayout>
  )
}
