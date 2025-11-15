import { createContext, useContext, useEffect, useState } from 'react'
import Dashboard from './user/Dashboard'
import Grievances from './user/Grievances'
import Members from './user/Members'
import UserMember from './user/UserMember'
import AdminMember from './admin/AdminMember'
import Sidebar from './sides/Sidebar'
import Footer from './sides/Footer'
import Profile from './user/Profile'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Topbar from './sides/Topbar'
import { Notification, Setting, Account } from './sides/Topnav'
import './App.css'
import LoginCard from './Login/LoginCard'
import { Toaster, toast } from 'react-hot-toast'
import AdminApartments from './admin/AdminApartments'


export const AppContext = createContext();

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  
  
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
          setLoading(false);
          return;
        }
        const data = await resp.json();
        setRole(data.role);
        setUser(data.user)
        console.log(data)
        setLoggedIn(true);
      }
      catch(err){
        console.log("some error occured while verifyin the tokens" + err.message);
      }
      finally{
        setLoading(false)
      }
   }
    testToken();
  }, [])
  
  const userRouter = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
              <Topbar />
              <main className="flex-1 overflow-y-auto">
                <div className="flex flex-col min-h-full">
                  <Outlet />
                  <Footer />
                </div>
            </main>
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
      //user routes
    },

  ])
  const adminRouter = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col'>
              <Topbar />
              <main className="flex-1 overflow-y-auto">
                <div className="flex flex-col min-h-full">
                  <Outlet />
                  <Footer />
                </div>
            </main>
            </div>            
          </div>
        </>
        
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: '/grev', element: <Grievances /> },
        { path: '/members', element: <AdminMember /> },
        { path: '/pro', element: <Profile /> },
        { path: '/notification', element: <Notification /> },
        { path: '/setting', element: <AdminApartments /> },
        { path: '/account', element: <Account /> },
      ],
      //admin routes
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
export default App