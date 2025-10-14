import { createContext, useContext, useEffect, useState } from 'react'
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
import LoginCard from './Login/LoginCard'
import { Toaster, toast } from 'react-hot-toast'

const AppContext = createContext();

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(false)
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    console.log('chekcing fir logiged in');
    const testToken = async () =>{
      try{
        console.log('fetching and verifying token')
        const resp = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/verifyToken`,{
          credentials : 'include',
          method : "GET",
        })
        if(!resp.ok){
          console.log("Token not found Relogin");
          return;
        }
        const data = await resp.json();
        setRole(data.role);
        setLoggedIn(true);
      }
      catch(err){
        console.log("some error occured while verifyin the tokens" + err.message);
      }
   }
    testToken();
  }, [])
  
  const userRouter = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <div className='flex min-h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col overflow-hidden'>
              <Topbar />
              <main className='flex overflow-y-auto relative'>
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        </>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: '/grev', element: <Grievances /> },
        { path: '/members', element: <Members /> },
        { path: '/pro', element: <Profile /> },
        { path: '/notification', element: <Notification /> },
        { path: '/setting', element: <Setting /> },
        { path: '/account', element: <Account /> },
      ],
    },

  ])
  const adminRouter = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <div className='flex min-h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col overflow-hidden'>
              <Topbar />
              <main className='flex overflow-y-auto relative'>
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        </>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: '/grev', element: <Grievances /> },
        { path: '/members', element: <Members /> },
        { path: '/pro', element: <Profile /> },
        { path: '/notification', element: <Notification /> },
        { path: '/setting', element: <Setting /> },
        { path: '/account', element: <Account /> },
      ],
    },

  ])
  return (
    <AppContext.Provider value={{loggedIn, setLoggedIn, role, setRole, user, setUser}} >
      <Toaster 
        position = "top-right"
        reverseOrder = {false}
      //   toastOptions={{
      //       style: {
      //       borderRadius: '10px',
      //       background: '#333',
      //       color: '#fff',
      //     }}
      //  }
      //ENABLE FOR DARK THEMED NOTIFICATIONS 
        
      />
          {!loggedIn ?
          <LoginCard /> 
        : 
          role === 'admin' 
        ?
          <RouterProvider router = {adminRouter} /> 
        : 
          <RouterProvider router = {userRouter} /> }
    </ AppContext.Provider >

  )
}
export {AppContext};
export default App