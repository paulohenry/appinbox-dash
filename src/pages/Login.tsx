import { FormEvent } from 'react'
import toast from 'react-hot-toast'
import { AuthForm } from '../components/AuthForm'
import { AuthLayout } from '../components/AuthLayout'

export default function Login() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    toast.success('Login functionality to be implemented')
  }

  const handleSocialSuccess = (response: any) => {
    console.log('Social login successful:', response)
    toast.success('Successfully logged in!')
  }

  return (
    <AuthLayout>
      <AuthForm 
        type="login" 
        onSubmit={handleSubmit}
        onSocialSuccess={handleSocialSuccess}
      />
    </AuthLayout>
  )
}
