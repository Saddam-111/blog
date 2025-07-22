import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useBlogContext } from '../../../context/BlogContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Approved');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { axios } = useBlogContext(); // ❗ Use context axios (not direct import)

  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/api/admin/comments');

      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
      } else {
        setComments([]);
        toast.error(data.message || 'Invalid response from server');
      }
    } catch (err) {
      setComments([]);
      const msg = err.response?.data?.message || err.message || 'Error fetching comments';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchComments();
  }, []);

 const filteredComments = filter === 'Approved'
  ? comments.filter(c => c.isApproved)
  : comments.filter(c => !c.isApproved);


  return (
    <div className="p-4 md:p-8">
      {/* Header + Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
          Comments
        </h1>
        <div className="flex gap-3">
          {['Approved', 'Not Approved'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                filter === type
                  ? type === 'Approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 font-semibold">Blog Title & Comment</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-blue-500">
                  Loading comments...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredComments.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No {filter.toLowerCase()} comments found.
                </td>
              </tr>
            ) : (
              filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                  onApprove = {(id) => {
                    setComments(prev => prev.map(comment => comment._id === id ? {...comment, isApproved: true} : comment))
                  }}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
