import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaNewspaper, FaChartBar, FaCog, FaHome } from 'react-icons/fa';

const AdminSidebar = () => {
  const navItems = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      title: 'User Management',
      path: '/admin/users',
      icon: <FaUsers className="w-5 h-5" />,
    },
    {
      title: 'Content Management',
      path: '/admin/content',
      icon: <FaNewspaper className="w-5 h-5" />,
    },
    {
      title: 'Analytics',
      path: '/admin/analytics',
      icon: <FaChartBar className="w-5 h-5" />,
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: <FaCog className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">CMS Admin</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                isActive ? 'bg-gray-50 text-gray-900 border-r-4 border-black' : ''
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 