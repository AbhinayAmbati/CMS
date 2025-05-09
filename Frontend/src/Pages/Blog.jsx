import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import blogs from '../../constants/blogs.json'
import { FiSearch } from 'react-icons/fi'

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
              <div className="bg-white rounded-lg border border-transparent hover:border-black transition-colors">
                <div className="relative aspect-[16/9]">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{blog.author}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog