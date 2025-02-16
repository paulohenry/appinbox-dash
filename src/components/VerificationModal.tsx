import { useState } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
  onVerify: () => void
}

export function VerificationModal({ isOpen, onClose, phoneNumber, onVerify }: VerificationModalProps) {
  const [isVerifying, setIsVerifying] = useState(false)

  if (!isOpen) return null

  const handleVerify = async () => {
    setIsVerifying(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      onVerify()
      toast.success('Phone number verified successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to verify phone number')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Verify your phone number
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please confirm that {phoneNumber} is your phone number. We'll send a verification code to this number.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
