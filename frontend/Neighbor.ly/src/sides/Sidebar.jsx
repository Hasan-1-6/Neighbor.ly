import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  MessageSquareWarning,
  UserCircle,
  UserCog2,
  Menu,
  ChevronLeft,
  X,
  LogOutIcon,
  Bell,
  History,
  Building,
  Ticket,
  BookAlert,
  CreditCard,
} from "lucide-react";

import society from "../public/society.png";
import toast from "react-hot-toast";
import { AppContext } from "../App";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { setLoggedIn, setRole, setUser, role } = useContext(AppContext);

  const [menuItems, setMenuItems] = useState([]);

  // Build menu items for role
  useEffect(() => {
    if (!role) return;

    if (role === "admin") {
      setMenuItems([
        { name: "Dashboard", icon: <Home size={20} />, path: "" },
        { name: "Grievances", icon: <MessageSquareWarning size={20} />, path: "grev" },
        { name: "Members", icon: <UserCog2 size={20} />, path: "members" },
        
        
        { name: "Apartments", icon: <Building size={20} />, path: "apartments" },
        { name: "Residents", icon: <Users size={20} />, path: "residents" },
        { name: "Notify", icon: <Bell size={20} />, path: "create-ticket" },
        { name: "Notification History", icon: <History size={20} />, path: "notification-history" },
        // { name: "Payment History", icon: <CreditCard size={20} />, path: "payment-history" },
        { name: "Profile", icon: <UserCircle size={20} />, path: "profile" },
      ]);
    }

    if (role === "user") {
      setMenuItems([
        { name: "Dashboard", icon: <Home size={20} />, path: "" },
        { name: "Raise an issue", icon: <MessageSquareWarning size={20} />, path: "create-grievance" },
        { name: "My Complaints", icon: <BookAlert size={20} />, path: "grievance-history" },
        { name: "Contact Member", icon: <Users size={20} />, path: "members" },
        { name: "Complaint History", icon: <History size={20} />, path: "notification-history" },
        { name: "Profile", icon: <UserCircle size={20} />, path: "profile" },
      ]);
    }
  }, [role]);

  // Logout handler
  const handleLogout = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        }
      );

      if (!resp.ok) {
        toast.error("Some error occurred while logging out");
        return;
      }

      setLoggedIn(false);
      setRole(null);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`${mobileOpen ? "hidden" : "absolute"} md:hidden fixed top-4 left-4 z-50 bg-stone-700 text-white p-2 rounded-lg shadow`}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          md:sticky absolute top-0 left-0 h-screen bg-gray-100 text-gray-800 z-40 shadow-lg
          transform transition-all duration-300 overflow-y-scroll
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
          md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <img
              src={society}
              alt="logo"
              className={`rounded-xl object-cover transition-all duration-300 ${
                collapsed ? "w-6 h-6" : "w-10 h-10"
              }`}
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-lg text-gray-800 truncate">IERT</h2>
                <p className="text-sm text-gray-500 truncate">Society Management</p>
              </div>
            )}
          </div>

          {/* Collapse + Close buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
            >
              <X size={20} />
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-2 rounded hover:bg-gray-200"
            >
              <ChevronLeft
                size={20}
                className={`${collapsed ? "rotate-180" : ""} transition-all`}
              />
            </button>
          </div>
        </div>

        {/* Menu List */}
        <nav className="flex flex-col mt-4 p-4 gap-2">
          {menuItems.map((item, idx) => {
            return (
              <NavLink
                key={idx}
                to={item.path}
                end={item.path === ""}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-blue-100 text-blue-800" : "hover:bg-gray-200"
                  } ${collapsed ? "justify-center" : ""}`
                }
                title={collapsed ? item.name : ""}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 mx-4 mt-4 p-3 rounded-xl bg-blue-600 text-white justify-center cursor-pointer hover:scale-105 active:scale-100 transition-all"
        >
          <LogOutIcon size={20} />
          {!collapsed && <span>Logout</span>}
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
