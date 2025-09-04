import React, { useState } from 'react'
import { Edit, Sparkles, Copy, Download, RefreshCw, Zap, BookOpen, Clock } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short', description: '500-800 words', time: '2-3 min read', icon: Zap },
    { length: 1200, text: 'Medium', description: '800-1200 words', time: '4-5 min read', icon: BookOpen },
    { length: 1600, text: 'Long', description: '1200+ words', time: '6-8 min read', icon: Clock }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`
      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setContent(data.content)
        toast.success('Article generated successfully!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast.success('Article copied to clipboard!')
  }

  const downloadArticle = () => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `${input.replace(/\s+/g, '_')}_article.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Article downloaded!')
  }

  const regenerateArticle = () => {
    if (input.trim()) {
      onSubmitHandler({ preventDefault: () => {} })
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-indigo-100 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Article Writer
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into compelling articles with our AI-powered writing assistant. 
            Choose your topic, select length, and watch your content come to life.
          </p>
        </div>

        <div className='flex items-start gap-8 flex-wrap xl:flex-nowrap'>
          {/* Left Column - Configuration */}
          <div className='w-full xl:max-w-lg'>
            <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              {/* Header */}
              <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-6'>
                <div className='flex items-center gap-3'>
                  <Sparkles className='w-6 h-6 text-white' />
                  <h2 className='text-xl font-bold text-white'>Article Configuration</h2>
                </div>
              </div>

              <div className='p-6 space-y-6'>
                {/* Topic Input */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    What would you like to write about?
                  </label>
                  <div className="relative">
                    <input 
                      onChange={(e) => setInput(e.target.value)} 
                      value={input} 
                      type='text' 
                      placeholder='e.g., The Future of Artificial Intelligence, Climate Change Solutions...' 
                      className='w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-gray-700 placeholder-gray-400' 
                      required 
                    />
                    <Edit className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Length Selection */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>
                    Choose Article Length
                  </label>
                  <div className='grid gap-3'>
                    {articleLength.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div 
                          key={index}
                          onClick={() => setSelectedLength(item)} 
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedLength.text === item.text 
                              ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedLength.text === item.text
                                ? 'bg-indigo-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className={`font-semibold ${
                                  selectedLength.text === item.text ? 'text-indigo-700' : 'text-gray-700'
                                }`}>
                                  {item.text}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  selectedLength.text === item.text
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                  {item.time}
                                </span>
                              </div>
                              <p className={`text-sm ${
                                selectedLength.text === item.text ? 'text-indigo-600' : 'text-gray-500'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Generate Button */}
                <button 
                  disabled={loading || !input.trim()} 
                  className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  {loading ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Generating Amazing Content...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className='w-5 h-5'/>
                      <span>Generate Article</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Generated Content */}
          <div className='flex-1 min-w-0'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full'>
              {/* Header */}
              <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Edit className='w-6 h-6 text-white'/>
                    <h2 className='text-xl font-bold text-white'>Generated Article</h2>
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
                        onClick={downloadArticle}
                        className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'
                        title="Download article"
                      >
                        <Download className='w-4 h-4 text-white' />
                      </button>
                      <button 
                        onClick={regenerateArticle}
                        disabled={loading}
                        className='p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50'
                        title="Regenerate article"
                      >
                        <RefreshCw className={`w-4 h-4 text-white ${loading ? 'animate-spin' : ''}`} />
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
                      <Edit className='w-10 h-10 text-purple-500'/>
                    </div>
                    <h3 className='text-xl font-semibold text-gray-700 mb-2'>Ready to Create Amazing Content?</h3>
                    <p className='text-gray-500 max-w-md'>
                      Enter your topic and select the desired length to generate a comprehensive, well-structured article powered by AI.
                    </p>
                    <div className='mt-6 flex flex-wrap gap-2 justify-center'>
                      {['Technology', 'Health', 'Business', 'Science'].map((topic, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInput(topic)}
                          className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors'
                        >
                          Try "{topic}"
                        </button>
                      ))}
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
                          li: ({children}) => <li className="text-gray-600">{children}</li>
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

export default WriteArticle
