import React, { useState } from 'react'
import {  Hash, Sparkles } from 'lucide-react'
import { Image } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const GenerateImages = () => {

  const imageStyle = [
   'Realistic','Ghibli Style','Anime Style', 'Cartoon Style', 'Fantasy style', 'Realistic style', '3d Style', 'Potrait style'
  ]

const [selectedStyle, setSelectedStyle] = useState('Realistic')
const [input, setInput] =useState('')
const [publish, setPublish] = useState(false)


const [loading, setLoading] = useState(false)
const [content, setContent]= useState('')
const {getToken} = useAuth()

const onSubmitHandler = async (e)=>{
  e.preventDefault();
  try {
      setLoading(true)

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}` 
      const {data} =await axios.post('/api/ai/generate-image', {prompt, publish}, {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data.success) {
          setContent(data.content)
         } else {
          toast.error(data.message)
         }

  }catch(error) {
     toast.error(error.message)

  }
  setLoading(false)
}




  return (
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 bg-indigo-200'>
           {/*For left column*/}
           <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
            <div className='flex items-center'>
              <Sparkles className='w-6 txt-[#00AD25]' />
              <h1 className='text-xl font-semibold'>AI Image Generator</h1>
            </div>
            <p className='mt-6 text-sm font-medium'>Describe your Image</p>
    
            <textarea onChange={(e)=>setInput(e.target.value)} value={input} row={4} type='text' placeholder='Describe what you want to see in the image' className='w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
            <p className='mt-4 text-sm font-medium'>Category</p>
            <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
              {imageStyle.map((item)=>(
                <span onClick={()=> setSelectedStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'}`} key={item}>{item}</span>
              ) 
              )}
            </div>

          <div className='my-6 flex items-center gap-2'>
            <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e)=>setPublish(e.target.checked)} checked={publish} className='=sr-only peer'/>

              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>


            </label>
            <p className='text-sm'>Make this image Public</p>
          </div>


    
            <button disabled={loading} className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md bg-gradient-to-r from-[#C341F6] to-[#8E37EB] flex items-center justify-center gap-2 cursor-pointer'>
              {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              :<Image className='w-5 '/>}
              
              Generate Image
            </button>
    
           </form>
           {/*for right cloumn*/}
           <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 '>
            <div className='flex items-center gap-3'>
              <Image className='w-5 h-5 text-[#00AD25]'/>
              <h1 className='text-xl font-semibold'>Generated Image</h1>
    
            </div>

            {!content ? (
              <div className='flex-1 flex justify-center items-center'>
                        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                           <Hash className='w-9 h-9'/>
                           <p>Enter a topic and click "Generate title" to get started</p>
                        </div>
              
                      </div>
            ) : (
              <div className='mt-3 h-full'>
                <img src={content} alt="image" className='w-full h-full' />
                </div>
            )}
            
    
           </div>
          </div>
  )
}

export default GenerateImages
