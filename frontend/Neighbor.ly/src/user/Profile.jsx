import React, { useContext } from 'react'
import { useState } from 'react'
import { User , FilePen} from 'lucide-react'
import {AppContext} from '../App'
const Profile = () => {
  const {user} = useContext(AppContext);
  return (
    <>
    <main className='relative w-full flex-1  p-4 md:p-6'> 
        {/* <div className='mb-10'>
            <div className='flex items-center '>
              <User className={`size-14 mr-5`} />
               <h1 className='font-bold text-3xl'>My Profile <p className='text-sm font-semibold mt-2'>Manage your personal and information and preferences</p></h1>
            </div>
        </div> */}
        <div className='flex gap-4 mt-5 items-center'>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&bold=true`} alt='User Avatar' className='rounded-full h-16 w-16 flex-shrink-0'></img>
              <h1 className='font-bold text-lg sm:2xl '>{user.name}</h1>
              <button className='border-none ml-auto  bg-blue-600 text-sm sm:text-lg font-bold items-center h-10 p-2  rounded-xl flex flex-row text-white'>
                Edit Profile
              </button>
              
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 '>
          
          <div>
            <h3 className='font-bold text-xl'>Email</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
          </div>
          <div>
            <h3 className='font-bold text-xl'>Phone Number</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
          </div>
          <div>
            <h3 className='font-bold text-xl'>Adhar Number</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
          </div>
          <div>
            <h3 className='font-bold text-xl'>Apartment</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
          </div>
          <div>
            <h3 className='font-bold text-xl'>Floor</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
          </div>
          <div>
            <h3 className='font-bold text-xl'>Room Number</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
          </div>
        </div>
    </main>
    </>
  )
}

export default Profile