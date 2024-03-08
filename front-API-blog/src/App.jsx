
//IMPORTS
// React 
import { useState, useEffect } from 'react'
// Import Routes 
import { Route, Routes } from 'react-router-dom'
// Styles
import './App.css'
// Components 
import { Navbar } from './Components/Navbar'

// Pages 
import { Homepage } from './Pages/Homepage'
import { Blogpostpage } from './Pages/Blogpostpage'
import { Signup } from './Pages/Signup'





// Function //
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/blogpost/:id" element={<Blogpostpage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
