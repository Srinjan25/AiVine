import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import FormData from "form-data";  
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import connectCloudinary from "../configs/cloudinary.js";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const genrateBlogTitle = async(req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan != 'premium' && free_usage >= 10) {
            return res.json({success: false, message: 'Free usage limit exceeded. Please upgrade to premium plan.'})
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 100, // Fixed: was using undefined 'length' variable
        });

        const content = response.choices[0].message.content;
        
        // Save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
        
        if(plan != 'premium'){
            await clerkClient.users.updateUser(userId, {
                privateMetadata:{
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({success: true, content});

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const genrateArticle = async(req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt, length} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan != 'premium' && free_usage >= 10) {
            return res.json({success: false, message: 'Free usage limit exceeded. Please upgrade to premium plan.'})
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content;
        
        // Save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${prompt}, ${content}, 'article')`;
        
        if(plan != 'premium'){
            await clerkClient.users.updateUser(userId, {
                privateMetadata:{
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({success: true, content});

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const genrateImage = async(req, res) => {
    try {
        const {userId} = req.auth();
        const {prompt, publish} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage; // Fixed: was missing this variable

        if(plan != 'premium' && free_usage >= 10) {
            return res.json({success: false, message: 'Free usage limit exceeded. Please upgrade to premium plan.'})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
            responseType: "arraybuffer"
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`; // Fixed: was 'pnf' instead of 'png'

        const {secure_url} = await cloudinary.uploader.upload(base64Image)

        // Save to database
        await sql`INSERT INTO creations (user_id, prompt, content, type, publish) 
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;
        
        if(plan != 'premium'){
            await clerkClient.users.updateUser(userId, {
                privateMetadata:{
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({success: true, content: secure_url});

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}




export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;
    const free_usage = req.free_usage; // Uncommented this line
    
    // Add error logging to debug the issue
    console.log('File received:', image ? image.originalname : 'No file');
    console.log('User ID:', userId);
    console.log('Plan:', plan);
    console.log('Free usage:', free_usage);
    console.log('Request body:', req.body);
    console.log('Request files:', req.file);
    
    // Check if file was uploaded
    if (!image) {
      return res.json({
        success: false,
        message: 'No image file provided',
      });
    }
    
    // Check free usage limit
    if (plan != 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: 'Free usage limit exceeded. Please upgrade to premium plan.',
      });
    }
   
    // Since you're using memoryStorage, upload from buffer
    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    
    const { secure_url } = await cloudinary.uploader.upload(base64Image, {
      transformation: [
        {
          effect: 'background_removal'
          // Note: You might not need the background_removal parameter - try with just the effect first
        }
      ],
      // Add these options for better results
      quality: 'auto',
      fetch_format: 'auto'
    });

    // Fixed the SQL query syntax
    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, 'Removed background from image', ${secure_url}, 'image')`;
   
    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log('Background removal error:', error.message);
    res.json({ success: false, message: error.message });
  }
};

// Fixed removeImageObject controller
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;
    const free_usage = req.free_usage; // Uncommented this line
    
    // Validation checks
    if (!image) {
      return res.json({
        success: false,
        message: 'No image file provided',
      });
    }
    
    if (!object) {
      return res.json({
        success: false,
        message: 'Object description is required',
      });
    }

    if (plan != 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: 'Free usage limit exceeded. Please upgrade to premium plan.',
      });
    }
   
    // Upload image to Cloudinary
    // Since you're using memoryStorage, image.path won't exist
    // We need to upload from buffer instead
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(image.buffer);
    });

    const { public_id, secure_url } = uploadResult;
    
    // Generate image URL with object removal transformation
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: 'image'
    });

    // Insert into database - fixed SQL syntax
    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;
   
    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan != 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: 'Free usage limit exceeded. Please upgrade to premium plan.',
      });
    }

    if (!resume) {
      return res.json({ success: false, message: 'No file uploaded' });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: 'File size should be less than 5MB',
      });
    }

    // Use buffer directly
    const pdfData = await pdf(resume.buffer);

    const prompt = `Review the current resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) 
              VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    if (plan != 'premium') {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
