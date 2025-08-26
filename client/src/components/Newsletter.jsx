import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-600 to-pink-500 py-16 px-6 sm:px-12 text-white text-center rounded-xl mx-4 sm:mx-16 my-10 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating Shapes */}
      <motion.div 
        className="absolute w-40 h-40 bg-white/10 rounded-full top-0 left-10 animate-pulse-slow"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div 
        className="absolute w-32 h-32 bg-white/10 rounded-full bottom-0 right-12 animate-pulse-slow"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* Heading */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Stay in the Loop!
      </motion.h1>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8">
        Subscribe to our newsletter and never miss out on the latest blog posts, updates, and special features delivered straight to your inbox.
      </p>

      {/* Form */}
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <motion.input
          type="email"
          placeholder="Enter your email address"
          required
          className="w-full sm:w-2/3 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white shadow-inner"
          whileFocus={{ scale: 1.02, boxShadow: '0px 4px 12px rgba(255,255,255,0.3)' }}
          transition={{ duration: 0.3 }}
        />
        <motion.button
          type="submit"
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
          whileHover={{ scale: 1.05, backgroundColor: '#ffffffcc' }}
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Newsletter;
