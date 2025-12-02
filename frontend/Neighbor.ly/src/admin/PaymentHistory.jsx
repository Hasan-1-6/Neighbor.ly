import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [residentId, setResidentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPaymentHistory = async () => {
    setIsLoading(true);
    try {
      const url = residentId
        ? `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/payment-history?userId=${residentId}`
        : `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/payment-history`;

      const resp = await fetch(url, {
        credentials: 'include',
        method: 'GET',
      });

      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message);
        return;
      }
      setPaymentHistory(data);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <div className='relative w-full flex-1 h-full md:p-6 text-sm md:text-base'>
      <div className="container mx-auto p-4">
        <h1 className='text-2xl text-center font-bold mb-6'>Payment History</h1>

        <div className='flex justify-center items-center gap-4 mb-4'>
          <input
            type='text'
            name='residentId'
            placeholder='Resident ID'
            value={residentId}
            onChange={(e) => setResidentId(e.target.value)}
            className='border p-2 rounded w-full max-w-xs'
          />
          <button
            onClick={fetchPaymentHistory}
            className='p-2 bg-blue-500 rounded-xl text-white font-bold flex items-center cursor-pointer active:scale-95 justify-center'
            disabled={isLoading}
          >
            <Search />
            <span className="ml-2">{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-400 text-left rounded-lg overflow-hidden'>
            <thead className='bg-green-400 text-white'>
              <tr>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Transaction ID
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Resident ID
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.transactionId}>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {payment.transactionId}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {payment.userId}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    ₹{payment.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
