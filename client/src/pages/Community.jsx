import React, { useEffect, useState } from 'react'
import { Heart, Eye, Share2, Download } from 'lucide-react'
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like', { id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      
      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-white text-xl'>Loading amazing creations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
            Community Gallery
          </h1>
          <p className='text-xl text-gray-300'>Discover amazing creations from our creative community</p>
        </div>

        {/* Stats Bar */}
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20'>
          <div className='flex justify-center items-center space-x-8 text-white'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>{creations.length}</h3>
              <p className='text-gray-300'>Total Images</p>
            </div>
            <div className='w-px h-12 bg-white/20'></div>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>
                {creations.reduce((total, creation) => total + (creation.likes?.length || 0), 0)}
              </h3>
              <p className='text-gray-300'>Total Likes</p>
            </div>
            <div className='w-px h-12 bg-white/20'></div>
            <div className='text-center'>
              <h3 className='text-2xl font-bold'>Active</h3>
              <p className='text-gray-300'>Community</p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {creations.length === 0 ? (
          <div className='text-center py-20'>
            <div className='p-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full inline-block mb-6'>
              <Heart className='w-16 h-16 text-purple-300' />
            </div>
            <h2 className='text-2xl font-bold text-white mb-4'>No creations yet</h2>
            <p className='text-gray-300'>Be the first to share your amazing AI creations!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {creations.map((creation, index) => (
              <div key={creation.id || index} className='group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl'>
                {/* Image Container */}
                <div className='aspect-square overflow-hidden relative'>
                  <img 
                    src={creation.content} 
                    alt={creation.prompt || 'AI Generated Image'}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    {/* Action buttons */}
                    <div className='absolute top-4 right-4 flex gap-2'>
                      <button className='p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all'>
                        <Share2 className='w-4 h-4 text-white' />
                      </button>
                      <button className='p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all'>
                        <Download className='w-4 h-4 text-white' />
                      </button>
                    </div>

                    {/* Bottom content */}
                    <div className='absolute bottom-0 left-0 right-0 p-4'>
                      {creation.prompt && (
                        <p className='text-white text-sm mb-3 line-clamp-2 leading-relaxed'>
                          {creation.prompt}
                        </p>
                      )}
                      
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-3 text-gray-300'>
                          <div className='flex items-center space-x-1'>
                            <Eye className='w-4 h-4' />
                            <span className='text-sm'>{Math.floor(Math.random() * 500) + 50}</span>
                          </div>
                        </div>
                        
                        <div className='flex items-center space-x-2'>
                          <span className='text-white font-medium text-sm'>
                            {creation.likes?.length || 0}
                          </span>
                          <button
                            onClick={() => imageLikeToggle(creation.id)}
                            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                              creation.likes?.includes(user?.id)
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-white/20 text-white hover:bg-red-500/20 hover:text-red-400'
                            }`}
                          >
                            <Heart 
                              className={`w-5 h-5 ${
                                creation.likes?.includes(user?.id) ? 'fill-current' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer - visible on mobile */}
                <div className='p-4 md:hidden'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-2 text-gray-300'>
                      <Eye className='w-4 h-4' />
                      <span className='text-sm'>{Math.floor(Math.random() * 500) + 50}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span className='text-white font-medium text-sm'>
                        {creation.likes?.length || 0}
                      </span>
                      <button
                        onClick={() => imageLikeToggle(creation.id)}
                        className={`p-2 rounded-lg transition-all ${
                          creation.likes?.includes(user?.id)
                            ? 'text-red-400'
                            : 'text-gray-300 hover:text-red-400'
                        }`}
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            creation.likes?.includes(user?.id) ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {creations.length > 0 && (
          <div className='text-center mt-12'>
            <button className='px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg'>
              Load More Creations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Community
