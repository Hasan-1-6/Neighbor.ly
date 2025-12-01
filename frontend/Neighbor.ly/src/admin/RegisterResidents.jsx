import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const RegisterResidents = () => {

    const [apartments, setApartments] = useState([]);
    const [floors, setFloors] = useState([]);
    const [flats, setFlats] = useState([]);

    const [selectedApartment, setSelectedApartment] = useState("");
    const [selectedFloor, setSelectedFloor] = useState({ id: "", floorNum: "" });
    const [selectedFlat, setSelectedFlat] = useState({ id: "", flatNum: "" });

    const [residentDetails, setResidentDetails] = useState({
        owner: "",
        contact: "",
        password: "",
        aadhar: ""
    });

    const [genId, setGenId] = useState('')
    const [showPopup, setShowPopup] = useState(false);

    // -------------------------------
    // INITIAL APARTMENT FETCH
    // -------------------------------
    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const resp = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewAparts`,
                    { credentials: "include" }
                );
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                setApartments(data);
            } catch (err) {
                toast.error("Failed to load apartments");
            }
        };
        fetchApartments();
    }, []);

    // -------------------------------
    // FETCH FLOORS WHEN APARTMENT CHANGES
    // -------------------------------
    useEffect(() => {
        if (!selectedApartment) return;

        const fetchFloors = async () => {
            try {
                const resp = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewFloors`,
                    {
                        credentials: "include",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ apartId: selectedApartment })
                    }
                );
                const data = await resp.json();
                if (!resp.ok){
                    toast.error("error occured " +  resp.status);
                    return;
                }
                
                setFloors(data);
            } catch (err) {
                toast.error("Failed to load floors " + err);
                return;
            }
        };

        // reset floor + flat
        setSelectedFloor({ id: "", floorNum: "" });
        setFloors([]);
        setSelectedFlat({ id: "", flatNum: "" });
        setFlats([]);

        fetchFloors();
    }, [selectedApartment]);

    // -------------------------------
    // FETCH FLATS WHEN FLOOR CHANGES
    // -------------------------------
    useEffect(() => {
        if (!selectedFloor.id) return;

        const fetchFlats = async () => {
            try {
                const resp = await fetch(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewFlats`,
                    {
                        credentials: "include",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ f_id: selectedFloor.id })
                    }
                );
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                setFlats(data);
            } catch (err) {
                toast.error(err.message);
            }
        };

        setSelectedFlat({ id: "", flatNum: "" });
        fetchFlats();
    }, [selectedFloor]);

    // -------------------------------
    // SELECT HANDLERS
    // -------------------------------
    const handleApartmentChange = (e) => {
        setSelectedApartment(e.target.value);
    };

    const handleFloorChange = (e) => {
        const option = e.target.selectedOptions[0];
        setSelectedFloor({
            id: option.dataset.id,
            floorNum: option.value,
        });
    };

    const handleFlatChange = (e) => {
        const option = e.target.selectedOptions[0];
        setSelectedFlat({
            id: option.dataset.id,
            flatNum: option.value,
        });
    };

    const handleResidentDetailsChange = (e) => {
        const { name, value } = e.target;
        setResidentDetails(prev => ({ ...prev, [name]: value }));
    };

    // -------------------------------
    // SUBMIT FORM
    // -------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedApartment || !selectedFloor.id || !selectedFlat.id) {
            toast.error("Please choose apartment, floor, and flat");
            return;
        }

        try {
            const resp = await fetch(
                `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/registerUser`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...residentDetails,
                        apart: selectedApartment,
                        floorNum: selectedFloor.floorNum,
                        flatNum: selectedFlat.flatNum,
                        floorId: selectedFloor.id,
                        flatId: selectedFlat.id,
                    }),
                }
            );
            const data = await resp.json();
            if (!resp.ok){
                toast.error(data.message);
                return;
            }
            
            console.log(data);
            setGenId(data.id);
            setShowPopup(true);
            toast.success("Resident registered successfully!");
            
            setFloors([]);
            setFlats([]);
            setSelectedApartment("");
            setSelectedFloor({ id: "", floorNum: "" });
            setSelectedFlat({ id: "", flatNum: "" })

        } catch (err) {
            
            toast.error("Error occured" + err.message);
        }
    };

    return (
        <>
        {showPopup && <ShowRegistered setShowPopup={setShowPopup} id={genId} password = {residentDetails.password} />}
        <div className="relative w-full flex-1 min-h-screen pt-20 md:p-6 text-sm md:text-base">
            <h1 className="text-2xl text-center font-bold mb-6">Register Resident</h1>

            <div className="bg-white p-6 rounded-xl w-full max-w-md mx-auto shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {/* APARTMENT SELECT */}
                    <div>
                        <label>Apartment:</label>
                        <select
                            value={selectedApartment}
                            onChange={handleApartmentChange}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select Apartment</option>
                            {apartments.map(ap => (
                                <option key={ap.id} value={ap.apartId}>
                                    {ap.apartId}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* FLOOR SELECT */}
                    <div>
                        <label>Floor:</label>
                        <select
                            value={selectedFloor.floorNum}
                            onChange={handleFloorChange}
                            disabled={!selectedApartment}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select Floor</option>
                            {floors.map(f => (
                                <option key={f.id} data-id={f.id} value={f.floorNum}>
                                    {f.floorNum/10}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* FLAT SELECT */}
                    <div>
                        <label>Flat:</label>
                        <select
                            value={selectedFlat.flatNum}
                            onChange={handleFlatChange}
                            disabled={!selectedFloor.id}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select Flat</option>
                            {flats.map(fl => (
                                <option key={fl.id} data-id={fl.id} value={fl.flatNum}>
                                    {fl.flatNum}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* OWNER */}
                    <input
                        type="text"
                        name="owner"
                        placeholder="Owner Name"
                        value={residentDetails.owner}
                        onChange={handleResidentDetailsChange}
                        className="border p-2 rounded w-full"
                    />

                    {/* CONTACT */}
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={residentDetails.contact}
                        onChange={handleResidentDetailsChange}
                        className="border p-2 rounded w-full"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={residentDetails.password}
                        onChange={handleResidentDetailsChange}
                        className="border p-2 rounded w-full"
                    />

                    {/* AADHAR */}
                    <input
                        type="text"
                        name="aadhar"
                        placeholder="Aadhar Number"
                        value={residentDetails.aadhar}
                        onChange={handleResidentDetailsChange}
                        className="border p-2 rounded w-full"
                    />

                    <button className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded">
                        Register Resident
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default RegisterResidents;

function ShowRegistered({setShowPopup, id, password}){
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={ () => setShowPopup(false)}>
                <div className="bg-white p-6 rounded-xl w-80 shadow-lg flex flex-col items-center" 
                onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-xl font-bold mb-4">Registered Succesfully !!</h2>
                    <div className='w-[90%] bg-gray-100 rounded-lg font-bold p-2 cursor-pointer flex justify-between px-4 border'>
                        <span>
                            ID  
                        </span>
                        <span className='text-gray-800'>
                            {id}
                        </span>
                    </div>
                    <div className='w-[90%] mt-4 bg-gray-100 rounded-lg font-bold p-2 cursor-pointer flex justify-between px-4 border'>
                        <span>
                            PW  
                        </span>
                        <span className='text-gray-800'>
                            {password}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
