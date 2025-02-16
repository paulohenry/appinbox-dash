import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TwitterCallback from './pages/auth/twitter-callback'
import AppleCallback from './pages/auth/apple-callback'
import GitHubCallback from './pages/auth/github-callback'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/twitter/callback" element={<TwitterCallback />} />
        <Route path="/auth/apple/callback" element={<AppleCallback />} />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
      </Routes>
    </BrowserRouter>
  )
}
