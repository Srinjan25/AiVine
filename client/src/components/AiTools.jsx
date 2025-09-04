import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  
  return (
    <div className='relative px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 my-32 overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className='relative z-10'>
        {/* Header Section */}
        <div className='text-center mb-20'>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-medium">AI-Powered Tools</span>
          </div>
          
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6'>
            Unleash Your{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 animate-gradient'>
              Creative Power
            </span>
          </h2>
          
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Everything you need to create, enhance, and optimize your content with cutting-edge AI technology. 
            Designed to boost your productivity and unleash infinite possibilities.
          </p>
        </div>

        {/* Tools Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center'>
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className='group relative p-8 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl border border-gray-200/50 hover:border-transparent hover:-translate-y-3 transition-all duration-500 ease-out cursor-pointer overflow-hidden'
              onClick={() => user && navigate(tool.path)}
            >
              {/* Hover overlay */}
              <div
                className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl'
                style={{ background: `linear-gradient(135deg, ${tool.bg.from}20, ${tool.bg.to}20)` }}
              ></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
              </div>
              
              <div className='relative z-20'>
                {/* Icon */}
                <div className='relative mb-6'>
                  <div
                    className='w-16 h-16 p-4 flex items-center justify-center rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500'
                    style={{ background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})` }}
                  >
                    <tool.Icon className='w-8 h-8 text-white drop-shadow-lg' />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className='mb-4 text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>
                  {tool.title}
                </h3>
                
                <p className='text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300'>
                  {tool.description}
                </p>
                
                {/* CTA */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300'>
                    Explore Tool
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-purple-500 group-hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300">
                    <ArrowRight className='w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300' />
                  </div>
                </div>
              </div>
              
              {/* Bottom accent line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${tool.bg.from}, ${tool.bg.to})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AiTools
