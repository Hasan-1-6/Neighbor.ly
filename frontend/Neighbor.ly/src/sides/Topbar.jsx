import React from "react";
import { useState } from "react";
import { Bell, Settings, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const mockNotification = [
  { id: 1, message: "New user registered!", unread: true },
  { id: 2, message: "Mr. Sharma paid society maintenance bill", unread: true },
  { id: 3, message: "Elon Musk joined the society", unread: false },
];

const Topbar = () => {
  const { user, role } = useContext(AppContext);

  const [notificationOpen, setnotificationOpen] = useState(false);
  const unreadCount = mockNotification.filter((n) => n.unread).length;

  return (
    <div className="flex  top-0 w-full items-center justify-between py-4 px-6 border-b-2 border-gray-400">
      <div>
        <h1 className="text-center font-bold text-lg sm:text-2xl">
          Welcome back, {role === "admin" ? user.name : user.owner}!
        </h1>
      </div>

      <div className="relative flex items-center justify-center md:justify-end w-auto md:w-[100px]">
        <button
          onClick={() => setnotificationOpen(!notificationOpen)}
          className="flex p-2 hover:bg-gray-300 rounded-full cursor-pointer"
        >
          <Bell className="w-6 h-6 relative" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-400 rounded-full"></span>
          )}
        </button>
        <div
          className={`fixed bg-gray-100 z-10 overflow-hidden right-5 origin-top-right transition-all ease-in-out duration-300 ${notificationOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} top-28 p-2 w-72 md:w-md lg:w-2xl border border-gray-400 rounded-lg`}
        >
          <h3 className="text-md text-center font-semibold p-3 border-b text-gray-700">
            Recent Notifications
          </h3>
          <ul className="divide-y divide-gray-400">
            {mockNotification.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 text-sm transition-colors ${notification.unread ? "bg-gray-200 text-gray-600 font-medium" : "text-gray-900 hover:bg-gray-100"}`}
              >
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
