import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const mockNotification = [
      {id:1, message: "New user registered!", unread: true},
      {id:2, message: "Mr. Sharma paid society maintenance bill", unread: true},
      {id:3, message: "Elon Musk joined the society", unread: false},
];

const Topbar = ({ collapsed }) => {
  const [adminName] = useState("Anurag");
  const [flatNo] = useState("");
  const [notificationOpen, setnotificationOpen] = useState(false)
  const unreadCount = mockNotification.filter(n => n.unread).length
  
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
        <div className='relative flex items-center justify-center md:justify-end w-auto md:w-[100px]'>
          <button onClick={() => setnotificationOpen(!notificationOpen)} className='flex p-2 hover:bg-gray-300 rounded-full cursor-pointer'>
            <Bell className='w-6 h-6'/>
             {unreadCount > 0 && (<span className='absolute top-1 right-1 h-3 w-3 bg-red-400 rounded-full'></span>)}
          </button>
            <div className={`fixed bg-gray-100 z-50 overflow-hidden right-5 origin-top-right transition-all ease-in-out duration-300 ${notificationOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'} top-28 p-2 w-72 md:w-md lg:w-2xl border border-gray-400 rounded-lg`}> 
              <h3 className='text-md text-center font-semibold p-3 border-b text-gray-700'>Recent Notifications</h3>
              <ul className='divide-y divide-gray-400'>
                {mockNotification.map((notification) => (
                  <li
                  key={notification.id} className={`p-4 text-sm transition-colors ${notification.unread ? 'bg-gray-200 text-gray-600 font-medium': 'text-gray-900 hover:bg-gray-100'}`}>
                    {notification.message}
                  </li>
                ))}
              </ul>                     
            </div>                                                        
        </div>
    </div>
  )
}

export default Topbar