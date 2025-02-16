export interface GoogleUser {
  email: string
  email_verified: boolean
  name: string
  picture: string
  given_name: string
  family_name: string
  sub: string
}

export interface AuthResponse {
  user: GoogleUser | null
  error?: string
}
