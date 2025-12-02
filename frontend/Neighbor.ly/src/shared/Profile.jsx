import React, { useContext } from "react";
import { AppContext } from "../App";

const Profile = () => {
  const { user, role } = useContext(AppContext);

  return (
    <main className="relative w-full flex-1 p-4 md:p-6">
      <div className="flex gap-4 mt-5 items-center">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            role === "user" ? user.owner : user.name
          )}&background=0D8ABC&color=fff&bold=true`}
          alt="User Avatar"
          className="rounded-full h-16 w-16 flex-shrink-0"
        ></img>
        <h1 className="font-bold text-lg sm:2xl ">
          {role === "user" ? `${user.owner} (${user.id})` : user.name}
        </h1>
      </div>

      {role === "user" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 ">
          <div>
            <h3 className="font-bold text-xl">Contact Number</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.contact}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl">Aadhar Number</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.aadhar}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl">Apartment</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.apart}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl">Floor</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.floor}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl">Flat Number</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.flat}
            </div>
          </div>
           <div>
            <h3 className="font-bold text-xl">Due Rent</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              ₹{user.dueRent}
            </div>
          </div>
        </div>
      )}

      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 ">
          <div>
            <h3 className="font-bold text-xl">Email</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.email}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl">Contact Number</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.contact}
            </div>
          </div>
           <div>
            <h3 className="font-bold text-xl">Role</h3>
            <div className="p-4 sm:p-6 border-1 border-gray-400 rounded-lg">
              {user.role}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
