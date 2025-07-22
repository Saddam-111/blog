import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaEdit, FaCommentDots, FaMobileAlt } from 'react-icons/fa';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12 text-gray-800">

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              About <span className="text-gray-800">Blogify</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Blogify is a modern platform where ideas meet innovation. Whether you’re passionate about tech, startups, finance, or lifestyle — we make blogging powerful, intelligent, and effortless.
            </p>
          </motion.div>

          {/* Mission Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg space-y-4"
          >
            <h2 className="text-2xl font-semibold text-blue-500">🚀 Our Mission</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              At Blogify, our mission is to empower creators and readers by offering a clean, responsive, and smart platform. We want to create a space where blogging is accessible, AI-assisted, and impactful.
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FeatureCard
              icon={<FaRocket className="text-3xl text-blue-600" />}
              title="AI Blog Generation"
              desc="Generate blog content with a single click using intelligent prompts."
            />
            <FeatureCard
              icon={<FaEdit className="text-3xl text-green-600" />}
              title="Clean Publishing Tools"
              desc="An intuitive editor that helps you focus on what matters — your content."
            />
            <FeatureCard
              icon={<FaCommentDots className="text-3xl text-yellow-600" />}
              title="Real-Time Commenting"
              desc="Manage feedback and build communities with smart comment tools."
            />
            <FeatureCard
              icon={<FaMobileAlt className="text-3xl text-purple-600" />}
              title="Mobile Friendly"
              desc="Enjoy a fully responsive experience across all screen sizes."
            />
          </motion.div>
        </div>
      </div>

      {/* ✅ Footer added using fragment */}
      <Footer />
    </>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 space-y-3">
      <div>{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};

export default About;
