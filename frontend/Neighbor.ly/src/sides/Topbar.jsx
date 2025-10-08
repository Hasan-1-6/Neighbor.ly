import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

const Topbar = ({ collapsed }) => {
  const [adminName] = useState("Anurag")
  const [flatNo] = useState("")

  return (
    <div
      className={`fixed top-0 right-0 bg-white border-b-2 border-gray-400 z-30
      flex items-center justify-between p-4 transition-all duration-300
      w-full md:w-auto ${collapsed ? 'md:left-20' : 'md:left-64'}`}
    >
      
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl text-center md:text-left">
          Welcome back, {adminName}!
        </h1>
        <p className="text-center md:text-left">{flatNo}</p>
      </div>

     
      <div className="flex items-center justify-center md:justify-end w-auto md:w-[100px]">
        <Link
          to="/notification"
          className="flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <Bell className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}

export default Topbar
