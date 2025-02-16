export interface SocialUser {
  email: string
  email_verified?: boolean
  name: string
  picture?: string
  given_name?: string
  family_name?: string
  sub: string
  provider: 'google' | 'github' | 'twitter' | 'apple'
}

export interface AuthResponse {
  user: SocialUser | null
  error?: string
}
