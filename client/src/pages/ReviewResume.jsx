import React, { useState } from 'react'
import { FileText, Sparkles, Upload, Download, Copy, CheckCircle, AlertCircle, TrendingUp, Users, Target, Star } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('resume', input)
     
      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
     
      if (data.success) {
        setContent(data.content)
        toast.success('Resume analyzed successfully!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setInput(files[0])
    } else {
      toast.error('Please upload a PDF file only')
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast.success('Review copied to clipboard!')
  }

  const downloadReview = () => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `resume_review_${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Review downloaded!')
  }

  const features = [
    { icon: Target, title: 'ATS Optimization', desc: 'Keyword analysis for better visibility' },
    { icon: TrendingUp, title: 'Impact Assessment', desc: 'Measure your achievements effectively' },
    { icon: Users, title: 'Industry Standards', desc: 'Compare against best practices' },
    { icon: Star, title: 'Scoring System', desc: 'Get detailed performance metrics' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-orange-100 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              AI Resume Reviewer
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get comprehensive feedback on your resume with our AI-powered analysis. 
            Improve your chances of landing your dream job with professional insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className='flex items-start gap-8 flex-wrap xl:flex-nowrap'>
          {/* Left Column - Upload */}
          <div className='w-full xl:max-w-lg'>
            <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              {/* Header */}
              <div className='bg-gradient-to-r from-orange-500 to-red-600 p-6'>
                <div className='flex items-center gap-3'>
                  <Sparkles className='w-6 h-6 text-white' />
                  <h2 className='text-xl font-bold text-white'>Upload Resume</h2>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* File Upload Area */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Select your resume for analysis
                  </label>
                  
                  {/* Drag & Drop Area */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragOver 
                        ? 'border-orange-500 bg-orange-50' 
                        : input 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setInput(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    
                    <div className="flex flex-col items-center gap-4">
                      {input ? (
                        <>
                          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-green-700">File Selected</p>
                            <p className="text-sm text-green-600 mt-1">{input.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {(input.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            dragOver ? 'bg-orange-200' : 'bg-gray-200'
                          }`}>
                            <Upload className={`w-8 h-8 ${dragOver ? 'text-orange-600' : 'text-gray-500'}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              {dragOver ? 'Drop your resume here' : 'Upload your resume'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Drag & drop or click to select
                            </p>
                            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 justify-center">
                              <AlertCircle className="w-3 h-3" />
                              PDF files only (Max 10MB)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Pro Tips for Better Analysis
                  </h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Ensure your resume is in PDF format</li>
                    <li>• Include clear section headers (Experience, Education, Skills)</li>
                    <li>• Use standard fonts and formatting</li>
                    <li>• Keep file size under 10MB for optimal processing</li>
                  </ul>
                </div>

                {/* Analyze Button */}
                <button 
                  type="submit"
                  disabled={loading || !input} 
                  className='w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-orange-700 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  {loading ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Analyzing Resume...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className='w-5 h-5'/>
                      <span>Analyze Resume</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className='flex-1 min-w-0'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full'>
              {/* Header */}
              <div className='bg-gradient-to-r from-purple-500 to-indigo-600 p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <FileText className='w-6 h-6 text-white'/>
                    <h2 className='text-xl font-bold text-white'>Resume Analysis</h2>
                  </div>
                  {content && (
                    <div className='flex gap-2'>
                      <button 
                        onClick={copyToClipboard}
                        className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
                        title="Copy to clipboard"
                      >
                        <Copy className='w-4 h-4 text-white' />
                      </button>
                      <button 
                        onClick={downloadReview}
                        className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
                        title="Download review"
                      >
                        <Download className='w-4 h-4 text-white' />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className='p-6 min-h-[600px] max-h-[800px]'>
                {!content ? (
                  <div className='flex-1 flex flex-col justify-center items-center h-full text-center py-20'>
                    <div className='w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6'>
                      <FileText className='w-10 h-10 text-purple-500'/>
                    </div>
                    <h3 className='text-xl font-semibold text-gray-700 mb-2'>Ready to Analyze Your Resume?</h3>
                    <p className='text-gray-500 max-w-md mb-6'>
                      Upload your resume to get detailed feedback on format, content, keywords, and improvement suggestions from our AI reviewer.
                    </p>
                    
                    {/* Progress Indicators */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full max-w-lg'>
                      <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                        <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                          <Upload className='w-4 h-4 text-blue-600' />
                        </div>
                        <div className='text-left'>
                          <p className='text-sm font-semibold text-gray-700'>1. Upload</p>
                          <p className='text-xs text-gray-500'>Select your PDF resume</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                        <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                          <Sparkles className='w-4 h-4 text-green-600' />
                        </div>
                        <div className='text-left'>
                          <p className='text-sm font-semibold text-gray-700'>2. Analyze</p>
                          <p className='text-xs text-gray-500'>AI reviews your content</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='prose prose-indigo max-w-none overflow-y-auto max-h-full'>
                    <div className='reset-tw'>
                      <Markdown 
                        className="text-gray-700 leading-relaxed"
                        components={{
                          h1: ({children}) => <h1 className="text-3xl font-bold text-gray-800 mb-4">{children}</h1>,
                          h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>,
                          h3: ({children}) => <h3 className="text-xl font-semibold text-gray-700 mb-2 mt-4">{children}</h3>,
                          p: ({children}) => <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>,
                          ul: ({children}) => <ul className="mb-4 pl-6 space-y-2">{children}</ul>,
                          ol: ({children}) => <ol className="mb-4 pl-6 space-y-2">{children}</ol>,
                          li: ({children}) => <li className="text-gray-600">{children}</li>,
                          strong: ({children}) => <strong className="font-semibold text-gray-800">{children}</strong>,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-indigo-200 pl-4 my-4 italic text-gray-700 bg-indigo-50 py-2 rounded-r-lg">{children}</blockquote>
                        }}
                      >
                        {content}
                      </Markdown>
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

export default ReviewResume
