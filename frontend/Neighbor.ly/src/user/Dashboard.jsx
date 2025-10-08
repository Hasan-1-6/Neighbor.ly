import React from 'react'
import { Building2, FileText, MegaphoneIcon, MegaphoneOff, MessageCircleWarning, Phone, Send, Siren, ToolCase, UserPlus, Wallet } from 'lucide-react'
const Dashboard = () => {
  return (
  <>
  <main className='relative w-full flex-1 pt-20 md:pt-24 p-4 md:p-6'>
    <div className='w-full mx-auto'>
      <section className='mb-8 p-4 bg-gray-200'>
        <h3 className='font-bold text-2xl'>Quick Actions</h3>
      </section>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <div className='bg-emerald-200 border border-emerald-100 rounded-xl text-center p-6'>
            <div className='mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4'>
              <span><Wallet size={22} /></span>
            </div>
            <h3 className='font-bold text-xl text-emerald-500'>Pay Bills</h3>
            <p>Pay maintainence & Utility</p>
            <button className='border-none bg-emerald-700 font-bold rounded-lg p-2 mt-4 text-white'>Pay Now</button>
          </div>
          <div className='bg-blue-300 border border-blue-200 rounded-xl text-center p-6'>
              <div className='mx-auto w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mb-4'>
                <span><Send size={22} /></span>
              </div>
              <h3 className='font-bold text-xl text-blue-600'>Submit Request</h3>
              <p>Report maintainence issues</p>
              <button className='border-none bg-blue-800 rounded-lg p-2 mt-4 text-white font-bold'>Submit</button>
          </div>
          <div className='bg-red-300  border border-red-200 rounded-xl text-center p-6'>
              <div className='mx-auto h-12 w-12 rounded-full bg-red-200 flex items-center justify-center mb-4'>
                  <span><MessageCircleWarning size={22} /></span>
              </div>
              <h3 className='font-bold text-red-600 text-xl'>Submit Grievance</h3>
              <p>Reoprt society concerns</p>
              <button className='border-none bg-red-800 rounded-lg p-2 font-bold text-white mt-4'>Submit</button>
          </div>
          <div className='bg-purple-300 border rounded-xl border-purple-200 text-center p-6'>
              <div className='mx-auto h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center mb-4'>
                <span><MegaphoneIcon size={22} /></span>
              </div>
              <h3 className='text-purple-600 font-bold text-xl'>Annoucements</h3>
              <p>Society latest update</p>
              <button className='border-none bg-purple-800 font-bold p-2 mt-4 text-white rounded-lg'>Check</button>
          </div>
          <div className='bg-yellow-300 border border-yellow-200 rounded-xl p-6 text-center'>
              <div className='mx-auto h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center'>
                  <span><UserPlus size={22} /></span>
              </div>
              <h3 className='text-yellow-700 font-bold text-xl'>Contact Members</h3>
              <p>Find & contact neighbors</p>
              <button className='border-none bg-yellow-800 font-bold p-2 mt-4 text-white rounded-lg'>Search</button>
          </div>
          <div className='bg-pink-300 border border-pink-200 rounded-xl text-center p-6'>
              <div className='mx-auto h-12 w-12 rounded-full bg-pink-200 flex items-center justify-center'>
                  <span><Building2 size={22} /></span>
              </div>
              <h3 className='text-pink-600 font-bold text-2xl'>Book Amenities</h3>
                  <p>Reserve common areas</p>
                  <button className='border-none rounded-lg bg-pink-800 font-bold text-white p-2 mt-4'>Book</button>
          </div>
          <div className='bg-cyan-300 border border-cyan-200 rounded-xl p-6 text-center'>
              <div className='mx-auto bg-cyan-200 h-12 w-12 rounded-full flex items-center justify-center'>
                  <span><FileText size={22} /></span>
              </div>
              <h3 className='text-cyan-700 font-bold text-2xl'>Documents</h3>
              <p>Search society documents</p>
              <button className='border-none rounded-lg p-2 bg-cyan-800 text-white font-bold mt-4'>Find</button>
          </div>
        </div>
    </div>

  </main>
  </>
  )
}

export default Dashboard