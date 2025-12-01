import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Send,
  MessageCircleWarning,
  MegaphoneIcon,
  UserPlus,
  Building2,
  FileText,
  Users
} from "lucide-react";

import { AppContext } from "../App";

// Color palette
const colors = [
  "bg-emerald-200 border-emerald-100",
  "bg-blue-300 border-blue-200",
  "bg-red-300 border-red-200",
  "bg-purple-300 border-purple-200",
  "bg-yellow-300 border-yellow-200",
  "bg-pink-300 border-pink-200",
  "bg-cyan-300 border-cyan-200",
  "bg-violet-300 border-violet-200",
];

const Dashboard = () => {
  const { role } = useContext(AppContext);

  // USER ACTIONS (with links)
  const userActions = [
    { title: "Pay Bills", desc: "Pay maintenance & utility", icon: <Wallet size={22} />, to: "/user/pay" },
    { title: "Submit Request", desc: "Report maintenance issues", icon: <Send size={22} />, to: "/user/request" },
    { title: "Submit Grievance", desc: "Report society concerns", icon: <MessageCircleWarning size={22} />, to: "/user/grievance" },
    { title: "Announcements", desc: "Latest society updates", icon: <MegaphoneIcon size={22} />, to: "/user/announcements"},
    { title: "Society Members", desc: "Find & contact members", icon: <UserPlus size={22} />, to: "/user/members" },
    
    
  ];

  // ADMIN ACTIONS (with links)
  const adminActions = [
    { title: "Society Members", desc: "Find & contact members", icon: <UserPlus size={22} />, to: "/admin/members" },
    { title: "View Apartments", desc: "View apartments, floors & flats", icon: <FileText size={22} />, to: "/admin/apartments" },
    { title: "Register Resident", desc: "Register a new resident", icon: <FileText size={22} />, to: "/admin/register" },
    { title: "View Residents", desc: "View & manage residents", icon: <Users size={22} />, to: "/admin/residents" },
  ];

  return (
    <main className="relative w-full h-screen flex-1 pt-20 p-4 md:p-6">
      <div className="w-full mx-auto">

        
        {role === "user" && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {userActions.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`border py-10 rounded-xl hover:scale-105 transition text-center p-6 cursor-pointer ${colors[idx % colors.length]}`}
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-white/50 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>}

        
        {role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminActions.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className={`border py-10 rounded-xl hover:scale-105 transition text-center p-6 cursor-pointer ${colors[(idx + 3) % colors.length]}`}
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-white/50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p>{item.desc}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
