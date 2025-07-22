import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useBlogContext } from '../../../context/BlogContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt).toDateString();
  const { axios } = useBlogContext();

  const [loadingAction, setLoadingAction] = useState(null); // "delete" or "toggle"

  const deleteBlog = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this blog?');
    if (!isConfirmed) return;

    try {
      setLoadingAction('delete');
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoadingAction(null);
    }
  };

  const togglePublish = async () => {
    try {
      setLoadingAction('toggle');
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 font-medium">{index}</td>
      <td className="p-3">{title}</td>
      <td className="p-3">{blogDate}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            isPublished ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {isPublished ? 'Published' : 'Unpublished'}
        </span>
      </td>
      <td className="p-3 flex gap-2">
        <button
          onClick={togglePublish}
          disabled={loadingAction === 'toggle'}
          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button
          onClick={deleteBlog}
          disabled={loadingAction === 'delete'}
          title="Delete blog"
          className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaTrash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
