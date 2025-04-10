import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const BlogPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const blogPost = {
    id: id,
    title: `Blog Post ${id}`,
    content: 'This is the content of the blog post. In a real application, this would be fetched from an API. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: ' vishnu',
    date: 'April 9, 2024',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D'
  }

  return (
    <div className='min-h-[calc(100vh-75px)] bg-gray-50'>
      <div className='container mx-auto px-4 py-12'>
        <button 
          onClick={() => navigate(-1)}
          className='flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors'
        >
          <FaArrowLeft className='mr-2' />
          Back to Blog
        </button>
        
        <div className='max-w-4xl mx-auto'>
          <img 
            src={blogPost.image} 
            alt={blogPost.title}
            className='w-full h-[500px] object-cover mb-8'
          />
          
          <h1 className='text-4xl font-bold mb-4'>{blogPost.title}</h1>
          <div className='flex items-center text-gray-600 mb-8'>
            <span>By {blogPost.author}</span>
            <span className='mx-2'>•</span>
            <span>{blogPost.date}</span>
          </div>
          <div className='prose max-w-none'>
            <p className='text-lg leading-relaxed text-gray-700'>{blogPost.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost 