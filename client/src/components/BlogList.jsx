import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { useBlogContext } from '../../context/BlogContext';
import { FaSadTear } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useBlogContext();

  const filteredBlogs = () => {
    if (!input.trim()) return blogs;
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  const finalBlogs = filteredBlogs().filter(
    blog => menu === "All" || blog.category.toLowerCase() === menu.toLowerCase()
  );

  return (
    <div className="px-4 sm:px-8 md:px-16 xl:px-24 py-10">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-10">
        {blogCategories.map(item => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`text-sm sm:text-base px-4 py-2 rounded-full font-medium transition-all duration-200 
              ${menu === item 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`
            }
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {finalBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {finalBlogs.map(blog => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSadTear className="text-5xl text-blue-400 mb-4 animate-bounce-slow" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
            No Blogs Found
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center px-4 max-w-md">
            We couldn't find any blog that matches your search or selected category. Try exploring different filters or keywords.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;
