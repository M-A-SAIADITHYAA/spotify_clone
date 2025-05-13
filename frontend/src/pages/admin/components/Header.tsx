import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex items-center justify-between '>
      <div className="flex items-center gap-3 mb-7">
        <Link to='/' className='rounded-lg'>
        <img src="/spotify.png" alt=""  className='size-10'/>
        </Link>
        <div>
          <h1 className='text-3xl font-extrabold'>Music Manager</h1>
          <p className='mt-1'>Manage your music</p>
        </div>
      </div>
     <UserButton/>
    </div>
      
  )
}

export default Header