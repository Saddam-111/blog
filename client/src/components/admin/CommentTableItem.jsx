import React, { useState } from 'react';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { useBlogContext } from '../../../context/BlogContext';
import toast from 'react-hot-toast';
import Moment from 'moment';

const CommentTableItem = ({ comment, fetchComments, onApprove, onDelete }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const { axios } = useBlogContext();

  const [loadingAction, setLoadingAction] = useState(null); // "approve" or "delete"

  const approveComment = async () => {
  try {
    setLoadingAction('approve');
    const { data } = await axios.post('/api/admin/approve-comment', { id: _id });

    if (data.success) {
      toast.success(data.message);
      onApprove(_id);
      // fetchComments(); // ✅ This must re-fetch fresh updated comments
      if(onDelete){
        onDelete(_id)
      }
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setLoadingAction(null);
  }
};


  const deleteComment = async () => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this comment?');
      if (!isConfirmed) return;

      setLoadingAction('delete');
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
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
    <tr className="border-b border-gray-200">
      <td className="p-3">
        <p>
          <span className="font-semibold text-gray-800">Blog:</span> {blog?.title}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Name:</span> {name}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Comment:</span> {content}
        </p>
      </td>

      <td className="p-3 whitespace-nowrap text-gray-600">
        {Moment(createdAt).format('DD MMM YYYY, h:mm A')}
      </td>

      <td className="p-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {!isApproved ? (
            <button
              title="Approve"
              onClick={approveComment}
              disabled={loadingAction === 'approve'}
              className={`text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FaCheckCircle size={18} />
            </button>
          ) : (
            <span className="text-sm text-green-600">Approved</span>
          )}

          <button
            title="Delete"
            onClick={deleteComment}
            disabled={loadingAction === 'delete'}
            className={`text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FaTrashAlt size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
