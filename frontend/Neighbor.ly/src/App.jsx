import { useState } from 'react'
 import Dashboard from './user/Dashboard'
 import Grievances from './user/Grievances'
 import Members from './user/Members'
import Sidebar from './sides/Sidebar'
import Footer from './sides/Footer'
 import Profile from './user/Profile'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Topbar from './sides/Topbar'
import { Notification, Setting, Account } from './sides/Topnav'
import './App.css'

function App() {
   const router = createBrowserRouter([

     {
       path : '/',
       element : (
        <>
        <Topbar/>
         <Sidebar/>
         <Outlet/>
       <Footer/>
         </>
      ),
       children: [
         {index:true, element: <Dashboard/>},
         {path: '/grev', element: <Grievances/>},
         {path: '/members', element: <Members/>},
       {path: '/pro', element: <Profile/>},
         {path: '/notification', element: <Notification/>},
         {path: '/setting', element: <Setting/>},
         {path: '/account', element: <Account/>},
       ],
    },

   ])
  return (
    <RouterProvider router={router} />

  )
}

export default App