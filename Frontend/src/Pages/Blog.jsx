import React from 'react'
import { Link } from 'react-router-dom'

const Blog = () => {
  
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and how to build your first application.',
      author: 'vishnu',
      date: 'April 9, 2024',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      excerpt: 'Explore advanced patterns and techniques in React development.',
      author: 'vishnu',
      date: 'April 8, 2024',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 3,
      title: 'State Management in React',
      excerpt: 'Understanding different state management solutions in React.',
      author: 'vishnu',
      date: 'April 7, 2024',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D'
    }
  ]

  return (
    <div className='min-h-[calc(100vh-75px)] bg-white'>
      <div className='container mx-auto px-4 py-16'>
        <h1 className='text-5xl font-bold mb-16 text-center tracking-tight'>Vishnus Blog's</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className='block group'
            >
              <div className='bg-white border border-gray-100 rounded-none overflow-hidden transition-all duration-300 hover:border-black'>
                <div className='h-56 overflow-hidden'>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                  />
                </div>
                <div className='p-8'>
                  <h2 className='text-2xl font-semibold mb-4 group-hover:text-black transition-colors'>{post.title}</h2>
                  <p className='text-gray-600 mb-6 line-clamp-2 text-base'>{post.excerpt}</p>
                  <div className='flex items-center text-sm text-gray-500 border-t pt-4'>
                    <span className='font-medium'>{post.author}</span>
                    <span className='mx-2'>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog