import React from 'react'
import { useState } from 'react'
import { User , FilePen} from 'lucide-react'
const Profile = () => {
const userInfo = {name: "xyz"}
  return (
    <>
    <main className='relative w-full flex-1 mt-20 md:mt-24 md:mb-5 border-1 border-gray-200 bg-stone-300 md:mx-3 p-4 md:p-6'> 
        <div className='flex flex-col md:flex-row gap-4 p-4 md:p-6 justify-between'>
            <div className='flex gap-2'>
              <User className={`size-14 md:size-13 lg:size-10`} />
               <h1 className='font-bold mt-2 lg:mt-0 text-3xl'>My Profile <p className='text-sm font-semibold mt-2'>Manage your personal and information and preferences</p></h1>
            </div>
            <button className='border-none bg-blue-900 font-bold w-full md:w-1/2 lg:w-1/5 p-3 md:p-5  gap-1 rounded-xl flex flex-row text-white'><FilePen />Edit Profile</button>
        </div>
        <div className='flex gap-7 mt-5'>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=0D8ABC&color=fff&bold=true`} alt='User Avatar' className='rounded-full h-24 w-24 flex-shrink-0'></img>
              <h1 className='font-bold text-2xl mt-5'>Personal Info</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-32 mt-8'>
          <div>
            <h3 className='font-bold text-xl'>Full Name</h3>
            <div className='p-4 sm:p-6 border-1 border-gray-400 rounded-lg'></div>
            </div>
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