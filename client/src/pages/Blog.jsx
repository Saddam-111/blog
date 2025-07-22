import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Moment from 'moment';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { useBlogContext } from '../../context/BlogContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useBlogContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) {
      toast.error("Name and comment cannot be empty");
      return;
    }

    try {
      const { data } = await axios.post(`/api/blog/add-comment`, { blog: id, name, content });
      if (data.success) {
        toast.success(data.message);
        setName('');
        setContent('');
        fetchComments(); // Refresh comment list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const currentUrl = window.location.href;

  return data ? (
    <div className="relative bg-gray-50 min-h-screen">
      <img src={assets.gradientBackground} alt="background" className="absolute top-0 left-0 w-full h-72 object-cover -z-10" />
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 space-y-12 bg-white shadow-lg rounded-xl mt-10">
        {/* Blog Header */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{data.title}</h1>
          <h2 className="text-xl text-blue-600 font-medium">{data.subTitle}</h2>
        </div>

        {/* Blog Image */}
        <div className="w-full h-64 sm:h-96">
          <img src={data.image} alt="blog" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Blog Description */}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.description }} />

        {/* Comments */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Comments ({comments.length})</h3>
          <div className="space-y-4">
            {comments.map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <div className="flex items-center gap-3 mb-1">
                  <img src={assets.user_icon} alt="user" className="w-6 h-6 rounded-full" />
                  <p className="font-semibold">{item.name}</p>
                  <span className="text-xs text-gray-500 ml-auto">{Moment(item.createdAt).fromNow()}</span>
                </div>
                <p className="text-sm text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Add your comment</h3>
          <form onSubmit={addComment} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className="pt-8 border-t mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Share this article</h3>
          <div className="flex gap-4 text-xl text-blue-600">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={`https://twitter.com/share?url=${currentUrl}`} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href={`https://www.instagram.com`} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default Blog;
