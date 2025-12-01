import React, { useContext } from "react";
import {
  Building2,
  FileText,
  MegaphoneIcon,
  MegaphoneOff,
  MessageCircleWarning,
  Phone,
  Send,
  Siren,
  Users,
  ToolCase,
  UserPlus,
  Wallet,
} from "lucide-react";

import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";

const Dashboard = () => {
  const navigate = useNavigate();
  const { role } = useContext(AppContext);
  return (
    <>
      <main className="relative w-full h-screen flex-1 pt-20  p-4 md:p-6">
        <div className="w-full mx-auto">
          <section className="mb-8 p-4 rounded-xl bg-gray-200">
            <h3 className="font-bold text-2xl">Quick Actions</h3>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-emerald-200 border py-10 border-emerald-100 rounded-xl hover:scale-105 cursor-pointer transition text-center p-8 ">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <span>
                  <Wallet size={22} />
                </span>
              </div>
              <h3 className="font-bold text-xl text-emerald-500">Pay Bills</h3>
              <p>Pay maintainence & Utility</p>
              {/* <button className='border-none bg-emerald-700 font-bold rounded-lg p-2 mt-4 text-white'>Pay Now</button> */}
            </div>
            <div className="bg-blue-300 py-10 border border-blue-200 rounded-xl text-center p-6 hover:scale-105 cursor-pointer transition">
              <div className="mx-auto w-12 h-12  rounded-full bg-blue-200 flex items-center justify-center mb-4">
                <span>
                  <Send size={22} />
                </span>
              </div>
              <h3 className="font-bold text-xl text-blue-600">
                Submit Request
              </h3>
              <p>Report maintainence issues</p>
              {/* <button className='border-none bg-blue-800 rounded-lg p-2 mt-4 text-white font-bold'>Submit</button> */}
            </div>
            <div className="bg-red-300  border py-10 border-red-200 rounded-xl text-center p-6 hover:scale-105 cursor-pointer transition">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-200 flex items-center justify-center mb-4">
                <span>
                  <MessageCircleWarning size={22} />
                </span>
              </div>
              <h3 className="font-bold text-red-600 text-xl">
                Submit Grievance
              </h3>
              <p>Reoprt society concerns</p>
              {/* <button className='border-none bg-red-800 rounded-lg p-2 font-bold text-white mt-4'>Submit</button> */}
            </div>
            <div className="bg-purple-300 border py-10 rounded-xl border-purple-200 text-center p-6 hover:scale-105 cursor-pointer transition">
              <div className="mx-auto h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center mb-4">
                <span>
                  <MegaphoneIcon size={22} />
                </span>
              </div>
              <h3 className="text-purple-600 font-bold text-xl">
                Annoucements
              </h3>
              <p>Society latest update</p>
              {/* <button className='border-none bg-purple-800 font-bold p-2 mt-4 text-white rounded-lg'>Check</button> */}
            </div>
            <div
              className="bg-yellow-300 border py-10 border-yellow-200 hover:scale-105 cursor-pointer transition rounded-xl p-6 text-center"
              onClick={() => navigate("/members")}
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center">
                <span>
                  <UserPlus size={22} />
                </span>
              </div>
              <h3 className="text-yellow-700 font-bold text-xl">
                Society Members
              </h3>
              <p>Find & contact Society Members</p>
              {/* <button className='border-none bg-yellow-800 font-bold p-2 mt-4 text-white rounded-lg'>Search</button> */}
            </div>
            <div className="bg-pink-300 border py-10 border-pink-200 rounded-xl text-center p-6 hover:scale-105 cursor-pointer transition">
              <div className="mx-auto h-12 w-12 rounded-full bg-pink-200 flex items-center justify-center">
                <span>
                  <Building2 size={22} />
                </span>
              </div>
              <h3 className="text-pink-600 font-bold text-2xl">
                Book Amenities
              </h3>
              <p>Reserve common areas</p>
              {/* <button className='border-none rounded-lg bg-pink-800 font-bold text-white p-2 mt-4'>Book</button> */}
            </div>
            <div className="bg-cyan-300 border py-10 border-cyan-200 rounded-xl p-6 text-center hover:scale-105 cursor-pointer transition">
              <div className="mx-auto bg-cyan-200 h-12 w-12 rounded-full flex items-center justify-center">
                <span>
                  <FileText size={22} />
                </span>
              </div>
              <h3 className="text-cyan-700 font-bold text-2xl">Documents</h3>
              <p>Search society documents</p>
              {/* <button className='border-none rounded-lg p-2 bg-cyan-800 text-white font-bold mt-4'>Find</button> */}
            </div>
            {role === 'admin' &&
              <>
                <Link to='/admin/apartments'><div className='bg-violet-300 border py-10 border-cyan-200 rounded-xl p-6 text-center hover:scale-105 cursor-pointer transition'>
                  <div className='mx-auto bg-violet-200 h-12 w-12 rounded-full flex items-center justify-center'>
                    <span><FileText size={22} /></span>
                  </div>
                  <h3 className='text-violet-700 font-bold text-2xl'>View Apartments</h3>
                  <p>View apartments, flats and room</p>
                </div>
                </Link>
                <Link to='/registerResident'><div className='bg-violet-300 border py-10 border-cyan-200 rounded-xl p-6 text-center hover:scale-105 cursor-pointer transition'>
                  <div className='mx-auto bg-violet-200 h-12 w-12 rounded-full flex items-center justify-center'>
                    <span><FileText size={22} /></span>
                  </div>
                  <h3 className='text-violet-700 font-bold text-2xl'>Register Resident</h3>
                  <p>Register a new Resident</p>
                </div>
                </Link>
                <Link to='/admin/residents'><div className='bg-violet-300 border py-10 border-cyan-200 rounded-xl p-6 text-center hover:scale-105 cursor-pointer transition'>
                  <div className='mx-auto bg-violet-200 h-12 w-12 rounded-full flex items-center justify-center'>
                    <span><Users size={22} /></span>
                  </div>
                  <h3 className='text-violet-700 font-bold text-2xl'>View Residents</h3>
                  <p>View and manage residents</p>
                </div>
                </Link>
              </>
            }
          </div>
        </div>

      </main>
    </>
  )
}

export default Dashboard;
