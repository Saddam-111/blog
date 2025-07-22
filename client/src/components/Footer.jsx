import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-700 px-6 sm:px-16 xl:px-24 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Blogify</h2>
          <p className="text-sm">
            Your personal publishing space to share stories, ideas, and insights
            with the world.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/" 
              className="hover:underline">
                Blogs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="border-2 mt-3.5" />
      <div className="w-full flex">
        <p className="mx-auto">© {new Date().getFullYear()} Blogify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
