import React from 'react';
import { FaFolder, FaEye, FaNewspaper, FaCode, FaMobile, FaRegEdit, FaCommentAlt, FaUser } from 'react-icons/fa';
import { MdBookmark } from 'react-icons/md';

const Dashboard = () => {
  // User data
  const userData = {
    name: "Vishnu",
    title: "Full Stack Developer",
    profileImage: "https://imgs.search.brave.com/Wy9yeON3-cT0jG1XYVChtQhRHqReCB8MUuscX8tdfx0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MTE2NDU0OC92ZWN0/b3IvYXZhdGFyLTUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNLNDlTaExKd0R4/RTRraXJvQ1I0Mmtp/bVR1dWh2dW8yRkg1/eV82YVNnRW89", // Using a placeholder avatar service
  };

  // Stats data
  const statsData = [
    { id: 1, title: "Total Projects", value: "24", change: "+3 this month", icon: <FaFolder className="text-gray-500" /> },
    { id: 2, title: "Blog Posts", value: "156", change: "+12 this month", icon: <FaNewspaper className="text-gray-500" /> },
    { id: 3, title: "Profile Views", value: "2.4k", change: "+18% this month", icon: <FaEye className="text-gray-500" /> },
  ];

  // Navigation links
  const navLinks = [
    { id: 1, title: "Profile", icon: <FaUser size={20} /> },
    { id: 2, title: "Messages", icon: <FaCommentAlt size={20} /> },
    { id: 3, title: "Saved", icon: <MdBookmark size={20} /> },
  ];

  // Recent projects data
  const recentProjects = [
    { id: 1, title: "E-commerce Platform", updatedDays: 2, icon: <FaCode className="text-gray-500" /> },
    { id: 2, title: "Mobile App UI", updatedDays: 5, icon: <FaMobile className="text-gray-500" /> },
  ];

  // Recent posts data
  const recentPosts = [
    { id: 1, title: "Getting Started with React Hooks", date: "Jan 15, 2025", views: "1.2k", comments: 8 },
    { id: 2, title: "Best Practices for API Design", date: "Jan 10, 2025", views: "956", comments: 12 },
  ];

  return (
    <div className="container min-h-[calc(100vh-100px)] mx-auto px-4 pt-8 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* User Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
              <img src={userData.profileImage} alt={userData.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-gray-500">{userData.title}</p>
          </div>
          
          <div className="mt-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.id} className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 p-2 rounded cursor-pointer">
                {link.icon}
                <span>{link.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsData.map((stat) => (
              <div key={stat.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-600">{stat.title}</h3>
                  {stat.icon}
                </div>
                <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Projects</h3>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">Add New</button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {project.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-500">Updated {project.updatedDays} days ago</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaRegEdit />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Posts</h3>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">Create Post</button>
            </div>
            
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-500">Published on {post.date}</p>
                    <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center"><FaEye className="mr-1" /> {post.views} views</span>
                      <span className="flex items-center"><FaRegEdit className="mr-1" /> {post.comments} comments</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaRegEdit />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;