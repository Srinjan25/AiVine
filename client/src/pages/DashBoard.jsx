import React, { useState, useEffect } from 'react'
import { Sparkles, Gem, Zap, Heart, Eye, Image, Edit, TrendingUp, Calendar } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import Creationitem from '../components/Creationitem'
import axios from 'axios'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creation, setCreation] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashBoardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreation(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashBoardData()
  }, [])

  // Calculate stats
  const thisMonthCreations = creation.filter(item => {
    const createdDate = new Date(item.createdAt || Date.now())
    const now = new Date()
    return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
  }).length

  const totalLikes = creation.reduce((sum, item) => sum + (item.likes?.length || 0), 0)

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Welcome Back! 
          </h1>
          <p className='text-gray-600 text-lg'>Here's your creative journey overview</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {/* Total Creations Card */}
          <div className='bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium mb-2'>Total Creations</p>
                <h3 className='text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors'>
                  {creation.length}
                </h3>
                <div className='flex items-center mt-2 text-green-600 text-xs'>
                  <TrendingUp className='w-3 h-3 mr-1' />
                  <span>+12% this month</span>
                </div>
              </div>
              <div className='p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                <Sparkles className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>

          {/* Active Plan Card */}
          <div className='bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium mb-2'>Active Plan</p>
                <h3 className='text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors'>
                  <Protect plan='premium' fallback='Free'>Premium</Protect>
                </h3>
                <div className='flex items-center mt-2 text-purple-600 text-xs'>
                  <Calendar className='w-3 h-3 mr-1' />
                  <span>Expires Dec 2024</span>
                </div>
              </div>
              <div className='p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                <Gem className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>

          {/* This Month Card */}
          <div className='bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium mb-2'>This Month</p>
                <h3 className='text-3xl font-bold text-gray-800 group-hover:text-green-600 transition-colors'>
                  {thisMonthCreations}
                </h3>
                <div className='flex items-center mt-2 text-green-600 text-xs'>
                  <Zap className='w-3 h-3 mr-1' />
                  <span>Keep it up!</span>
                </div>
              </div>
              <div className='p-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                <Zap className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>

          {/* Total Likes Card */}
          <div className='bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium mb-2'>Total Likes</p>
                <h3 className='text-3xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors'>
                  {totalLikes}
                </h3>
                <div className='flex items-center mt-2 text-pink-600 text-xs'>
                  <Heart className='w-3 h-3 mr-1' />
                  <span>Community loves you!</span>
                </div>
              </div>
              <div className='p-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                <Heart className='w-8 h-8 text-white' />
              </div>
            </div>
          </div>
        </div>



        {/* Recent Creations */}
        {loading ? (
          <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-100'>
            <div className='flex justify-center items-center h-64'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4'></div>
                <p className='text-gray-600'>Loading your creations...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-100'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-2xl font-bold text-gray-800'>Recent Creations</h2>
              {creation.length > 5 && (
                <button className='text-purple-600 hover:text-purple-700 font-medium'>
                  View All
                </button>
              )}
            </div>
            
            {creation.length === 0 ? (
              <div className='text-center py-16'>
                <div className='p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full inline-block mb-6'>
                  <Sparkles className='w-12 h-12 text-purple-500' />
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>No creations yet</h3>
                <p className='text-gray-600 mb-6'>Start creating amazing AI content today!</p>
                <button className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105'>
                  Create Your First
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                {creation.slice(0, 5).map((item) => (
                  <div key={item.id} className='flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 group'>
                    <div className='flex items-center space-x-4'>
                      <div className='p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300'>
                        {item.type === 'image' ? 
                          <Image className='w-6 h-6 text-white' /> : 
                          <Edit className='w-6 h-6 text-white' />
                        }
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-800 group-hover:text-purple-600 transition-colors'>
                          {item.type === 'image' ? 'AI Generated Image' : 'Blog Title Generation'}
                        </h3>
                        <div className='flex items-center space-x-4 mt-1'>
                          <p className='text-gray-600 text-sm'>
                            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                          {item.likes && (
                            <div className='flex items-center space-x-1 text-pink-500'>
                              <Heart className='w-4 h-4' />
                              <span className='text-sm'>{item.likes.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className='flex items-center space-x-4'>
                      <span className='text-green-600 text-sm font-medium bg-green-100 px-3 py-1 rounded-full'>
                        Completed
                      </span>
                      <button className='p-2 text-gray-400 hover:text-purple-600 transition-colors hover:scale-110 transform duration-200'>
                        <Eye className='w-5 h-5' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
