import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { assets } from "../assets/assets";
import { useBlogContext } from "../../context/BlogContext";

const Header = () => {
  const { setInput, input } = useBlogContext();
  const inputRef = useRef();
  const controls = useAnimation();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <div
      className="relative py-20 px-6 sm:px-16 xl:px-24 text-center flex flex-col items-center space-y-8 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${assets.gradientBackground})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Layered Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05081a] via-[#0b0b2e]/90 to-[#1a103d] opacity-95"></div>

      {/* Floating Accent Blobs */}
      <motion.div
        animate={controls}
        className="absolute -top-28 -left-24 w-72 h-72 bg-gradient-to-br from-pink-500/40 to-purple-400/40 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        animate={controls}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-blue-400/40 to-cyan-300/30 rounded-full blur-3xl"
      ></motion.div>

      {/* Shine Effect Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_70%)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center space-y-8">
        {/* Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-1.5 border border-white/30 bg-white/10 backdrop-blur-xl rounded-full text-sm text-blue-100 shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src={assets.star_icon}
            alt="new feature"
            className="w-5 h-5 animate-spin-slow"
          />
          <span className="font-medium tracking-wide">
            ✨ Introducing: AI-powered Blog Writer!
          </span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-purple-600 animate-gradient"
        >
          Create. Share. Inspire.  
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed font-light"
        >
          Your stories deserve a spotlight — welcome to{" "}
          <span className="font-semibold text-pink-400">Blogify</span>,  
          where creativity meets technology.
        </motion.p>

        {/* Search Section */}
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="relative flex flex-col sm:flex-row justify-center gap-3 w-full max-w-lg p-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-300"
        >
          {/* Animated Border Gradient */}
          <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 opacity-50 blur-[1px] animate-pulse"></div>

          <input
            ref={inputRef}
            type="text"
            placeholder="🔍 Search amazing blogs..."
            required
            className="relative z-10 w-full px-4 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all duration-300"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* Clear Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: input ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 mt-4"
      >
        {input && (
          <button
            onClick={onClear}
            className="px-4 py-1 text-sm border border-white/30 rounded-full text-white bg-red-500/70 hover:bg-red-500 transition-all duration-300 shadow-md hover:scale-105"
          >
            Clear Search
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
