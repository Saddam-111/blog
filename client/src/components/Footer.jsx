import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-600 to-gray-400 text-white px-6 sm:px-16 xl:px-24 pt-6 rounded-t-3xl shadow-lg relative overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Blogify</h2>
          <p className="text-sm">
            Your personal publishing space to share stories, ideas and insights with the world.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Contact"].map((link) => (
              <li key={link}>
                <a href={`/${link.toLowerCase()}`} className="hover:underline hover:text-gray-200 transition-all">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
          <div className="flex gap-4 text-2xl mb-6">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-pink-300 transition-colors"><FaGithub /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><FaLinkedin /></a>
            <a href="mailto:youremail@example.com" className="hover:text-yellow-300 transition-colors"><FaEnvelope /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><FaTwitter /></a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:text-pink-300 transition-colors"><FaInstagram /></a>
          </div>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="p-3 rounded-lg text-gray-200 ring-1 ring-purple-950 focus:ring-2 focus:ring-pink-400 transition-all"
            />
            <button className="bg-pink-600 hover:bg-pink-700 py-3 rounded-lg font-semibold transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 p-2 mt-4 text-center text-gray-200">
        © {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
