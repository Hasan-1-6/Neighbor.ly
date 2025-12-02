import { useState, useContext } from "react";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";

const CreateUserTicket = () => {
  const { user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      createdBy: user.id,
      status: "active",
      apart: user.apart,
      floor: user.floor,
      flat: user.flat,
      cost: 0,
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
      });
    } catch (err) {
      toast.error("An error occurred: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full flex-1 h-full md:p-6 text-sm md:text-base flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md mx-auto shadow-lg">
        <h1 className="text-2xl text-center font-bold mb-6">Raise a Ticket</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
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
          <div>
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
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserTicket;
