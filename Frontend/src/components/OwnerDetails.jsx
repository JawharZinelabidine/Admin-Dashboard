import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "../services/axiosInterceptor";

function RestaurantDetails() {
    const { ownerId } = useSelector(state => state.owner);
    console.log(ownerId)
    const [owner, setOwner] = useState({})
    console.log(owner)

    const fetchOwner = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/admin/owner/${ownerId}`);
            setOwner(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOwner();
    }, []);

    return (
        <div className="max-w-[800px] p-[20px] overflow-y-auto max-h-screen relative flex flex-col space-y-[20px] text-gray-700 bg-white shadow-md w-10/12 rounded-xl bg-clip-border">
        
            <h6 className="text-lg font-semibold ">Personal ID </h6>
            <div className="flex-1  text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 max-h-80">
                <img src={owner.personalID} className='w-full h-80 shadow-lg rounded-xl shadow-blue-gray-500/40' />
            </div>
       
            <h6 className="text-lg font-semibold ">Tax Declaration </h6>
            <div className="flex-1  text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 max-h-80 ">
                <img src={owner.tax_declaration} className='w-full h-80 shadow-lg rounded-xl shadow-blue-gray-500/40' />
            </div>
     
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">Full Name: {owner.fullname}</h5>

            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">Email: {owner.email}</h5>

        </div>
    )
}

export default RestaurantDetails
