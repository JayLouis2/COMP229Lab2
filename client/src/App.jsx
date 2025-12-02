import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Users from './pages/Users'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Contacts from './pages/Contacts'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { isAuthenticated, signOut } from './api'

export default function App(){
  const [authenticated, setAuthenticated] = useState(isAuthenticated())
  const navigate = useNavigate()

  useEffect(() => {
    // Listen for authentication changes
    const handleAuthChange = () => {
      setAuthenticated(isAuthenticated())
    }
    
    window.addEventListener('auth-change', handleAuthChange)
    return () => window.removeEventListener('auth-change', handleAuthChange)
  }, [])

  const handleSignOut = () => {
    signOut()
    setAuthenticated(false)
    alert('You have been signed out')
    navigate('/signin')
  }

  return (
    <div className="app">
      <header>
        <h1>Portfolio Admin</h1>
        <nav>
          <Link to="/users">Users</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contacts">Contacts</Link>
          {authenticated ? (
            <>
              <span className="auth-status">✓ Authenticated</span>
              <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/" element={<div>Select a resource from the nav.</div>} />
        </Routes>
      </main>
    </div>
  )
}
