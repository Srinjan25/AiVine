import React, { useState } from 'react'
import { Edit, Hash, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blockCategories = [
    'General', 'Technology', 'Health', 'Finance', 'Travel', 
    'Food', 'Lifestyle', 'Education', 'Entertainment', 'Business'
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;
      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            AI Blog Title Generator
          </h1>
          <p className='text-xl text-gray-300'>Create compelling titles that drive engagement</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel */}
          <div className='flex-1'>
            <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl'>
              <div className='flex items-center mb-8'>
                <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4'>
                  <Edit className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white'>Title Generator</h2>
              </div>

              <div className='mb-8'>
                <label className='block text-white font-semibold mb-4 text-lg'>
                  What's your topic?
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Enter your article topic...'
                  className='w-full p-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 text-lg'
                  required
                />
              </div>

              <div className='mb-8'>
                <label className='block text-white font-semibold mb-4 text-lg'>
                  Choose Category
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {blockCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-white/10 border-white/30 text-gray-300 hover:bg-white/20 hover:border-white/50'
                      }`}
                    >
                      <span className='font-medium text-sm'>{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={loading}
                onClick={onSubmitHandler}
                className='w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 text-lg'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3' />
                    Generating Titles...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <Hash className='w-6 h-6 mr-3' />
                    Generate Titles
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className='flex-1'>
            <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl h-full min-h-[600px]'>
              <div className='flex items-center mb-8'>
                <div className='p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mr-4'>
                  <Sparkles className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white'>Generated Titles</h2>
              </div>

              {!content ? (
                <div className='flex flex-col items-center justify-center h-96 text-center'>
                  <div className='p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6'>
                    <Hash className='w-16 h-16 text-blue-300' />
                  </div>
                  <p className='text-gray-300 text-lg mb-2'>Ready to create amazing titles?</p>
                  <p className='text-gray-400'>Enter your topic and get started</p>
                </div>
              ) : (
                <div className='bg-white/10 rounded-2xl p-6 h-96 overflow-y-auto custom-scrollbar'>
                  <div className='text-white text-sm text-slate-200'>
                    <div className='reset-tw'>
                      <Markdown>{content}</Markdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default BlogTitles;
