import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaNewspaper, FaChartBar, FaCog } from 'react-icons/fa';

const AdminDashboard = () => {
  const adminModules = [
    {
      id: 1,
      title: "User Management",
      description: "Manage user accounts, roles and permissions",
      icon: <FaUsers className="text-3xl text-gray-700" />,
      path: "/admin/users"
    },
    {
      id: 2,
      title: "Content Management",
      description: "Manage blog posts, pages and media",
      icon: <FaNewspaper className="text-3xl text-gray-700" />,
      path: "/admin/content"
    },
    {
      id: 3,
      title: "Analytics",
      description: "View site traffic and user engagement metrics",
      icon: <FaChartBar className="text-3xl text-gray-700" />,
      path: "/admin/analytics"
    },
    {
      id: 4,
      title: "Settings",
      description: "Configure site settings and preferences",
      icon: <FaCog className="text-3xl text-gray-700" />,
      path: "/admin/settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your site's content and users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminModules.map((module) => (
            <Link 
              key={module.id} 
              to={module.path}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                {module.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
              <p className="text-gray-600 text-sm">{module.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Users</h3>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Published Posts</h3>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Page Views</h3>
              <p className="text-2xl font-bold text-gray-800">2.4k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 