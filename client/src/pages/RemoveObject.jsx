import React, { useState } from 'react'
import { Scissors, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      
      // Validation checks
      if (!input) {
        toast.error('Please select an image file');
        return;
      }
      
      if (!object.trim()) {
        toast.error('Please describe the object to remove');
        return;
      }
       
      if (object.split(' ').length > 1) {
        toast.error('Please enter only one object name');
        return;
      }
      
      const formData = new FormData()
      formData.append('image', input)
      formData.append('object', object)
      
      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
     
      if (data.success) {
        setContent(data.content)
        toast.success('Object removed successfully!');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 bg-indigo-200'>
      {/* Left column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-2'>
          <Sparkles className='w-6 h-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input 
          onChange={(e) => setInput(e.target.files[0])} 
          type='file' 
          accept='image/*'  
          className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          required 
        />
       
        <p className='mt-6 text-sm font-medium'>Describe Object Name to Remove</p>
        <textarea 
          onChange={(e) => setObject(e.target.value)} 
          value={object} 
          rows={4} 
          placeholder='Enter the object you want to remove (e.g., "car", "person", "building")' 
          className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          required 
        />
     
        <button 
          disabled={loading} 
          type="submit"
          className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md bg-gradient-to-r from-[#417DF6] to-[#8E37EB] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? (
            <>
              <span className='w-4 h-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin'></span>
              Processing...
            </>
          ) : (
            <>
              <Scissors className='w-5 h-5'/>
              Remove Object
            </>
          )}
        </button>
      </form>
      
      {/* Right column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Scissors className='w-9 h-9'/>
              <p>Upload an image and remove objects to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 flex-1'>
            <img src={content} alt='Processed image' className='w-full h-full object-contain rounded-md'/>
          </div>
        )}
      </div>
    </div>
  )
}

export default RemoveObject