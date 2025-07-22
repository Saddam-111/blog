import React from 'react'

const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-pink-500 py-16 px-6 sm:px-12 text-white text-center rounded-xl mx-4 sm:mx-16 my-10">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Stay in the Loop!
      </h1>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8">
        Subscribe to our newsletter and never miss out on the latest blog posts, updates, and special features delivered straight to your inbox.
      </p>

      {/* Form */}
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          required
          className="w-full sm:w-2/3 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
