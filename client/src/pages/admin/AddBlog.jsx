import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { blogCategories } from '../../assets/assets';
import { FiUpload } from 'react-icons/fi';
import { useBlogContext } from '../../../context/BlogContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {
  const { axios, token } = useBlogContext();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🧠 Generate content with AI
  const generateContent = async () => {
    if (!title.trim()) return toast.error('Please enter a title');
    if (!token) return toast.error("You must be logged in to use AI");

    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });

      if (data.success) {
        if (quillRef.current) {
          quillRef.current.root.innerHTML = parse(data.content);
        }
      } else {
        toast.error(data.message || "Failed to generate content");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📝 Submit blog
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const description = quillRef.current?.root.innerHTML || '';
    if (!description.trim()) return toast.error('Blog content is required');

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message);
        // Reset
        setTitle('');
        setSubTitle('');
        setImage(null);
        setCategory('Startup');
        setIsPublished(false);
        if (quillRef.current) quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // 🧪 Setup Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add New Blog</h1>

      {/* Thumbnail */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Upload Thumbnail</label>
        <label
          htmlFor="image"
          className="cursor-pointer border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center w-full max-w-md h-48 hover:border-blue-500 transition"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <FiUpload size={40} className="mb-2" />
              <p>Click to upload thumbnail</p>
              <p className="text-xs text-gray-400">(JPG, PNG, etc.)</p>
            </div>
          )}
          <input
            onChange={(event) => setImage(event.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Blog Title</label>
        <input
          type="text"
          placeholder="Type here"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Blog Subtitle</label>
        <input
          type="text"
          placeholder="Type here"
          value={subTitle}
          onChange={(event) => setSubTitle(event.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Blog Description</label>
        <div className="border h-[200px] rounded mb-2 overflow-hidden">
          <div ref={editorRef} className="h-48" />
        </div>
        <button
          disabled={loading}
          type="button"
          onClick={generateContent}
          className={`mt-2 text-sm font-medium ${
            loading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'
          }`}
        >
          {loading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Blog Category</label>
        <select
          onChange={(event) => setCategory(event.target.value)}
          value={category}
          className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Publish checkbox */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(event) => setIsPublished(event.target.checked)}
          className="accent-blue-600"
        />
        <label className="text-gray-700 font-medium">Publish Now</label>
      </div>

      {/* Submit */}
      <button
        disabled={isAdding}
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
      >
        {isAdding ? 'Adding...' : 'Add Blog'}
      </button>
    </form>
  );
};

export default AddBlog;
