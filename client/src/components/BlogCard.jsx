import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="cursor-pointer w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 sm:h-52 md:h-56 object-cover"
      />

      {/* Text Content */}
      <div className="p-4 flex flex-col gap-2">
        <span className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 w-fit rounded-full">
          {category}
        </span>
        <h5 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
          {title}
        </h5>
        <p className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}>
          
        </p>
      </div>
    </div>
  )
}

export default BlogCard
