import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'

const Navroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />}/>s
        
    </Routes>
  )
}

export default Navroutes