import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary } from 'cloudinary'

import Post from '../mongoDb/models/post.js'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    
})
const router = express.Router()

// GET POST

router.route('/').get(async(req, res)=>{
    try {
        const post = await Post.find({})
        req.status(200).json({success: true, data: post})
    } catch (error) {
        req.status(500).json({success: false, data: error.message})
        
    }
})
// Create a  POST

router.route('/').post(async(req, res)=>{
try {
    const { name, prompt, photo}=req.body

const photoUrl = await cloudinary.uploader.upload(photo)

const newPost = await Post.create({
    prompt, 
    name, 
    photo: photoUrl.url
})

res.status(201).json({success: true, data: newPost})
} catch (error) {
req.status(500).json({success: false, error: error.message})
}
})


export default router;