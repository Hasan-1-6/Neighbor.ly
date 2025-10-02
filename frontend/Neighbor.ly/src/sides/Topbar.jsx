import React from 'react'
import { useState } from 'react'
import { Bell, Settings, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Topbar = () => {
    const [adminName, setadminName] = useState("Anurag")
    const [flatNo, setflatNo] = useState("")
  return (
    <div className='flex top-0  w-screen justify-between  p-4 border-b-2 border-gray-400'>
      <div>
        <h1 className='text-center font-bold text-2xl'>Welcome back, {adminName} ! </h1>
        <p className='text-center block'>{flatNo}</p>
        </div>
        
          <nav>
            <ul className='flex flex-col md:flex-row'>
              <li><Link to='/notification'><Bell /></Link></li>
            </ul>
          </nav>
        
    </div>
  )
}

export default Topbar