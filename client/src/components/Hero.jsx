import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayCircle, Sparkles, ArrowRight, Users, Zap } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate()
  
  return (
    <div className='relative flex flex-col w-full justify-center items-center min-h-screen overflow-hidden'>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-4000"></div>
      </div>

      {/* Geometric decorations */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-16 w-5 h-5 bg-pink-400 rounded-full animate-pulse delay-2000"></div>

      <div className='relative z-10 text-center px-4 sm:px-20 xl:px-32 mb-16'>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 mb-8 shadow-lg">
          <Zap className="w-4 h-4 text-purple-600" />
          <span className="text-purple-700 font-semibold text-sm">Powered by Advanced AI</span>
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
        </div>

        {/* Main heading with enhanced styling */}
        <h1 className='text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-black mx-auto leading-[1.1] text-gray-900 mb-8'>
          Create{' '}
          <span className='relative'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 animate-gradient-x'>
              Amazing Content
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full opacity-50"></div>
          </span>
          <br />
          with the Power of{' '}
          <span className='relative inline-block'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700'>
              AI Tools
            </span>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-purple-500 animate-spin-slow" />
          </span>
        </h1>

        <p className='max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed font-medium'>
          Transform your content creation with our suite of premium AI tools. Write compelling articles, generate stunning images, and enhance your workflow with{' '}
          <span className="text-purple-600 font-semibold">unprecedented ease</span> and efficiency.
        </p>
      </div>

      {/* Enhanced CTA buttons */}
      <div className='relative z-10 flex flex-wrap justify-center gap-6 text-base max-sm:text-sm mb-16'>
        <button
          onClick={() => navigate('/ai')}
          className='group relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300 overflow-hidden'
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Start Creating Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>

        <button className='group flex items-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-bold px-10 py-5 rounded-2xl border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-200'>
          <PlayCircle className='w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300' />
          <span>Watch Demo</span>
        </button>
      </div>

      {/* Enhanced social proof */}
      <div className='relative z-10 flex flex-col sm:flex-row items-center gap-6 text-gray-600 text-lg'>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={assets.user_group} alt="User group icon" className='h-12 opacity-80' />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="text-left">
            <div className="font-bold text-gray-800 text-xl"></div>
            <div className="text-sm text-gray-500">Happy Creators</div>
          </div>
        </div>

        <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
          <span className="ml-2 font-medium">Join the community</span>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Hero
