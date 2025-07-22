import React, { useEffect, useState } from 'react';
import { MdArticle, MdComment, MdDrafts, MdAccessTime } from 'react-icons/md';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useBlogContext } from '../../../context/BlogContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const { axios } = useBlogContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-4 md:p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <MdArticle className="text-blue-500" size={32} />
          <div>
            <p className="text-2xl font-bold">{dashboardData.blogs}</p>
            <p className="text-gray-600">Blogs</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <MdComment className="text-green-500" size={32} />
          <div>
            <p className="text-2xl font-bold">{dashboardData.comments}</p>
            <p className="text-gray-600">Comments</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <MdDrafts className="text-orange-500" size={32} />
          <div>
            <p className="text-2xl font-bold">{dashboardData.drafts}</p>
            <p className="text-gray-600">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MdAccessTime className="text-gray-700" size={24} />
          <h2 className="text-xl font-semibold">Latest Blogs</h2>
        </div>

        {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr className="text-gray-600">
                  <th className="p-3">Sr</th>
                  <th className="p-3">Blog Title</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id || index}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
