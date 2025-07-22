import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard'
import { useBlogContext } from '../../context/BlogContext'
import { FaSadTear } from 'react-icons/fa'

const BlogList = () => {
  const [menu, setMenu] = useState("All")
  const { blogs, input } = useBlogContext()

  const filteredBlogs = () => {
    if (input.trim() === '') {
      return blogs
    } else {
      return blogs.filter(blog =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
      )
    }
  }

  const finalBlogs = filteredBlogs().filter(
    (blog) => menu === "All" || blog.category === menu
  )

  return (
    <div className="px-4 sm:px-8 md:px-16 xl:px-24 py-10">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-10">
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`text-sm sm:text-base px-4 py-1 rounded-full font-medium shadow transition duration-200 ${
              menu === item
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 bg-gray-100 hover:bg-blue-100'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Grid or No Blog Message */}
      {finalBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {finalBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl shadow-inner">
          <FaSadTear className="text-5xl text-blue-400 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
            No Blogs Found
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center px-4 max-w-md">
            We couldn't find any blog that matches your search or selected category. Try exploring different filters or keywords.
          </p>
        </div>
      )}
    </div>
  )
}

export default BlogList
