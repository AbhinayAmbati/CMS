import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Blog from '../Pages/Blog'
import BlogPost from '../Pages/BlogPost'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import UserManagement from '../Pages/Admin/UserManagement'
import ContentManagement from '../Pages/Admin/ContentManagement'
import ResetPassword from '../Pages/ResetPassword'

const Navroutes = () => {
  return (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        
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
        <Route path="/admin/content" element={
          <ProtectedRoute requireAdmin={true}>
            <ContentManagement />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default Navroutes