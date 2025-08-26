import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-600 to-gray-400 text-white px-6 sm:px-16 xl:px-24 py-12 rounded-t-3xl shadow-lg relative overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Blogify</h2>
          <p className="text-sm">
            Your personal publishing space to share stories, ideas, and insights with the world.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Blogs", "About", "Contact"].map((link) => (
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
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            {[{icon: FaFacebookF, link:'#'}, {icon: FaTwitter, link:'#'}, {icon: FaInstagram, link:'#'}, {icon: FaLinkedinIn, link:'#'}].map(({icon: Icon, link}, idx) => (
              <motion.a
                key={idx}
                href={link}
                aria-label="social link"
                className="bg-white/20 p-2 rounded-full hover:bg-white/40 hover:scale-110 transition-all"
                whileHover={{ scale: 1.15 }}
              >
                <Icon className="text-white" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="border-white/30 mt-6" />
      <div className="w-full flex mt-3">
        <p className="mx-auto text-sm">© {new Date().getFullYear()} Blogify. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
