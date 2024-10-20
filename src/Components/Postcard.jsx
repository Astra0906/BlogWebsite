import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/Service'

const PostCard = ({ $id, title, featuredImage }) => {
 
    return (
        <Link to={`/post/${$id}`}>

<div 
  className='w-full rounded-xl p-4 bg-white/30 shadow-lg backdrop-blur-md border border-white/20 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-105'
  style={{ 
    background: 'rgba(255, 255, 255, 0.1)', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)' 
  }}
>
  <div>
    <img 
      src={service.previewFile(featuredImage)} 
      className='rounded-xl w-full' 
      alt={title} 
    />
  </div>
  <h2 className='text-xl font-bold text-white mt-4'>
    {title}
  </h2>
</div>


        </Link>

    )
}

export default PostCard