import React, { useState } from 'react'
import { Hash, Sparkles, Image, Download, Share2, Zap, Palette, Camera, Wand2 } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    'Realistic', 'Ghibli Style', 'Anime Style', 'Cartoon Style', 
    'Fantasy Style', '3D Style', 'Portrait Style', 'Cyberpunk'
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
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
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            AI Image Generator
          </h1>
          <p className='text-xl text-gray-300'>Transform your imagination into stunning visuals</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Panel - Input Form */}
          <div className='flex-1'>
            <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl'>
              <div className='flex items-center mb-8'>
                <div className='p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4'>
                  <Wand2 className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white'>Create Magic</h2>
              </div>

              <div className='mb-8'>
                <label className='block text-white font-semibold mb-4 text-lg'>
                  <Palette className='inline w-5 h-5 mr-2' />
                  Describe your vision
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={4}
                  placeholder='A majestic dragon soaring through a starlit sky...'
                  className='w-full p-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 resize-none text-lg'
                  required
                />
              </div>

              <div className='mb-8'>
                <label className='block text-white font-semibold mb-4 text-lg'>
                  <Camera className='inline w-5 h-5 mr-2' />
                  Art Style
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                  {imageStyle.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedStyle === style
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-white/10 border-white/30 text-gray-300 hover:bg-white/20 hover:border-white/50'
                      }`}
                    >
                      <span className='font-medium text-sm'>{style}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-8 flex items-center'>
                <div className='relative'>
                  <input
                    type="checkbox"
                    checked={publish}
                    onChange={(e) => setPublish(e.target.checked)}
                    className='sr-only'
                    id="publish-toggle"
                  />
                  <label
                    htmlFor="publish-toggle"
                    className={`flex items-center w-16 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                      publish ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                        publish ? 'translate-x-9' : 'translate-x-1'
                      }`}
                    />
                  </label>
                </div>
                <span className='ml-4 text-white font-medium'>Make this image public</span>
              </div>

              <button
                disabled={loading}
                onClick={onSubmitHandler}
                className='w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 text-lg'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3' />
                    Creating Magic...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <Zap className='w-6 h-6 mr-3' />
                    Generate Image
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Generated Image */}
          <div className='flex-1'>
            <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl h-full min-h-[600px]'>
              <div className='flex items-center mb-8'>
                <div className='p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4'>
                  <Image className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white'>Generated Masterpiece</h2>
              </div>

              {!content ? (
                <div className='flex flex-col items-center justify-center h-96 text-center'>
                  <div className='p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6'>
                    <Hash className='w-16 h-16 text-purple-300' />
                  </div>
                  <p className='text-gray-300 text-lg mb-2'>Ready to create something amazing?</p>
                  <p className='text-gray-400'>Enter your description and watch the magic happen</p>
                </div>
              ) : (
                <div className='relative group'>
                  <img
                    src={content}
                    alt="Generated artwork"
                    className='w-full h-96 object-cover rounded-2xl shadow-2xl'
                  />
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-center justify-center'>
                    <div className='flex gap-4'>
                      <button className='p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all'>
                        <Download className='w-6 h-6 text-white' />
                      </button>
                      <button className='p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all'>
                        <Share2 className='w-6 h-6 text-white' />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
