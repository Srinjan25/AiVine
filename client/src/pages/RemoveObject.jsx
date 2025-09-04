import React, { useState } from 'react'
import { Scissors, Sparkles, Upload, Download, RefreshCw, Image as ImageIcon, Target, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState('')
  const { getToken } = useAuth()

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setInput(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      
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

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = content
    link.download = `object_removed_${new Date().toISOString().slice(0, 10)}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Image downloaded!')
  }

  const resetForm = () => {
    setInput('')
    setObject('')
    setContent('')
    setPreview('')
  }

  const commonObjects = ['person', 'car', 'tree', 'building', 'chair', 'table', 'dog', 'cat']

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-blue-100 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Object Remover
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Remove unwanted objects from your images with precision using our advanced AI technology. 
            Simply upload an image and describe what you want to remove.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Target, title: 'Precise Removal', desc: 'AI identifies and removes objects accurately' },
            { icon: Zap, title: 'Fast Processing', desc: 'Get results in seconds, not minutes' },
            { icon: ImageIcon, title: 'High Quality', desc: 'Maintains image quality after processing' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className='flex items-start gap-8 flex-wrap xl:flex-nowrap'>
          {/* Left Column - Configuration */}
          <div className='w-full xl:max-w-lg'>
            <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              {/* Header */}
              <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-6'>
                <div className='flex items-center gap-3'>
                  <Sparkles className='w-6 h-6 text-white' />
                  <h2 className='text-xl font-bold text-white'>Object Removal Setup</h2>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* Image Upload */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Upload Image
                  </label>
                  
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                      dragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : input 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    
                    {preview ? (
                      <div className="space-y-3">
                        <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg mx-auto" />
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-700 font-medium">{input.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          dragOver ? 'bg-blue-200' : 'bg-gray-200'
                        }`}>
                          <Upload className={`w-8 h-8 ${dragOver ? 'text-blue-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            {dragOver ? 'Drop your image here' : 'Upload an image'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Drag & drop or click to select
                          </p>
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 justify-center">
                            <AlertCircle className="w-3 h-3" />
                            JPG, PNG, WEBP supported
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Object Description */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Object to Remove
                  </label>
                  <textarea 
                    onChange={(e) => setObject(e.target.value)} 
                    value={object} 
                    rows={3} 
                    placeholder='Describe the object you want to remove (e.g., "car", "person", "building")' 
                    className='w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none' 
                    required 
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Use single object names for best results
                  </p>
                </div>

                {/* Quick Suggestions */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Quick Suggestions
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {commonObjects.map((obj, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setObject(obj)}
                        className='px-3 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 rounded-full text-sm transition-colors border hover:border-blue-300'
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button 
                    disabled={loading || !input || !object.trim()} 
                    type="submit"
                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                  >
                    {loading ? (
                      <>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Removing Object...</span>
                      </>
                    ) : (
                      <>
                        <Scissors className='w-5 h-5'/>
                        <span>Remove Object</span>
                      </>
                    )}
                  </button>

                  {(input || object || content) && (
                    <button 
                      type="button"
                      onClick={resetForm}
                      className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors'
                    >
                      <RefreshCw className='w-4 h-4'/>
                      Reset Form
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className='flex-1 min-w-0'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full'>
              {/* Header */}
              <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Scissors className='w-6 h-6 text-white'/>
                    <h2 className='text-xl font-bold text-white'>Processed Image</h2>
                  </div>
                  {content && (
                    <button 
                      onClick={downloadImage}
                      className='flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white font-medium'
                      title="Download processed image"
                    >
                      <Download className='w-4 h-4' />
                      Download
                    </button>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className='p-6 min-h-[600px]'>
                {!content ? (
                  <div className='flex-1 flex flex-col justify-center items-center h-full text-center py-20'>
                    <div className='w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6'>
                      <Scissors className='w-10 h-10 text-purple-500'/>
                    </div>
                    <h3 className='text-xl font-semibold text-gray-700 mb-2'>Ready to Remove Objects?</h3>
                    <p className='text-gray-500 max-w-md mb-6'>
                      Upload an image and describe the object you want to remove. Our AI will precisely eliminate it while preserving the background.
                    </p>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg'>
                      <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                        <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                          <Upload className='w-4 h-4 text-blue-600' />
                        </div>
                        <div className='text-left'>
                          <p className='text-sm font-semibold text-gray-700'>1. Upload Image</p>
                          <p className='text-xs text-gray-500'>Select your photo</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                        <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                          <Target className='w-4 h-4 text-green-600' />
                        </div>
                        <div className='text-left'>
                          <p className='text-sm font-semibold text-gray-700'>2. Describe Object</p>
                          <p className='text-xs text-gray-500'>What to remove</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">Object successfully removed!</span>
                    </div>
                    <div className='bg-gray-50 rounded-xl p-4'>
                      <img 
                        src={content} 
                        alt='Processed image with object removed' 
                        className='w-full h-auto max-h-[500px] object-contain rounded-lg mx-auto shadow-lg'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveObject
