import React from 'react'
import {Users} from 'lucide-react'
const Members = () => {
  return (
   <>
   <main className='relative w-full border-1 border-gray-200 bg-stone-200 mt-20 md:mt-24 md:ml-72 md:right-3 flex-1 p-4 md:p-6'>
      <section className='mb-8 p-4'>
        <div className='flex gap-2'>
        <Users className={`size-20 md:size-11 lg:size-10`} />
         <h1 className='font-bold text-3xl mb-4'>Society Members</h1>
         </div>
          <p>Manage and view all society Members</p>
          <div>
          <button className='border-none bg-blue-800 p-2 text-white font-bold relative left-10/12'>Add Member</button>
          </div>
      </section>
      
   </main>
   </>
  )
}

export default Members