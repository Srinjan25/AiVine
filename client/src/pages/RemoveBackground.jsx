import React, { useState } from 'react'
import { Sparkles, Eraser } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input) {
      toast.error('Please select an image file');
      return;
    }
    
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', input)
     
      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      })
     
      if (data.success) {
        setContent(data.content)
        toast.success('Background removed successfully!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 bg-indigo-200'>
      {/* Left column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-2'>
          <Sparkles className='w-6 h-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
       
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type='file'
          accept='image/*'
          className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
        <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG, PNG and other image formats</p>
       
        <button
          disabled={loading}
          type="submit"
          className='mt-4 w-full text-white py-2 px-4 rounded-md bg-gradient-to-r from-[#F6AB41] to-[#FF4938] flex items-center justify-center gap-2 disabled:opacity-50'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
          ) : (
            <Eraser className='w-5 h-5' />
          )}
          Remove Background
        </button>
      </form>
     
      {/* Right column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
       
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Eraser className='w-9 h-9' />
              <p>Remove background to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 flex-1'>
            <img src={content} alt="Processed image" className='w-full h-auto max-h-full object-contain' />
            <a
              href={content}
              download="background-removed.png"
              className='mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default RemoveBackground