import React, { useState, useEffect } from 'react';
import { FaFolder, FaEye, FaNewspaper, FaCode, FaRegEdit, FaCommentAlt, FaUser, FaTimes, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContentEditor from '../Components/ContentEditor';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState({
    username: "User",
    email: "",
    profileImage: "https://imgs.search.brave.com/Wy9yeON3-cT0jG1XYVChtQhRHqReCB8MUuscX8tdfx0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MTE2NDU0OC92ZWN0/b3IvYXZhdGFyLTUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNLNDlTaExKd0R4/RTRraXJvQ1I0Mmtp/bVR1dWh2dW8yRkg1/eV82YVNnRW89", 
  });

  // Fetch user posts and profile info on component mount
  useEffect(() => {
    fetchUserPosts();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }
      
      const response = await axios.get(
        `${API_URL}/api/user/getuserdetails`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (response.data) {
        setUserData(response.data);
      }
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Don't set error - we don't want to disrupt the entire dashboard if just profile fetch fails
    }
  };

  const fetchUserPosts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setIsLoading(false);
        return;
      }
      
      const response = await axios.get(
        `${API_URL}/api/content/user`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      setRecentPosts(response.data || []);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load your content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setShowBlogEditor(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowBlogEditor(true);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }
      
      await axios.delete(
        `${API_URL}/api/content/delete/${postId}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      // Update local state
      setRecentPosts(recentPosts.filter(post => post.id !== postId));
      
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post. Please try again.');
    }
  };

  const handleSavePost = async (postData) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('title', postData.title);
      
      if (postData.excerpt) {
        formData.append('excerpt', postData.excerpt);
      }
      
      if (postData.content) {
        formData.append('data', postData.content);
      }
      
      if (postData.image && postData.image instanceof File) {
        formData.append('image', postData.image);
      }

      if (selectedPost) {
        // Update existing post
        await axios.put(
          `${API_URL}/api/content/update/${selectedPost.id}`,
          formData,
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        // Create new post
        await axios.post(
          `${API_URL}/api/content/addcontent`,
          formData,
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      
      setShowBlogEditor(false);
      // Refresh posts to get updated list
      await fetchUserPosts();
      
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post. Please try again.');
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }
  
      // Create a FormData object for the image file
      const formData = new FormData();
      
      // Add user data as JSON string
      const userData = {
        username: profileData.username,
        email: profileData.email,
      };
      
      // Append the user data as a JSON string with Content-Type application/json
      formData.append('user', new Blob([JSON.stringify(userData)], {
        type: 'application/json'
      }));
      
      // Add the image if it exists
      if (profileData.image && profileData.image instanceof File) {
        formData.append('image', profileData.image);
      }
  
      await axios.post(
        `${API_URL}/api/user/updateuser`,
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setShowProfileEditor(false);
      // Refresh user profile
      await fetchUserProfile();
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  // Profile Editor Component
  const ProfileEditor = ({ userData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      username: userData?.username || '',
      email: userData?.email || '',
      image: null
    });
    const [imagePreview, setImagePreview] = useState(userData?.profileImage || null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  };

  // Calculate stats data
  const statsData = [
    { id: 2, title: "Blog Posts", value: recentPosts.length.toString(), icon: <FaNewspaper className="text-gray-500" /> },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showBlogEditor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </h3>
              <button 
                onClick={() => setShowBlogEditor(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <ContentEditor 
              initialData={selectedPost}
              onSave={handleSavePost}
            />
          </div>
        </div>
      )}

      {showProfileEditor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button 
                onClick={() => setShowProfileEditor(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <ProfileEditor 
              userData={userData}
              onSave={handleUpdateProfile}
              onCancel={() => setShowProfileEditor(false)}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-gray-100 relative group">
                <img src={userData.profileImage} alt={userData.username} className="w-full h-full object-cover" />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setShowProfileEditor(true)}
                >
                  <FaPencilAlt className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{userData.username}</h2>
              <p className="text-gray-600">{userData.email}</p>
              <button 
                onClick={() => setShowProfileEditor(true)}
                className="mt-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <FaRegEdit className="mr-1" /> Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsData.map((stat) => (
                <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
                </div>
              ))}
            </div>

            {/* Blog Posts Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Posts</h3>
                <button 
                  onClick={handleCreatePost}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
                >
                  Create Post
                </button>
              </div>
              
              {isLoading ? (
                <div className="py-8 text-center text-gray-500">Loading your posts...</div>
              ) : recentPosts.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  You haven't created any posts yet. Click "Create Post" to get started.
                </div>
              ) : (
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <Link to={`/blog/${post.id}`} className="text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors">
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Published on {formatDate(post.date)}</p>
                        <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center"><FaEye className="mr-1" /> {post.views || 0} views</span>
                          <span className="flex items-center"><FaCommentAlt className="mr-1" /> {post.comments?.length || 0} comments</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <FaRegEdit />
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;