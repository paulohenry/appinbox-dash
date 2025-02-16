import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './contexts/ThemeContext'
import './i18n'
import App from './App'
import './index.css'

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
