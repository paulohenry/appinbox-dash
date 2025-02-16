import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function AppleCallback() {
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.hash.substring(1))
    const idToken = params.get('id_token')
    const state = params.get('state')
    const storedState = sessionStorage.getItem('apple_oauth_state')

    if (!idToken || !state || !storedState || state !== storedState) {
      window.opener.postMessage({
        type: 'apple-auth-error',
        error: 'Invalid authentication response'
      }, window.location.origin)
      window.close()
      return
    }

    // Here you would:
    // 1. Validate the ID token
    // 2. Extract user information
    // For now, we'll just simulate success

    window.opener.postMessage({
      type: 'apple-auth-success',
      data: {
        provider: 'apple',
        token: idToken
      }
    }, window.location.origin)
    
    window.close()
  }, [location])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center text-gray-600">Completing authentication...</p>
    </div>
  )
}
