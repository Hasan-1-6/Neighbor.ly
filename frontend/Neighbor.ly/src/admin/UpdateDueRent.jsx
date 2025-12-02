import React, { useState, useEffect } from 'react';
import { Search, Edit, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

const UpdateDueRent = () => {
  const [residents, setResidents] = useState([]);
  const [filters, setFilters] = useState({
    residentId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchResidents = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewResidents${filters.residentId ? `?${queryParams}` : ''}`;
      const resp = await fetch(
        url,
        {
          credentials: 'include',
          method: 'GET',
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message);
        setResidents([]);
      } else {
        setResidents(data);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []); // Empty dependency array means this runs once on mount

  const handleUpdateRent = async (residentId) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/update-due-rent`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ residentId }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message);
        return;
      }
      toast.success('Due rent updated successfully!');
      // Refresh the resident data
      fetchResidents();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchResidents();
  };

  return (
    <div className='relative w-full flex-1 h-full md:p-6 text-sm md:text-base'>
      <div className="container mx-auto p-4">
        <h1 className='text-2xl text-center font-bold mb-6'>Update Rent</h1>

        <div className='flex justify-center items-center gap-4 mb-4'>
          <input
            type='text'
            name='residentId'
            placeholder='Resident ID'
            value={filters.residentId}
            onChange={handleFilterChange}
            className='border p-2 rounded w-full max-w-xs'
          />
          <button
            onClick={handleSearch}
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
                  Resident ID
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Owner
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Apartment
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Floor
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Flat
                </th>
                <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  Due Rent
                </th>
                <th className='border border-gray-400 px-2 py-2 w-16'>Update</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id}>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {resident.id}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {resident.owner}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {resident.apart}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {resident.floor}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    {resident.flat}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                    ₹{resident.dueRent}
                  </td>
                  <td className='border border-gray-400 px-2 py-2 w-16 pointer-cursor active:scale-95'>
                    <button
                      onClick={() => handleUpdateRent(resident.id)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      <IndianRupee size={22} />
                    </button>
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

export default UpdateDueRent;
