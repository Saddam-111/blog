import React, { useEffect, useState } from 'react';
import { useBlogContext } from '../../../context/BlogContext';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const { axios } = useBlogContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('/api/admin/message');
      if (data.success) {
        setMessages(data.contactMessage);
      } else {
        toast.error(data.message || "Failed to fetch messages");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 text-center md:text-left">
        Contact Messages
      </h1>

      {loading ? (
        <p className="text-center text-blue-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold">#</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Message</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-900">{msg.name}</td>
                  <td className="p-4 text-blue-600">{msg.email}</td>
                  <td className="p-4">{msg.message}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
