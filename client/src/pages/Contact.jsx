import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useBlogContext } from '../../context/BlogContext';
import Footer from '../components/Footer';

const Contact = () => {
  const {axios} = useBlogContext()
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = form;
    if (!name || !email || !message) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/add-message', form);
      if (data.success) {
        toast.success(data.message || 'Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-gray-50 p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Contact Us</h1>
        <p className="text-center text-gray-600">We’d love to hear from you. Fill out the form below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default Contact;
