import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ArrowRight, Menu, X, Sparkles, Zap } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/90 shadow-lg border-b border-gray-200/50' 
          : 'backdrop-blur-sm bg-white/70'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className='block lg:hidden group p-3 rounded-xl hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all duration-200'
              aria-label="Toggle navigation menu"
            >
              <Menu className='w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors duration-200' />
            </button>

            {/* Logo */}
            <div 
              className='flex items-center gap-3 cursor-pointer group'
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <img
                src={assets.logo}
                alt="AiVine logo"
                className='h-8 opacity-80 group-hover:opacity-100 transition-opacity duration-200'
              />
            </div>

            {/* User Button or Get Started */}
            <div className='flex items-center gap-4'>
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/ai')}
                    className='hidden sm:flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200'
                  >
                    <Zap className="w-4 h-4" />
                    Dashboard
                  </button>
                  <div className="relative group">
                    <UserButton 
                      afterSignOutUrl="/" 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105 border-2 border-transparent group-hover:border-purple-300"
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={openSignIn}
                  className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300'
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2 text-sm">
                    Get Started
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  )
}

export default Navbar
