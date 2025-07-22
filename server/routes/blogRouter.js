import express from 'express'
import { addBlog, addComment, addMessage, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import { upload } from '../middleware/multer.js';
import { auth } from '../middleware/auth.js';

export const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image'),auth, addBlog)

blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogById)
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments)

blogRouter.post('/add-message', addMessage);

blogRouter.post('/generate', auth, generateContent)