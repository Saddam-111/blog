import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useBlogContext } from "../../context/BlogContext";

const Header = () => {

  const {setInput, input} = useBlogContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput("");
    inputRef.current.value = ''
  }

  return (
    <div
      className="relative py-12 px-6 sm:px-16 xl:px-24 text-center flex flex-col items-center space-y-5 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      {/* Optional overlay for better text contrast */}
      <div className="" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center space-y-6">
        {/* Announcement Banner */}
        <div className="inline-flex items-center justify-center gap-3 px-6 py-1.5 border rounded-full text-sm bg-violet-200 text-blue-900">
          <p className="font-medium">✨ New: AI-powered writing assistant now live!</p>
          <img
            src={assets.star_icon}
            alt="star icon"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-">
          Create, share, and grow on your <br />
          <span className="text-blue-500">
            personal publishing space
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
          Welcome to Blogify – a modern platform where your stories, insights, and creativity come alive.
          Discover new voices, share your passions, and build your digital legacy.
        </p>

        {/* Search Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Search
          </button>
        </form>

      </div>
      <div className="text-center">
        {
          input && <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-2xs">Clear Search</button>
        }
      </div>
    </div>
  );
};

export default Header;
