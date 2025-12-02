import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Send,
  MessageCircleWarning,
  MegaphoneIcon,
  MessageSquareWarning,
  UserPlus,
  Building2,
  FileText,
  Users,
  UserPlus2,
  UserCog2,
  History,
  BookAlert,
  CreditCard,
  ReceiptIndianRupee
} from "lucide-react";

import { AppContext } from "../App";
import UserGrievances from "./UserGrievances";

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
    { title: "Pay Bills", desc: "Pay maintenance & utility", icon: <Wallet size={22} />, to: "/user/pay-rent" },
  
    { title: "Submit Grievance", desc: "Report society concerns", icon: <MessageCircleWarning size={22} />, to: "/user/create-grievance" },
    { title: "Society Members", desc: "Find & contact members", icon: <UserPlus size={22} />, to: "/user/members" },
    { title: "View Apartments", desc: "View available apartments", icon: <Building2 size={22} />, to: "/user/apartments" },
    { title: "My Complaints", desc: "View all your tickets", icon: <BookAlert size={22} />, to: "/user/grievance-history" },
    
  ];

  // ADMIN ACTIONS (with links)
  const adminActions = [
    { title: "Grievances", desc: "Handle Complaint tickets", icon: <MessageSquareWarning size={22} />, to: "/admin/grev" },
    { title: "Society Members", desc: "Find & Add members", icon: <UserCog2 size={22} />, to: "/admin/members" },
    { title: "View Apartments", desc: "View apartments, floors & flats", icon: <Building2 size={22} />, to: "/admin/apartments" },
    { title: "Complaint History", desc: "View resolved tickets & complaints", icon: <History size={22} />, to: "notification-history" },
    { title: "Register Resident", desc: "Register a new resident", icon: <UserPlus2 size={22} />, to: "/admin/register" },
    { title: "View Residents", desc: "View & manage residents", icon: <Users size={22} />, to: "/admin/residents" },
    { title: "Payment History", desc: "View payment history of Residents", icon: <CreditCard size={22} />, to: "/admin/payment-history" },
    { title: "Update Rent", desc: "Bill due rent of a resident", icon: <ReceiptIndianRupee size={22} />, to: "/admin/update-due-rent" },
  ];

  return (
    <main className="relative w-full h-screen flex-1 pt-20 p-4 mt-8 md:p-6">
      <div className="w-full mx-auto">

        
        {role === "user" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
          </div>
          <UserGrievances />
        </>
        )}

        
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
