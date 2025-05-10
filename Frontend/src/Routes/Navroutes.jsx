import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Content from '../Pages/Content'
import ContentPost from '../Pages/ContentPost'
import ProtectedRoute from '../Components/ProtectedRoute'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import UserManagement from '../Pages/Admin/UserManagement'
import Analytics from '../Pages/Admin/Analytics'
import Settings from '../Pages/Admin/Settings'
import ResetPassword from '../Pages/ResetPassword'
import ContentEditor from '../Components/ContentEditor'
const Navroutes = () => {
  return (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/content" element={<Content />} />
        <Route path="/content/:id" element={<ContentPost />} />
        <Route path='/create-content' element={<ContentEditor />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute requireAdmin={true}>
            <UserManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <ProtectedRoute requireAdmin={true}>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute requireAdmin={true}>
            <Settings />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default Navroutes