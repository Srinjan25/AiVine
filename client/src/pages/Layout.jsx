import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from "../components/Sidebar";  
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser();
 
  return user ? (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="w-full px-8 h-14 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm z-50 relative">
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate('/')}
          className="w-32 sm:w-44 cursor-pointer"
        />
        <button
          onClick={() => setSidebar(!sidebar)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebar ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </nav>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
       
        {/* Mobile Overlay */}
        {sidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebar(false)}
          />
        )}
       
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 lg:ml-0">
          <div className="p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <SignIn />
      </div>
    </div>
  )
}

export default Layout
