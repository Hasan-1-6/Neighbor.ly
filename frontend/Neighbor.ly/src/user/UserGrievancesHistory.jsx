import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UserGrievancesHistory = () => {
  const [grievances, setGrievances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGrievances = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/grievances/all`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        setGrievances(data);
        console.log(data)
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

  const getStatusBorderClass = (status) => {
    switch (status) {
      case "active":
        return "border-t-red-600";
      case "in-progress":
        return "border-t-blue-600";
      case "resolved":
        return "border-t-green-600";
      default:
        return "border-t-gray-400";
    }
  };

  return (
    <div className="container mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4 text-center">My Complaints</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grievances.map((grievance) => (
            <div
              key={grievance.ticketId}
              className={`bg-white p-6 rounded-lg shadow-md flex ${getStatusBorderClass(grievance.status)} border-t-4 flex-col justify-between`}
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{grievance.title}</h2>
                <p className="text-gray-700 mb-4">{grievance.description}</p>
                <div className="text-sm text-gray-500">
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {grievance.status}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(grievance.createdAt).toLocaleDateString()}
                  </p>
                   {grievance.status === "resolved" && (
                     <p>
                       <span className="font-semibold">Handled By:</span>{" "}
                       {grievance.handledBy}
                     </p>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGrievancesHistory;
