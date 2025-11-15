import React, { useState } from 'react'
import { Trash } from 'lucide-react'

const initialData = [
  { apartment: "A1", floor: 2, room: 204, available: true },
  { apartment: "A2", floor: 3, room: 305, available: false },
  { apartment: "B1", floor: 1, room: 101, available: true }
]

const AdminApartments = () => {

  const [apartmentData, setApartmentData] = useState(initialData)

  const [showForm, setShowForm] = useState(false)

  const [formValues, setFormValues] = useState({
    apartment: "",
    floor: "",
    room: ""
  })

  const handleDelete = (index) => {
    const updatedList = apartmentData.filter((_, i) => i !== index)
    setApartmentData(updatedList)
  }

  const handleAdd = (e) => {
    e.preventDefault()

    const newEntry = {
      apartment: formValues.apartment,
      floor: formValues.floor,
      room: formValues.room,
      available: true
    }

    setApartmentData([...apartmentData, newEntry])
    setFormValues({ apartment: "", floor: "", room: "" })
    setShowForm(false)
  }

  return (
    <div className='relative w-full flex-1 min-h-screen pt-20 md:p-6 text-sm md:text-base'>
      
      <h1 className='text-2xl text-center font-bold mb-6'>Apartments</h1>

     
      <div className="w-full flex justify-end mb-2">
        <button
          onClick={() => setShowForm(true)}
          className='p-2 bg-green-400 rounded-xl text-white font-bold'
        >
          Add
        </button>
      </div>

      
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Add Apartment</h2>

            <form onSubmit={handleAdd} className="flex flex-col gap-3">

              <input
                type="text"
                placeholder="Apartment (A1...)"
                value={formValues.apartment}
                onChange={(e) =>
                  setFormValues({ ...formValues, apartment: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Floor"
                value={formValues.floor}
                onChange={(e) =>
                  setFormValues({ ...formValues, floor: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Room"
                value={formValues.room}
                onChange={(e) =>
                  setFormValues({ ...formValues, room: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

   
      <div className='flex w-full'>
        <table className='w-full border border-gray-400 text-left rounded-lg overflow-hidden'>
          <thead className='bg-green-400 text-white'>
            <tr>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Apartment</th>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Floor</th>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Room</th>
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>Available</th>
              <th className='border border-gray-400 px-2 py-2 w-16'>Delete</th>
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

                <td className='border border-gray-400 px-2 py-2 w-16'>
                  <button
                    onClick={() => handleDelete(index)}
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
  )
}

export default AdminApartments
