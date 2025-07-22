import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaListUl, FaComments, FaInbox } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  const baseClass =
    "flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 transition";
  const activeClass = "bg-blue-200 font-semibold";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg p-4 space-y-2 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block`}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Always shown on desktop */}
        <h2 className="text-xl font-bold hidden lg:block mb-6">Admin Panel</h2>

        {/* ✅ Dashboard (Fixed with `end`) */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/addBlog"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaPlus />
          <span>Add Blog</span>
        </NavLink>

        <NavLink
          to="/admin/listBlog"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaListUl />
          <span>Blog List</span>
        </NavLink>

        <NavLink
          to="/admin/comments"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaComments />
          <span>Comments</span>
        </NavLink>

        <NavLink
          to="/admin/contact"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <FaInbox />
          <span>Messages</span>
        </NavLink>
      </aside>
    </>
  );
};

export default Sidebar;
