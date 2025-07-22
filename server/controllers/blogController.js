import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js'
import Comment from '../models/Comments.js';
import main from '../configs/gemini.js';
import Contact from '../models/message.js';
export const addBlog = async (req , res) => {
  try {
    const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
    const imageFile = req.file;

    //check all data are present
    if(!title || !description || !category || !imageFile){
      return res.json({
        success: false, 
        message: "Missing required Fields"
      })
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //upload file on imageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs'
    })

    //image optimaization through imageKit url transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {quality: 'auto'},
        {format: 'webp'},
        {width: '1280'}
      ]
    })

    const image = optimizedImageUrl;

    await Blog.create({title, subTitle, description, category, image, isPublished})

    res.json({
      success: true,
      message: "Blog added successfully"
    })

  } catch (error) {
    res.json({
      success: false, 
      message: "Error in Blog creating"
    })
  }
}


//get all blogs


export const getAllBlogs = async (req , res) => {
  try {

    const blogs = await Blog.find({isPublished: true});

    return res.json({
      success: true,
      blogs
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}




export const getBlogById = async (req , res) => {
  try {
    const {blogId} = req.params;
    const blog = await Blog.findById(blogId)
    if(!blog){
      return res.json({
        success: false,
        message: "Blog not found"
      })
    }
    return res.json({
      success: true, 
      blog
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}



export const deleteBlogById = async (req , res) => {
  try {
    const {id} = req.body;
    if (!id) return res.json({ success: false, message: "ID is required" });
    await Blog.findByIdAndDelete(id);

    //delete all comment associated with the blog
    await Comment.deleteMany({blog: id})



    res.json({
      success: true,
      message: "Blog deleted successfully"
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}



export const togglePublish = async (req , res) => {
  try {
    const {id} = req.body;
    if (!id) return res.json({ success: false, message: "ID is required" });
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save()

    return res.json({
      success: true, 
      message: "Blog status updated"
    })
  } catch (error) {
    res.json({
      success: false, 
      message: error.message
    })
  }
}



export const addComment = async (req, res) => {
  try {
    const {blog, name, content} = req.body;
    await Comment.create({blog, name, content})
    res.json({
      success: true, 
      message: "Comment added"
    })
  } catch (error) {
    res.json({
      success: false, 
      message: error.message
    })
  }
}

export const addMessage = async (req, res) => {
  try {
    const {name, email, message} = req.body;

    if(!name || !email || !message){
      return res.json({
        success: false,
        message: "All fiends are required"
      })
    }

    await Contact.create({name, email, message});

    res.json({
      success: true, 
      message: "Message submitted successfully"
    })

  } catch (error) {
    res.json({
      success : false, 
      message: error.message
    })
  }
}


export const getBlogComments = async (req , res) => {
  try {
    const {blogId} = req.body;
    const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
    res.json({
      success: true, 
      comments
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}




export const generateContent = async (req , res) => {
  try {
    const {prompt} = req.body;
    const content =  await main(prompt + '  Write a complete, well-structured, engaging and SEO-friendly blog post on this topic. Format it with proper headings, short paragraphs and clear sections like introduction, main body and conclusion. Use a professional tone, make it beginner-friendly and avoid complex jargon.')
    res.json({
      success: true, 
      content
    })
  } catch (error) {
    res.json({
      success: false, 
      message: error.message
    })
  }
}