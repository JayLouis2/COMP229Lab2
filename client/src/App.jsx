import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './pages/Users'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Contacts from './pages/Contacts'

export default function App(){
  return (
    <div className="app">
      <header>
        <h1>Portfolio Admin</h1>
        <nav>
          <Link to="/users">Users</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>
      </header>
      <main>
        <Routes>
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
