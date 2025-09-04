import React, { useState } from 'react'
import { Sparkles, Eraser, Upload, Image as ImageIcon, Scissors, Wand2 } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState('')
  const { getToken } = useAuth()

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        setInput(file)
        setPreview(URL.createObjectURL(file))
      } else {
        toast.error('Please select an image file')
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setInput(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!input) {
      toast.error('Please select an image file')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', input)

      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      if (data.success) {
        setContent(data.content)
        toast.success('Background removed successfully!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const resetAll = () => {
    setInput('')
    setContent('')
    setPreview('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            AI Background Remover
          </h1>
          <p className="text-xl text-gray-300">Remove backgrounds from images instantly with AI precision</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Upload */}
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl mr-4">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Upload & Process</h2>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative mb-8 p-8 border-2 border-dashed rounded-2xl transition-all duration-300 ${
                  dragActive
                    ? 'border-violet-400 bg-violet-500/20'
                    : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                
                {preview ? (
                  <div className="text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-xl shadow-lg mb-4"
                    />
                    <p className="text-white font-medium">Image selected</p>
                    <button
                      onClick={resetAll}
                      className="mt-2 text-violet-300 hover:text-violet-200 text-sm underline"
                    >
                      Choose different image
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="p-6 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full inline-block mb-6">
                      <Upload className="w-12 h-12 text-violet-300" />
                    </div>
                    <p className="text-white text-lg font-semibold mb-2">
                      Drop your image here
                    </p>
                    <p className="text-gray-300 mb-4">or click to browse</p>
                    <div className="text-xs text-gray-400">
                      Supports JPG, PNG, WebP and other formats
                    </div>
                  </div>
                )}
              </div>

              {/* Process Button */}
              <button
                disabled={loading || !input}
                onClick={onSubmitHandler}
                className="w-full py-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 text-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Processing Magic...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Scissors className="w-6 h-6 mr-3" />
                    Remove Background
                  </div>
                )}
              </button>

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-violet-500/20 rounded-lg">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-sm">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm">High Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Result */}
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl h-full min-h-[600px]">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mr-4">
                  <Eraser className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Processed Result</h2>
              </div>

              {!content ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="p-8 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full mb-6">
                    <Eraser className="w-16 h-16 text-violet-300" />
                  </div>
                  <p className="text-gray-300 text-lg mb-2">Ready for magic?</p>
                  <p className="text-gray-400">Upload an image to see the background removal in action</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Before/After Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {preview && (
                      <div>
                        <p className="text-gray-300 text-sm mb-2 font-medium">Before</p>
                        <img
                          src={preview}
                          alt="Original"
                          className="w-full h-48 object-contain rounded-xl bg-white/5 border border-white/10"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-gray-300 text-sm mb-2 font-medium">After</p>
                      <img
                        src={content}
                        alt="Background removed"
                        className="w-full h-48 object-contain rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-white/10"
                      />
                    </div>
                  </div>

                  {/* Main Result */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6">
                    <img
                      src={content}
                      alt="Background removed - full size"
                      className="w-full max-h-96 object-contain rounded-xl mx-auto"
                    />
                  </div>

                  {/* Only Process Another Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={resetAll}
                      className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40 font-semibold"
                    >
                      <Upload className="w-5 h-5" />
                      Process Another
                    </button>
                  </div>

                  {/* Success Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold text-lg">✓</div>
                      <div className="text-gray-300 text-xs">Background Removed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold text-lg">HD</div>
                      <div className="text-gray-300 text-xs">High Quality</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold text-lg">AI</div>
                      <div className="text-gray-300 text-xs">Powered</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">💡 Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="p-4 bg-violet-500/20 rounded-2xl inline-block mb-4">
                <ImageIcon className="w-8 h-8 text-violet-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">High Resolution</h4>
              <p className="text-gray-300 text-sm">Use high-quality images for best results</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-500/20 rounded-2xl inline-block mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Clear Subjects</h4>
              <p className="text-gray-300 text-sm">Works best with clear, well-defined subjects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
