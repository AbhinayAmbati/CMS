import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaNewspaper, FaChartBar, FaCog, FaUserPlus, FaComments } from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import AdminLayout from '../../Components/AdminLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    newUsers: 0,
  });

  // Sample data for charts
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const postDistributionData = {
    labels: ['Technology', 'Lifestyle', 'Business', 'Health', 'Education'],
    datasets: [
      {
        label: 'Posts by Category',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Comments',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Likes',
        data: [8, 15, 5, 7, 4, 6, 9],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default stats for demo
        setStats({
          totalUsers: 150,
          totalPosts: 45,
          totalComments: 234,
          newUsers: 12,
        });
      }
    };

    fetchStats();
  }, []);

  const adminModules = [
    {
      id: 1,
      title: "User Management",
      description: "Manage user accounts, roles and permissions",
      icon: <FaUsers className="text-3xl text-gray-700" />,
      path: "/admin/users",
      count: stats.totalUsers,
    },
    {
      id: 2,
      title: "Content Management",
      description: "Manage blog posts, pages and media",
      icon: <FaNewspaper className="text-3xl text-gray-700" />,
      path: "/admin/content",
      count: stats.totalPosts,
    },
    {
      id: 3,
      title: "Analytics",
      description: "View site traffic and user engagement metrics",
      icon: <FaChartBar className="text-3xl text-gray-700" />,
      path: "/admin/analytics",
      count: stats.totalComments,
    },
    {
      id: 4,
      title: "Settings",
      description: "Configure site settings and preferences",
      icon: <FaCog className="text-3xl text-gray-700" />,
      path: "/admin/settings",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your CMS dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <FaUsers className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <FaNewspaper className="text-green-500 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <FaComments className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newUsers}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <FaUserPlus className="text-yellow-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            <Line data={userGrowthData} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Post Distribution</h3>
            <Doughnut data={postDistributionData} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Engagement Overview</h3>
          <Bar data={engagementData} />
        </div>

        {/* Admin Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminModules.map((module) => (
            <Link 
              key={module.id} 
              to={module.path}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  {module.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{module.description}</p>
                {module.count !== undefined && (
                  <p className="text-sm font-medium text-gray-900">{module.count}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 