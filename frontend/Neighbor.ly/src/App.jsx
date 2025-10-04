import { useState } from 'react'

// import Dashboard from './sides/Header/Dashboard'
// import Grievances from './sides/Header/Grievances'
// import Members from './sides/Header/Members'
import Sidebar from './user/Sidebar'
import Footer from './user/Footer'
// import Profile from './sides/Header/Profile'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Topbar from './user/Topbar'
import { Notification, Setting, Account } from './user/Topnav'
import AnimatedBackground from './Login/AnimatedBackground'
import LoginCard from './Login/LoginCard'


function App() {
  // const router = createBrowserRouter([
  //   {
  //     path : '/',
  //     element : (
  //       <>
  //       <Topbar/>
  //       <Sidebar/>
  //       <Outlet/>
  //       <Footer/>
  //       </>
  //     ),
  //     children: [
  //       {index:true, element: <Dashboard/>},
  //       {path: '/grev', element: <Grievances/>},
  //       {path: '/members', element: <Members/>},
  //       {path: '/pro', element: <Profile/>},
  //       {path: '/notification', element: <Notification/>},
  //       {path: '/setting', element: <Setting/>},
  //       {path: '/account', element: <Account/>},
  //     ],
  //   },

  // ])
  return (
    // <RouterProvider router={router} />
    <div className=''>
    {/* <Sidebar /> */}
      <LoginCard />
    </div>
  )
}

export default App