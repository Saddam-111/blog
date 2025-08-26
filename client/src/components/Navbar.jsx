import React from "react";
import { assets } from "../assets/assets.js";
import { useBlogContext } from "../../context/BlogContext.jsx";
import { motion } from "framer-motion";

const Navbar = () => {
  const { navigate, token } = useBlogContext();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center py-3 px-6 sm:px-10 md:px-20 xl:px-32 
                 bg-white/30 backdrop-blur-md shadow-md sticky top-0 z-50"
    >
      {/* Logo with hover effect */}
      <motion.img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-12 sm:w-16 md:w-20 cursor-pointer drop-shadow-lg"
      />

      {/* Right Side Button */}
      {token ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 
                     text-white px-5 py-2 rounded-xl shadow-md 
                     hover:shadow-lg hover:from-green-600 hover:to-green-800 
                     transition-all duration-200"
        >
          Dashboard
          <motion.img
            src={assets.arrow}
            alt="arrow"
            className="w-4 h-4"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 
                     text-white px-5 py-2 rounded-xl shadow-md 
                     hover:shadow-lg hover:from-blue-600 hover:to-blue-800 
                     transition-all duration-200"
        >
          Login
          <motion.img
            src={assets.arrow}
            alt="arrow"
            className="w-4 h-4"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Navbar;
