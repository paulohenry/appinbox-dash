import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function TwitterCallback() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const storedState = sessionStorage.getItem('twitter_oauth_state')
    const codeVerifier = sessionStorage.getItem('twitter_code_verifier')

    if (!code || !state || !storedState || state !== storedState) {
      window.opener.postMessage({
        type: 'twitter-auth-error',
        error: 'Invalid authentication response'
      }, window.location.origin)
      window.close()
      return
    }

    // Here you would:
    // 1. Send the code and code_verifier to your backend
    // 2. Exchange them for an access token
    // 3. Get user information
    // For now, we'll just simulate success

    window.opener.postMessage({
      type: 'twitter-auth-success',
      data: {
        provider: 'twitter',
        code
      }
    }, window.location.origin)
    
    window.close()
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center text-gray-600">Completing authentication...</p>
    </div>
  )
}
