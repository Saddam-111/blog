import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comments.js';
import Contact from '../models/message.js';
export const adminLogin = async (req , res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.json({
        success: false,
        message: "All data are essential"
      })
    }

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
      return res.json({
        success: false,
        message: "Invalid credentials"
      })
    }

    //generate token

    const token = jwt.sign({email}, process.env.JWT_SECRET);
    return res.json({
      success: true,
      token,
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}



export const getAllBlogsAdmin = async (req , res) => {
  try {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    res.json({
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


export const getAllComments = async (req , res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({createdAt: -1});
    res.json({
      success: true, 
      comments,
    })
  } catch (error) {
    res.json({
      success: false, 
      message: error.message
    })
  }
}



export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments()
    const drafts = await Blog.countDocuments({isPublished: false})


    const dashboardData = {
      blogs, comments, recentBlogs, drafts
    }
    res.json({
      success: true, 
      dashboardData,
    })
  } catch (error) {
    res.json({
      success: false, 
      message: error.message
    })
  }
}






export const deleteCommentById = async (req, res) => {
  try {
    const {id} = req.body;
    if (!id) return res.json({ success: false, message: "ID is required" });
    await Comment.findByIdAndDelete(id)
    res.json({
      success: true, 
      message: "Comment deleted successfully"
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}



// Backend: controllers/adminController.js (Ensure consistent response)
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({
        success: false,
        message: "Comment ID is required",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, { isApproved: true }, { new: true });

    if (!updatedComment) {
      return res.json({
        success: false,
        message: "Comment not found",
      });
    }

    res.json({
      success: true,
      message: "Comment approved successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};








export const getAllMessage = async (req, res) => {
  try {
    const contactMessage = await Contact.find().sort({createdAt: -1});
    res.json({
      success: true,
      contactMessage
    })
  } catch (error) {
    res.json({
      success: false, 
      message: error.message
    })
  }
}