import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Dashboard", path: "/dashboard" }
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className='absolute top-0 left-0 right-0 flex justify-between items-center bg-white py-4 w-full px-8 shadow-sm z-10'>
        <Link to="/" className='text-3xl font-bold tracking-tight hover:text-gray-700 transition-colors'>
          <h1>CMS</h1>
        </Link>
        
        {/* Desktop Nav Links */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link key={link.id} to={link.path} className='text-gray-600 hover:text-black font-medium transition-colors'>
              {link.title}
            </Link>
          ))}
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className='hidden md:flex items-center gap-4'> 
          <Link to="/login" className='px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors'>Login</Link>
          <Link to="/signup" className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium'>Signup</Link>
        </div>
        
        {/* Mobile Hamburger Button */}
        <button 
          className='md:hidden text-gray-600 focus:outline-none'
          onClick={toggleMenu}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        {/* Mobile Menu Content */}
        <div className="flex flex-col px-6 py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className='text-2xl font-bold mb-8'
            onClick={toggleMenu}
          >
            Vishnu
          </Link>
          
          {/* Nav Links */}
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
          
          {/* Auth Buttons */}
          <div className="flex flex-col space-y-3 mt-auto">
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
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;