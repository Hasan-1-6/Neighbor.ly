import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import Dashboard from "./user/Dashboard";
import Grievances from "./user/Grievances";
import Members from "./user/Members";
import UserMember from "./user/UserMember";
import AdminMember from "./admin/AdminMember";
import Sidebar from "./sides/Sidebar";
import Footer from "./sides/Footer";
import Profile from "./user/Profile";
import Topbar from "./sides/Topbar";
import { Notification, Account } from "./sides/Topnav";
import LoginCard from "./Login/LoginCard";
import { Toaster } from "react-hot-toast";
import AdminApartments from "./admin/AdminApartments";
import UserApartment from "./user/UserApartment";
import RegisterResidents from "./admin/RegisterResidents";
import ViewResidents from "./admin/ViewResidents";
import LandingPage from "./land/LandingPage";
import "./App.css";

export const AppContext = createContext();


// Shared Layout for User & Admin
function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col min-h-full">
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token on mount
  useEffect(() => {
    const testToken = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/verifyToken`,
          { credentials: "include", method: "GET" }
        );

        if (!resp.ok) {
          setLoading(false);
          return;
        }

        const data = await resp.json();
        setRole(data.role);
        setUser(data.user);
        setLoggedIn(true);
      } catch (err) {
        console.log("Token check failed:", err.message);
      } finally {
        setLoading(false);
      }
    };

    testToken();
  }, []);


  // === ROUTER ===
  const router = createBrowserRouter([

    // PUBLIC ROUTES
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: loggedIn ? <Navigate to={`/${role}`} /> : <LoginCard /> },

    // USER ROUTES
    {
      path: "/user",
      element:
        loggedIn && role === "user" ? <Layout /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "grev", element: <Grievances /> },
        { path: "members", element: <Members /> },
        { path: "profile", element: <Profile /> },
        { path: "notification", element: <Notification /> },
        // { path: "apartments", element: <UserApartment /> },
        { path: "account", element: <Account /> },
      ],
    },

    // ADMIN ROUTES
    {
      path: "/admin",
      element:
        loggedIn && role === "admin" ? <Layout /> : <Navigate to="/login" />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "grev", element: <Grievances /> },
        { path: "members", element: <AdminMember /> },
        { path: "profile", element: <Profile /> },
        { path: "notification", element: <Notification /> },
        { path: "apartments", element: <AdminApartments /> },
        { path: "residents", element: <ViewResidents /> },
        { path: "register", element: <RegisterResidents /> },
        { path: "account", element: <Account /> },
      ],
    },
  ]);


  return (
    <AppContext.Provider
      value={{ loggedIn, setLoggedIn, role, setRole, user, setUser }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <img src="/loading.svg" alt="Loading..." className="w-20" />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </AppContext.Provider>
  );
}

export default App;
