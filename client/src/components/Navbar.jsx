import React from 'react'
import { assets } from '../assets/assets.js'
import { useBlogContext } from '../../context/BlogContext.jsx'

const Navbar = () => {
  const { navigate, token } = useBlogContext()

  return (
    <div className='flex justify-between items-center py-2 px-6 sm:px-10 md:px-20 xl:px-32'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='w-12 sm:w-16 md:w-20 cursor-pointer'
      />

      {token ? (
        <button
          onClick={() => navigate('/admin')}
          className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200'
        >
          Dashboard
          <img src={assets.arrow} alt="arrow" className='w-4 h-4' />
        </button>
      ) : (
        <button
          onClick={() => navigate('/admin')}
          className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200'
        >
          Login
          <img src={assets.arrow} alt="arrow" className='w-4 h-4' />
        </button>
      )}
    </div>
  )
}

export default Navbar
