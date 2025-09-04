import React from 'react'
import { useUser, useClerk, Protect } from '@clerk/clerk-react';
import { FileText, Hash, House, Scissors, SquarePen, Users, Image, LogOut, Gem, Sparkles, Crown } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House, gradient: 'from-blue-500 to-indigo-500' },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, gradient: 'from-purple-500 to-pink-500' },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, gradient: 'from-green-500 to-emerald-500' },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image, gradient: 'from-orange-500 to-red-500' },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Image, gradient: 'from-cyan-500 to-blue-500' },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, gradient: 'from-yellow-500 to-orange-500' },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText, gradient: 'from-indigo-500 to-purple-500' },
  { to: '/ai/community', label: 'Community', Icon: Users, gradient: 'from-pink-500 to-rose-500' }
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <>
      {/* Desktop Sidebar - Always visible on lg+ screens */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 bg-gradient-to-b from-white via-gray-50/50 to-white shadow-xl border-r border-gray-200/50">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-50"></div>
        
        {/* Top Section: User Avatar & Info */}
        <div className="relative z-10 pt-8 pb-6 w-full text-center border-b border-gray-100">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            <img
              src={user.imageUrl}
              alt="User avatar"
              className="relative w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="mt-4 text-lg font-bold text-gray-800">{user.fullName}</h1>
          <p className='text-sm text-gray-500 mb-4'>{user.primaryEmailAddress.emailAddress}</p>
          
          {/* User Plan Badge */}
          <Protect 
            plan='premium' 
            fallback={
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-semibold">
                <Sparkles className="w-3 h-3" />
                Free Plan
              </div>
            }
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              <Crown className="w-3 h-3" />
              Premium Plan
            </div>
          </Protect>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 mt-6 space-y-2 overflow-y-auto">
          {navItems.map(({ to, label, Icon, gradient }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-out relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg transform scale-[1.02]'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md hover:scale-[1.01]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active background gradient */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90 rounded-xl`}></div>
                  )}
                  
                  {/* Hover background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : `bg-gradient-to-r ${gradient} group-hover:scale-110`
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white'}`} />
                  </div>
                  
                  {/* Label */}
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    {label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section: Profile & Logout */}
        <div className='relative z-10 border-t border-gray-100 p-6'>
          <div 
            onClick={openUserProfile} 
            className='group flex gap-4 items-center cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 mb-4'
          >
            <div className="relative">
              <img 
                src={user.imageUrl} 
                className='w-12 h-12 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all duration-300' 
                alt="User profile" 
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-2 h-2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className='text-sm font-bold text-gray-800 group-hover:text-gray-900'>{user.fullName}</h3>
              <p className='text-xs text-gray-500 flex items-center group-hover:text-gray-600'>
                <Protect plan='premium' fallback={
                  <>
                    <Gem className='w-3 h-3 mr-1 text-gray-400' />
                    Free Plan
                  </>
                }>
                  <Crown className='w-3 h-3 mr-1 text-yellow-500' />
                  Premium Plan
                </Protect>
              </p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={signOut}
            className='group w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium'
          >
            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all duration-300">
              <LogOut className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
        
        {/* Decorative shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>

      {/* Mobile Sidebar - Slide in from left */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-white via-gray-50/50 to-white shadow-2xl border-r border-gray-200/50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          sidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Same content as desktop but for mobile */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-50"></div>
        
        {/* Top Section: User Avatar & Info */}
        <div className="relative z-10 pt-8 pb-6 w-full text-center border-b border-gray-100">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            <img
              src={user.imageUrl}
              alt="User avatar"
              className="relative w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="mt-4 text-lg font-bold text-gray-800">{user.fullName}</h1>
          <p className='text-sm text-gray-500 mb-4'>{user.primaryEmailAddress.emailAddress}</p>
          
          {/* User Plan Badge */}
          <Protect 
            plan='premium' 
            fallback={
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-semibold">
                <Sparkles className="w-3 h-3" />
                Free Plan
              </div>
            }
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              <Crown className="w-3 h-3" />
              Premium Plan
            </div>
          </Protect>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 mt-6 space-y-2 overflow-y-auto">
          {navItems.map(({ to, label, Icon, gradient }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-out relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg transform scale-[1.02]'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-md hover:scale-[1.01]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active background gradient */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90 rounded-xl`}></div>
                  )}
                  
                  {/* Hover background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : `bg-gradient-to-r ${gradient} group-hover:scale-110`
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white'}`} />
                  </div>
                  
                  {/* Label */}
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    {label}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section: Profile & Logout */}
        <div className='relative z-10 border-t border-gray-100 p-6'>
          <div 
            onClick={openUserProfile} 
            className='group flex gap-4 items-center cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 mb-4'
          >
            <div className="relative">
              <img 
                src={user.imageUrl} 
                className='w-12 h-12 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all duration-300' 
                alt="User profile" 
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-2 h-2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className='text-sm font-bold text-gray-800 group-hover:text-gray-900'>{user.fullName}</h3>
              <p className='text-xs text-gray-500 flex items-center group-hover:text-gray-600'>
                <Protect plan='premium' fallback={
                  <>
                    <Gem className='w-3 h-3 mr-1 text-gray-400' />
                    Free Plan
                  </>
                }>
                  <Crown className='w-3 h-3 mr-1 text-yellow-500' />
                  Premium Plan
                </Protect>
              </p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={signOut}
            className='group w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium'
          >
            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all duration-300">
              <LogOut className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
        
        {/* Decorative shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </>
  );
};

export default Sidebar;
