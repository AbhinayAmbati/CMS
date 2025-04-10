import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaTwitter, FaUser } from 'react-icons/fa';


const Signup = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm w-full max-w-md">
      
        <div className="flex border-b mb-6">
          <Link to="/login" className="w-1/2 pb-2 text-center text-gray-500 hover:text-gray-700">
            Sign In
          </Link>
          <div className="w-1/2 pb-2 text-center border-b-2 border-gray-800 font-medium">
            Sign Up
          </div>
        </div>

       
        <form className="space-y-4">
      
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1 text-sm sm:text-base">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

        
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 text-sm sm:text-base">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1 text-sm sm:text-base">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 text-sm sm:text-base">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          
          <div className="flex items-start sm:items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-4 w-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 block text-xs sm:text-sm text-gray-700">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

         
          <button
            type="submit"
            className="w-full bg-gray-900 text-white rounded-md py-2 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-2 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50"
          >
            <FaGoogle className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-2 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50"
          >
            <FaGithub className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-2 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50"
          >
            <FaTwitter className="h-5 w-5" />
          </button>
        </div>

        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;