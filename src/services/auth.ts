import { jwtDecode } from "jwt-decode"
import { AuthResponse, SocialUser } from "../types/auth"

export const handleGoogleLogin = async (credential: string): Promise<AuthResponse> => {
  try {
    const decoded: SocialUser = jwtDecode(credential)
    return { 
      user: {
        ...decoded,
        provider: 'google'
      }
    }
  } catch (error) {
    return {
      user: null,
      error: 'Failed to process Google login'
    }
  }
}

export const handleTwitterLogin = async (): Promise<AuthResponse> => {
  try {
    // X (Twitter) OAuth 2.0 Configuration
    const clientId = 'YOUR_TWITTER_CLIENT_ID'
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/twitter/callback`)
    const scope = 'tweet.read users.read'
    const state = crypto.randomUUID()
    const codeChallenge = await generateCodeChallenge()
    
    // Store state and code verifier in sessionStorage
    sessionStorage.setItem('twitter_oauth_state', state)
    sessionStorage.setItem('twitter_code_verifier', codeChallenge.verifier)

    // Construct Twitter OAuth URL
    const authUrl = `https://twitter.com/i/oauth2/authorize?` +
      `response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=${scope}` +
      `&state=${state}` +
      `&code_challenge=${codeChallenge.challenge}` +
      `&code_challenge_method=S256`

    // Open Twitter login in a popup
    const width = 600
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    
    window.open(
      authUrl,
      'Twitter Login',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    )

    return {
      user: null,
      error: 'Awaiting Twitter authentication'
    }
  } catch (error) {
    return {
      user: null,
      error: 'Failed to process Twitter login'
    }
  }
}

export const handleAppleLogin = async (): Promise<AuthResponse> => {
  try {
    // Apple Sign-in Configuration
    const clientId = 'YOUR_APPLE_CLIENT_ID'
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/apple/callback`)
    const scope = 'name email'
    const state = crypto.randomUUID()
    
    // Store state in sessionStorage
    sessionStorage.setItem('apple_oauth_state', state)

    // Construct Apple Sign-in URL
    const authUrl = `https://appleid.apple.com/auth/authorize?` +
      `client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code id_token` +
      `&scope=${scope}` +
      `&response_mode=fragment` +
      `&state=${state}`

    // Open Apple login in a popup
    const width = 600
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    
    window.open(
      authUrl,
      'Apple Login',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    )

    return {
      user: null,
      error: 'Awaiting Apple authentication'
    }
  } catch (error) {
    return {
      user: null,
      error: 'Failed to process Apple login'
    }
  }
}

// Helper function to generate PKCE challenge for Twitter OAuth
async function generateCodeChallenge(): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateRandomString(128)
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  
  return { verifier, challenge }
}

function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
