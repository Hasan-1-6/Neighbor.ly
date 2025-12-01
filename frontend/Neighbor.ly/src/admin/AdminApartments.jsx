import React, { useEffect, useState } from 'react'
import { CreditCard, Trash } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminApartments = () => {

  const [apartmentData, setApartmentData] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [formValues, setFormValues] = useState({
    floor: "",
    room: ""
  })

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

  const handleDelete = async (index, id, apart) => {
    console.log(id + 'thas id, this apart' + apart);
    try{
      const resp = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/deleteApart`,
        {
          credentials : "include",
          method : "POST",
          headers : {
            "Content-type" : 'application/json',
          },
          body : JSON.stringify({
            apartName : apart,
            id : id,
          })
        }
      )
      const data = await resp.json();
      if(!resp.ok){
        toast.error(data.message)
        return;
      }
      const updatedList = apartmentData.filter((_, i) => i !== index)
      setApartmentData(updatedList)
    }
    catch(err){
      toast.error(`Error : ${err.message}`);
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    let newData;
    try{
      const resp = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/createApart`,
          {
            credentials: "include",
            method: "POST",
            headers : {
              'Content-type' : "application/json"
            },
            body : JSON.stringify({
              floors : formValues.floor,
              flats : formValues.room
            }) 
          },
        );
        if(!resp.ok){
          toast.error(`Error : Resp wasnt okay`)
          return;
        }
        newData = await resp.json();
        console.log(newData)
    }catch(err){
      toast.error(`Error : ${err.message}`)
    }
    finally{
      setFormValues({floor: "", room: "" })
      setShowForm(false)
    }

    if(newData != null) setApartmentData([...apartmentData, newData])
      console.log(apartmentData)
    
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

              {/* <input
                type="text"
                placeholder="Apartment (A1...)"
                value={formValues.apartment}
                onChange={(e) =>
                  setFormValues({ ...formValues, apartment: e.target.value })
                }
                className="border p-2 rounded"
                required
              /> */}

              <input
                type="number"
                placeholder="Floor"
                value={formValues.floor}
                onChange={(e) =>
                  setFormValues({ ...formValues, floor: e.target.value })
                }
                min='1'
                max='20'
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Room"
                value={formValues.flat}
                onChange={(e) =>
                  setFormValues({ ...formValues, room: e.target.value })
                }
                min='1'
                max='20'
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
              <th className='border border-gray-400 px-2 py-2 md:px-4 md:py-3 text-xs md:text-sm'>occupied</th>
              <th className='border border-gray-400 px-2 py-2 w-16'>Delete</th>
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

                <td className='border border-gray-400 px-2 py-2 w-16'>
                  <button
                    onClick={() => handleDelete(index, item.id, item.apartId)}
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
