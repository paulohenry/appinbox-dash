import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function GitHubCallback() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const storedState = sessionStorage.getItem('github_oauth_state')

    if (!code || !state || !storedState || state !== storedState) {
      if (window.opener) {
        window.opener.postMessage({
          type: 'github-auth-error',
          error: 'Invalid authentication response'
        }, window.location.origin)
      }
      window.close()
      return
    }

    // Here you would:
    // 1. Send the code to your backend
    // 2. Exchange it for an access token
    // 3. Get user information
    // For now, we'll just simulate success
    if (window.opener) {
      window.opener.postMessage({
        type: 'github-auth-success',
        data: {
          provider: 'github',
          code
        }
      }, window.location.origin)
    }
    
    window.close()
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center text-gray-600">Completing authentication...</p>
    </div>
  )
}
