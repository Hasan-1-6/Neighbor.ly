import React from 'react'
import { Mail, MapPin, PhoneCall, Users } from 'lucide-react'
import { useState, useEffect } from 'react'


const UserMembers = () => {
  const userInfo = {name: "xyz"}
  return (
    <>
      <main className='relative w-full border-1 border-gray-200 bg-stone-200 mt-20 md:mt-24 md:mx-3 flex-1 p-4 md:p-8'>

        <div className='flex gap-4 flex-col md:flex-row p-4 md:p-6 justify-between'>
          <div className='flex gap-4'>
            <Users className={`size-17 md:size-11 lg:size-10`} />
            <h1 className='font-bold text-2xl'>Society Members<p className='text-sm'>Manage and view society</p></h1>
          </div>
          {/*<button className='border-none bg-blue-900 font-bold p-2 rounded-lg text-white'>Add Members</button>*/}
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div className='p-2 w-auto bg-stone-50 rounded-xl'>
            <h4 className='text-lg'>Total Members</h4>
            <p>6</p>
          </div>
          <div className='p-2 w-auto bg-stone-50 rounded-xl'>
            <h4 className='text-lg'>Active Members</h4>
            <p>6</p>
          </div>
          <div className='p-2 w-auto bg-stone-50 rounded-xl'>
            <h4 className='text-lg'>Wing A</h4>
            <p>3</p>
          </div>
          <div className='p-2 w-auto bg-stone-50 rounded-xl'>
            <h4 className='text-lg'>Wing B</h4>
            <p>3</p>
          </div>
        </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10'>
              <div className='p-3 border border-gray-100 bg-white rounded-xl flex flex-col justify-between h-full'>
              <div className='flex gap-3 items-start'>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=0D8ABC&color=fff&bold=true`} alt='User Avatar' className='rounded-full h-12 w-12 flex-shrink-0'></img>
                <div className='flex flex-col flex-grow min-w-0 items-start'>
                  <b className='font-semibold truncate w-full'>Dr. Rajesh Kumar</b>
                  <div className='flex items-center gap-1 mt-0.5'>
                    <MapPin size={16} className='flex-shrink-0'/>
                    <p className='min-w-0 whitespace-nowrap'>A-302 | Floor 3</p>
                  </div>
                  <div className='mt-2'>
                  <span className=' bg-green-700 p-1 font-medium rounded-full whitespace-nowrap text-white'>
                    Society President
                  </span>
                  </div>
                  <p className='mt-1'>Joined: 15 Jan 2020</p>
                </div>
              </div>
              <div className='mt-4  flex gap-2 flex-wrap w-full justify-around'>
                  <button className='flex bg-gray-200 items-center justify-center px-3 py-1.5 space-x-1 rounded-lg hover:bg-gray-400'>
                    <span><PhoneCall size={16} /></span>
                     <span>Call</span>
                  </button>
                  <button className='flex bg-gray-200 items-center justify-center px-3 py-1.5 space-x-1 rounded-lg hover:bg-gray-400'>
                    <span><Mail size={16} /></span>
                    <span>Email</span>
                  </button>
              </div>
              </div>
               <div className='p-3 border border-gray-100 bg-white rounded-xl flex flex-col justify-between h-full'>
              <div className='flex gap-3 items-start'>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=0D8ABC&color=fff&bold=true`} alt='User Avatar' className='rounded-full h-12 w-12 flex-shrink-0'></img>
                <div className='flex flex-col flex-grow min-w-0 items-start'>
                  <b className='font-semibold truncate w-full'>Mrs. Priya Chakraborty</b>
                  <div className='flex items-center gap-1 mt-0.5'>
                    <MapPin size={16} className='flex-shrink-0'/>
                    <p className='min-w-0 whitespace-nowrap'>B-101 | Floor 1</p>
                  </div>
                  <div className='mt-2'>
                  <span className=' bg-green-700 p-1 font-medium rounded-full whitespace-nowrap text-white'>
                    Secretary
                  </span>
                  </div>
                  <p className='mt-1'>Joined: 20 Jun 2019</p>
                </div>
              </div>
              <div className='mt-4  flex gap-2 flex-wrap w-full justify-around'>
                  <button className='flex bg-gray-200 items-center justify-center px-3 py-1.5 space-x-1 rounded-lg hover:bg-gray-400'>
                    <span><PhoneCall size={16} /></span>
                     <span>Call</span>
                  </button>
                  <button className='flex bg-gray-200 items-center justify-center px-3 py-1.5 space-x-1 rounded-lg hover:bg-gray-400'>
                    <span><Mail size={16} /></span>
                    <span>Email</span>
                  </button>
              </div>
              </div>
               <div className='p-3 border border-gray-100 bg-white rounded-xl flex flex-col justify-between h-full'>
              <div className='flex gap-3 items-start'>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=0D8ABC&color=fff&bold=true`} alt='User Avatar' className='rounded-full h-12 w-12 flex-shrink-0'></img>
                <div className='flex flex-col flex-grow min-w-0 items-start'>
                  <b className='font-semibold truncate w-full'>Mr. Anand Patel</b>
                  <div className='flex items-center gap-1 mt-0.5'>
                    <MapPin size={16} className='flex-shrink-0'/>
                    <p className='min-w-0 whitespace-nowrap'>A-405 | Floor 4</p>
                  </div>
                  <div className='mt-2'>
                  </div>
                  <p className='mt-1'>Joined: 10 Mar 2021</p>
                </div>
              </div>
              <div className='mt-4  flex gap-2 flex-wrap w-full justify-around'>
                  <button className='flex bg-gray-200 items-center justify-center px-3 py-1.5 space-x-1 rounded-lg hover:bg-gray-400'>
                    <span><PhoneCall size={16} /></span>
                     <span>Call</span>
                  </button>
                  <button className='flex bg-gray-200 items-center justify-center px-3 py-1.5 space-x-1 rounded-lg hover:bg-gray-400'>
                    <span><Mail size={16} /></span>
                    <span>Email</span>
                  </button>
              </div>
              </div>
          </div>
      </main>
    </>
  )
}

export default UserMembers