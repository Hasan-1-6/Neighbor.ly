import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/notifications/getNotifHistory`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        setNotifications(data);
      }
    } catch (error) {
      toast.error("Failed to fetch notifications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Notification History</h1>
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left">Ticket ID</th>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Created By</th>
                <th className="py-2 px-4 border-b text-left">Handled By</th>
                <th className="py-2 px-4 border-b text-left">Resolved At</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.ticketId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{notification.ticketId}</td>
                  <td className="py-2 px-4 border-b">{notification.title}</td>
                  <td className="py-2 px-4 border-b">{notification.status}</td>
                  <td className="py-2 px-4 border-b">{notification.createdBy}</td>
                  <td className="py-2 px-4 border-b truncate">
                    {notification.handledBy || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {notification.resolutionTime
                      ? new Date(
                          new Date(notification.createdAt).getTime() +
                            notification.resolutionTime * 60 * 60 * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
