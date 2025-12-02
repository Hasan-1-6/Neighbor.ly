import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UserGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGrievances = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/grievances/active`,
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
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

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
              className={`bg-white p-6 rounded-lg shadow-md flex ${
                grievance.status === "in-progress" ? "border-t-blue-600" : "border-t-red-600"
              } border-t-4 flex-col justify-between`}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGrievances;
