import React from "react";
import { Mail, MapPin, PhoneCall, Users } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import loadingIcon from "../assets/loading.svg";

const AdminMembersList = () => {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // New state for popup visibility

  const handleAddAdminClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setLoading(true);
    const getAdminData = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/getAdmins`,
          {
            credentials: "include",
            method: "GET",
          },
        );
        if (!resp.ok) {
          toast.error(`Some error occured`);
        }
        const data = await resp.json();
        setAdminData(data);
      } catch (err) {
        toast.error(`Couldnt fetch list : ${err}`);
      } finally {
        setLoading(false);
      }
    };
    getAdminData();
  }, []);
  return (
    <>
      <main className="relative w-full h-screen  flex-1 sm:p-1 md:p-6">
        {loading && (
          <div className="h-full w-full absolute flex justify-center items-center">
            <img src={loadingIcon} alt="Loading icon" className="w-20" />
          </div>
        )}
        {showPopup && (
          <div className="h-full w-full absolute  flex justify-center items-start backdrop-blur-[2px] pt-10 md:pt-0 bg-opacity-50">
            <AddAdminPopup
              onClose={handleClosePopup}
              setAdminData={setAdminData}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row  p-4 md:p-6 justify-between items-center mb-10">
          <div className="flex items-center ">
            <Users className={`size-14 mr-5`} />
            <h1 className="font-bold text-3xl">
              Society Members
              <p className="text-sm font-semibold mt-2">
                Manage and view Society Members
              </p>
            </h1>
          </div>
          <button
            className="border-none cursor-pointer active:scale-95 transition bg-blue-600 font-bold p-2 rounded-lg text-white"
            onClick={handleAddAdminClick} // Attach handler here
          >
            Add Members
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-2 w-auto bg-blue-100 rounded-xl text-blue-800 font-bold">
            <h4 className="text-lg">Total Members</h4>
            <p>{adminData.length}</p>
          </div>
          <div className="p-2 w-auto bg-blue-100 rounded-xl  text-blue-800 font-bold">
            <h4 className="text-lg">Active Members</h4>
            <p>{adminData.length}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 ">
          {adminData &&
            adminData.map((admin, i) => (
              <AdminMember
                name={admin.name}
                role={admin.role}
                number={admin.contact}
                email={admin.email}
                key={i}
              />
            ))}
        </div>
      </main>
    </>
  );
};

function AdminMember(props) {
  const copyText = (elem) => {
    console.log("copying");
    navigator.clipboard.writeText(elem);
    toast.success("Copied");
  };
  return (
    <div className="p-3 border border-gray-300 bg-white rounded-xl flex flex-col justify-between h-full">
      <div className="flex gap-3 items-start">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(props.name)}&background=0D8ABC&color=fff&bold=true`}
          alt="User Avatar"
          className="rounded-full h-15 w-15 flex-shrink-0"
        ></img>
        <div className="flex flex-col flex-grow min-w-0 items-start">
          <b className="font-semibold truncate w-full">{props.name}</b>

          <div className="mt-2">
            <span className=" bg-green-700 p-1 px-2 font-medium rounded-full whitespace-nowrap text-white text-sm">
              {props.role}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4  flex gap-2 flex-wrap w-full justify-around">
        <button
          className="flex bg-gray-200 items-center justify-between cursor-pointer transition px-3 py-1.5 space-x-1 rounded-lg w-full hover:bg-gray-300"
          onClick={() => copyText(props.number)}
        >
          <span>
            <PhoneCall size={16} />
          </span>
          <span>{props.number}</span>
        </button>
        <button
          className="flex bg-gray-200 items-center justify-between  transition px-3 py-1.5 space-x-1 text-sm rounded-lg hover:bg-gray-300 cursor-pointer w-full"
          onClick={() => copyText(props.email)}
        >
          <span>
            <Mail size={16} />
          </span>
          <span className="truncate">{props.email}</span>
        </button>
      </div>
    </div>
  );
}

function AddAdminPopup({ onClose, setAdminData }) {
  const [formData, setFormData] = useState({
    password: "",
    name: "",
    role: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    if (formData.contact.length < 10) {
      toast.error("Enter a valid contact number");
      return;
    }

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/registerAdmin`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            password: formData.password,
            email: formData.email,
            contact: formData.contact,
            role: formData.role,
          }),
        },
      );
      if (!resp.ok) {
        toast.error(`Some error occured!! Please try again later`);
        return;
      }
      const newAdmin = await resp.json();

      setAdminData((prev) => [...prev, newAdmin]);
    } catch (err) {
      toast.error(`Couldnt add new admin : ${err}`);
    }

    toast.success("New admin added !!");
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-gray-500 w-96">
      <h2 className="text-2xl font-bold mb-4">Add New Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contact"
          >
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="role"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Admin
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminMembersList;
