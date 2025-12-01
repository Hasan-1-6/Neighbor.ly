import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../App";
import Modal from "../shared/Modal";

const AdminGrievances = () => {
  const { user } = useContext(AppContext);
  const [grievances, setGrievances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    status: "",
    resolutionTime: "",
    cost: "",
  });

  const fetchGrievances = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/notifications/grievances`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        setGrievances(data);
      }
    } catch (error) {
      toast.error("Failed to fetch grievances");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleDetailsClick = (grievance) => {
    setSelectedGrievance(grievance);
    setUpdateFormData({
      status: grievance.status,
      resolutionTime: grievance.resolutionTime || "",
      cost: grievance.cost || "",
    });
    setIsModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;

    const updateData = {
      ...updateFormData,
      handledBy: user.name,
    };

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/notifications/${
          selectedGrievance.ticketId
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updateData),
        }
      );

      if (resp.ok) {
        toast.success("Grievance updated successfully!");
        setIsModalOpen(false);
        fetchGrievances();
      } else {
        const errorData = await resp.json();
        toast.error(errorData.message || "Failed to update grievance.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4 text-center">Active Tickets</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grievances.map((grievance) => (
            <div
              key={grievance.ticketId}
              className={`bg-white p-6 rounded-lg shadow-md flex ${grievance.status == "in-progress" ? "border-t-blue-600" : "border-t-red-600"} border-t-4 flex-col justify-between`}
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{grievance.title}</h2>
                <p className="text-gray-700 mb-4">{grievance.description}</p>
                <div className="text-sm text-gray-500">
                  <p>
                    <span className="font-semibold">Apartment:</span>{" "}
                    {grievance.apart}
                  </p>
                  <p>
                    <span className="font-semibold">Floor:</span> {grievance.floor}
                  </p>
                  <p>
                    <span className="font-semibold">Flat:</span> {grievance.flat}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {grievance.status}
                  </p>
                  <p>
                    <span className="font-semibold">Created By:</span>{" "}
                    {grievance.createdBy}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(grievance.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDetailsClick(grievance)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedGrievance && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            Update Grievance: {selectedGrievance.title}
          </h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={updateFormData.status}
                  onChange={handleUpdateChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="active">Active</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label htmlFor="resolutionTime" className="block font-medium">
                  Resolution Time (in hours)
                </label>
                <input
                  type="number"
                  id="resolutionTime"
                  name="resolutionTime"
                  value={updateFormData.resolutionTime}
                  onChange={handleUpdateChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="cost" className="block font-medium">
                  Cost
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={updateFormData.cost}
                  onChange={handleUpdateChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminGrievances;
