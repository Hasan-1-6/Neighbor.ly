import React, { useEffect, useState } from 'react';
import { Trash, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewResidents = () => {
  const [residents, setResidents] = useState([]);
  const [filters, setFilters] = useState({
    residentId: '',
    apart: '',
    floor: '',
    flat: '',
  });

  const fetchResidents = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      console.log(queryParams)
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewResidents?${queryParams}`,
        {
          credentials: 'include',
          method: 'GET',
        }
      );
      const data = await resp.json()
      console.log(data);
      if (!resp.ok) {
        toast.error(data.message);
        return;
      }
      setResidents(data);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/deleteResident`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setResidents(residents.filter((resident) => resident.id !== id));
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
    <div className='relative w-full flex-1 min-h-screen pt-20 md:p-6 text-sm md:text-base'>
      <div className="container mx-auto p-4">
        <h1 className='text-2xl text-center font-bold mb-6'>View Residents</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4'>
          <input
            type='text'
            name='residentId'
            placeholder='Resident ID'
            value={filters.residentId}
            onChange={handleFilterChange}
            className='border p-2 rounded'
          />
          <input
            type='text'
            name='apart'
            placeholder='Apartment'
            value={filters.apart}
            onChange={handleFilterChange}
            className='border p-2 rounded'
          />
          <input
            type='number'
            name='floor'
            placeholder='Floor'
            value={filters.floor}
            onChange={handleFilterChange}
            className='border p-2 rounded'
          />
          <input
            type='number'
            name='flat'
            placeholder='Flat'
            value={filters.flat}
            onChange={handleFilterChange}
            className='border p-2 rounded'
          />
          <button
            onClick={handleSearch}
            className='p-2 bg-blue-500 rounded-xl text-white font-bold flex items-center cursor-pointer active:scale-95 justify-center'
          >
            <Search />
            <span className="ml-2">Search</span>
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
                  Contact
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
                <th className='border border-gray-400 px-2 py-2 w-16'>Delete</th>
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
                    {resident.contact}
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
                  <td className='border border-gray-400 px-2 py-2 w-16 pointer-cursor active:scale-95'>
                    <button
                      onClick={() => handleDelete(resident.id)}
                      className='text-red-600 hover:text-red-800'
                    >
                      <Trash size={22} />
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

export default ViewResidents;

