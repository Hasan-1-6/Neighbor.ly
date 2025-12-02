import { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";

const PayRent = () => {
  const { user, setUser } = useContext(AppContext);
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const fetchPaymentHistory = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/payment-history`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        setPaymentHistory(data);
      }
    } catch (error) {
      toast.error("Failed to fetch payment history");
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ amount: parseInt(amount) }),
        }
      );

      if (!resp.ok) {
        const errorData = await resp.json();
        toast.error(errorData.message || "Failed to make payment.");
        return;
      }

      const { updatedUser } = await resp.json();
      setUser(updatedUser);
      toast.success("Payment successful!");
      setAmount("");
      fetchPaymentHistory(); // Refresh payment history
    } catch (err) {
      toast.error("An error occurred: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Pay Rent</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Due Rent: ₹{user.dueRent}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label htmlFor="amount" className="block font-medium">
              Amount to Pay
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-md p-2"
              max={user.dueRent}
              min="1"
              required
              disabled={user.dueRent === 0}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading || user.dueRent === 0}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Transaction ID</th>
                <th className="py-2 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.transactionId}>
                  <td className="py-2 px-4 border-b text-center">{payment.transactionId}</td>
                  <td className="py-2 px-4 border-b text-center">₹{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayRent;
