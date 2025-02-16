import { ButtonHTMLAttributes } from 'react'
import { LucideIcon } from 'lucide-react'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
}

export function AuthButton({ icon: Icon, label, ...props }: AuthButtonProps) {
  return (
    <button
      {...props}
      className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white"
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  )
}
