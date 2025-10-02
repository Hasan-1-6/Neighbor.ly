import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Aperture, Home, Users, MessageSquareWarning, UserCircle, Menu, ChevronLeft, X, Settings } from "lucide-react";
 import society from "../public/society.png";
 import TopNav from "./Topnav";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // Desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile toggle
   const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Members", icon: <Users size={20} />, path: "/members" },
    { name: "Grievances", icon: <MessageSquareWarning size={20} />, path: "/grev" },
    { name: "Profile", icon: <UserCircle size={20} />, path: "/pro" },
    { name: "Setting", icon: <Settings size={20} />, path: "/setting"},
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`${mobileOpen ? 'hidden' : 'block'} md:hidden fixed top-4 left-4 z-50 bg-stone-700 text-white p-2 rounded-lg shadow`}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-100 text-gray-800 z-40 shadow-lg
          transform transition-all duration-300
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
          md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="flex items-center gap-2 flex-shrink-0">
            { <img 
              src={society} 
              alt="logo" 
              className={`rounded-xl object-cover transition-all duration-300 ${collapsed ? 'w-6 h-6' : 'w-10 h-10'}`} 
            /> }
            {!collapsed && <div className="flex flex-col min-w-0">
              <h2 className="font-bold text-lg text-gray-800 truncate">IERT</h2>
              <p className="text-sm text-gray-500 truncate">Society Management</p>
            </div>}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
            >
              <X size={20} />
            </button>

            {/* Desktop collapse button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-2 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={20} className={`${collapsed ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-4 p-4">
          {menuItems.map((item, idx) => {
             const active = location.pathname === item.path;
              
            return (
              <div
                key={idx}
                to={item.path}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${active ? "bg-blue-100 text-blue-800" : "hover:bg-gray-200"}
                  ${collapsed ? "justify-center" : "justify-start"}
                `}
                title={collapsed ? item.name : ""}
              >
                {item.icon}
                {!collapsed && <span className="text-gray-800">{item.name}</span>}
              </div>
            );
          })}
        </nav>
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