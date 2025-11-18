import React from 'react'
import { useState } from 'react'
const initialData = [
    { apartment: "A1", floor: 2, room: 204, available: true },
    { apartment: "A2", floor: 3, room: 305, available: false },
    { apartment: "B1", floor: 1, room: 101, available: true }
]


const UserApartment = () => {
    const [apartmentData, setApartmentData] = useState(initialData)

    const [showForm, setShowForm] = useState(false)

    const [formValues, setFormValues] = useState({
        apartment: "",
        floor: "",
        room: ""
    })
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
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Available</th>
            </tr>
          </thead>
          <tbody>
            {apartmentData.map((item, index) => (
              <tr key={index}>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>{item.apartment}</td>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>{item.floor}</td>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>{item.room}</td>
                <td className='border border-gray-400 px-2 py-2 md:px-4 md:py-3'>
                  {item.available ? "Yes" : "No"}
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