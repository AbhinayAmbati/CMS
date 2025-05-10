import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  // Define navigation links based on authentication status
  const getNavLinks = () => {
    const links = [
      { id: 1, title: "Home", path: "/" },
      { id: 2, title: "Content", path: "/content" },
    ];

    if (currentUser) {
      links.push({ id: 3, title: "Dashboard", path: "/dashboard" });
      
      if (isAdmin()) {
        links.push({ id: 4, title: "Admin", path: "/admin" });
      }
    }
    
    return links;
  };

  const navLinks = getNavLinks();

  return (
    <>
     
      <div className='absolute top-0 left-0 right-0 flex justify-between items-center bg-white py-4 w-full px-8 shadow-sm z-10'>
        <Link to="/" className='text-3xl font-bold tracking-tight hover:text-gray-700 transition-colors'>
          <h1>CMS</h1>
        </Link>
        
        
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link key={link.id} to={link.path} className='text-gray-600 hover:text-black font-medium transition-colors'>
              {link.title}
            </Link>
          ))}
        </div>
        
       
        <div className='hidden md:flex items-center gap-4'> 
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium">{currentUser.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className='px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors cursor-pointer'
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className='px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors'>Login</Link>
              <Link to="/signup" className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium'>Signup</Link>
            </>
          )}
        </div>
        
       
        <button 
          className='md:hidden text-gray-600 focus:outline-none'
          onClick={toggleMenu}
        >
          <FaBars size={24} />
        </button>
      </div>

      
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        
        <div className="flex flex-col px-6 py-4">
          
          <Link 
            to="/" 
            className='text-2xl font-bold mb-8'
            onClick={toggleMenu}
          >
            CMS
          </Link>
          
          
          <div className="flex flex-col space-y-4 mb-8">
            {navLinks.map((link) => (
              <Link 
                key={link.id} 
                to={link.path} 
                className='text-gray-600 hover:text-black font-medium transition-colors'
                onClick={toggleMenu}
              >
                {link.title}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col space-y-3 mt-auto">
            {currentUser ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{currentUser.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className='px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors w-full text-center'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className='px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors w-full text-center'
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium w-full text-center'
                  onClick={toggleMenu}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;