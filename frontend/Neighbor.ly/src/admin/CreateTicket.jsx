import { useState, useContext } from "react";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";

const CreateTicket = () => {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    apart: "",
    floor: "",
    flat: "",
    status: "in-progress",
    resolutionTime: "",
    cost: "0",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const ticketData = {
      ...formData,
      createdBy: user.name,
      handledBy: user.name,
      cost: parseInt(formData.cost),
      floor: parseInt(formData.floor),
      flat: parseInt(formData.flat),
      resolutionTime: parseInt(formData.resolutionTime),
    };

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/notifications/createTicket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(ticketData),
        }
      );

      if (!resp.ok) {
        const errorData = await resp.json();
        toast.error(errorData.message || "Failed to create ticket.");
        return;
      }

      toast.success("Ticket created successfully!");
      setFormData({
        title: "",
        description: "",
        apart: "",
        floor: "",
        flat: "",
        status: "in-progress",
        resolutionTime: "",
        cost: "",
      });
    } catch (err) {
      toast.error("An error occurred: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Create a New Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="apart" className="block font-medium">
              Apartment
            </label>
            <input
              type="text"
              id="apart"
              name="apart"
              value={formData.apart}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="floor" className="block font-medium">
              Floor
            </label>
            <input
              type="number"
              id="floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label htmlFor="flat" className="block font-medium">
              Flat
            </label>
            <input
              type="number"
              id="flat"
              name="flat"
              value={formData.flat}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="status" className="block font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="resolutionTime" className="block font-medium">
              Resolution Time (in hours)
            </label>
            <input
              type="number"
              id="resolutionTime"
              name="resolutionTime"
              value={formData.resolutionTime}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label htmlFor="cost" className="block font-medium">
              Cost
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
