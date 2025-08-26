import React, { useRef } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useBlogContext } from "../../context/BlogContext";

const Header = () => {
  const { setInput, input } = useBlogContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div
      className="relative py-16 px-6 sm:px-16 xl:px-24 text-center flex flex-col items-center space-y-8 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      {/* Floating circles background */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center space-y-6">
        {/* Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-3 px-6 py-1.5 border rounded-full text-sm bg-white/30 backdrop-blur-lg text-blue-900 shadow-lg"
        >
          <p className="font-medium">✨ New: AI-powered writing assistant now live!</p>
          <img
            src={assets.star_icon}
            alt="star icon"
            className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-lg"
        >
          Create, share, and grow on your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 animate-gradient">
            personal publishing space
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-gray-200 text-base sm:text-lg max-w-2xl"
        >
          Welcome to <span className="font-semibold text-blue-300">Blogify</span> – a modern platform where your stories, insights, and creativity come alive.
          Discover new voices, share your passions, and build your digital legacy.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md bg-white/20 backdrop-blur-lg p-2 rounded-xl shadow-lg"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="🔍 Search for blogs..."
            required
            className="w-full px-4 py-2 border-none bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition-transform duration-200"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* Clear Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: input ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 text-center"
      >
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-full shadow-md text-white bg-red-500/70 hover:bg-red-500 transition-all duration-200"
          >
            Clear Search
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
