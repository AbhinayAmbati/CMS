import React, { useState, useEffect } from 'react';
import { FaFolder, FaEye, FaNewspaper, FaCode, FaRegEdit, FaCommentAlt, FaUser, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ContentEditor from '../Components/ContentEditor';
import axios from 'axios';

const Dashboard = () => {
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState({
    name: "User",
    title: "Developer",
    profileImage: "https://imgs.search.brave.com/Wy9yeON3-cT0jG1XYVChtQhRHqReCB8MUuscX8tdfx0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MTE2NDU0OC92ZWN0/b3IvYXZhdGFyLTUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNLNDlTaExKd0R4/RTRraXJvQ1I0Mmtp/bVR1dWh2dW8yRkg1/eV82YVNnRW89", 
  });

  // Fetch user posts on component mount
  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
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
      console.error('Error fetching posts:', err);
      setError('Failed to load your posts. Please try again.');
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
      const token = localStorage.getItem('token');
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
    // Content was saved in ContentEditor component
    setShowBlogEditor(false);
    
    // Refresh posts to get updated list
    await fetchUserPosts();
  };

  // Calculate stats data
  const statsData = [
    { id: 1, title: "Total Projects", value: "1", icon: <FaFolder className="text-gray-500" /> },
    { id: 2, title: "Blog Posts", value: recentPosts.length.toString(), icon: <FaNewspaper className="text-gray-500" /> },
    { id: 3, title: "Profile Views", value: "2.4k", icon: <FaEye className="text-gray-500" /> },
  ];

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
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-gray-100">
                <img src={userData.profileImage} alt={userData.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
              <p className="text-gray-600">{userData.title}</p>
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
                        <p className="text-sm text-gray-500 mt-1">Published on {post.date}</p>
                        <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center"><FaEye className="mr-1" /> {post.views || 0} views</span>
                          <span className="flex items-center"><FaCommentAlt className="mr-1" /> {post.comments || 0} comments</span>
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
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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