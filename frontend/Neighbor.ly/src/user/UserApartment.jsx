import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const UserApartment = () => {

  const [apartmentData, setApartmentData] = useState([])

  useEffect(() =>{
      const getAparts = async() =>{
       try{
        const resp = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewAparts`,
          {
            credentials : "include",
            method : "GET"
          })
          if(!resp.ok){
            toast.error(`Error : ${resp.status}`)
            return;
          }
          const data = await resp.json();
          setApartmentData(data);
       }catch(err){
        toast.error(`Error : ${err.message}`)
       }
      }
      getAparts();
      
    }
    ,[])

  return (
    <div className='relative w-full flex-1 min-h-screen pt-20 md:p-6 text-sm md:text-base'>
      
      <h1 className='text-2xl text-center font-bold mb-6'>Apartments</h1>

      <div className='flex w-full'>
        <table className='w-full border border-gray-400 text-left rounded-lg overflow-hidden'>
          <thead className='bg-green-400 text-white'>
            <tr>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Apartment</th>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Floor</th>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Room</th>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>occupied</th>
            </tr>
          </thead>

          <tbody>
            {apartmentData && apartmentData.map((item, index) => (
              <tr key={index}>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>{item.apartId}</td>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>{item.FloorCount}</td>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>{item.FlatCount}</td>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  {item.occupied}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UserApartment
