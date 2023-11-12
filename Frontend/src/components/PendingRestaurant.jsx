import React from 'react';
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurantId, setShowRestaurantDetails } from "../features/restaurantSlice";
import { setOwnerId, setShowOwnerDetails } from "../features/ownerSlice";

function PendingRestaurant({ restaurant }) {
    const dispatch = useDispatch();
    const { showRestaurantDetails } = useSelector(state => state.restaurant);
    const { showOwnerDetails } = useSelector(state => state.owner);
    const handleRestaurantClick = () => {
        dispatch(setRestaurantId(restaurant.id))
        dispatch(setShowRestaurantDetails(!showRestaurantDetails));
    };
    const handleOwnerClick = () => {
        dispatch(setOwnerId(restaurant.ownerId));
        dispatch(setShowOwnerDetails(!showOwnerDetails))
    };


    const handleAcceptClick = async () => {
        const decision = "approve"
        try {
            await axios.post(`http://localhost:3000/api/admin/restaurant/${restaurant.id}`, decision);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeclineClick = async () => {
        const decision = "decline"
        try {
            await axios.post(`http://localhost:3000/api/admin/restaurant/${restaurant.id}`, decision);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div>
                <span className="font-semibold uppercase text-xl" >
                    {restaurant.name}
                </span>
                <button onClick={handleRestaurantClick} className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    View Details
                </button>
            </div>

            <div className="ml-auto">
                <span className="ml-auto font-semibold uppercase text-xl" >
                    {restaurant.owner.fullname}
                </span>
                <button onClick={handleOwnerClick} className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    View Details
                </button>
            </div>

            <div className="ml-auto">
                <button onClick={handleAcceptClick} className="ml-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold  hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                    Accept
                </button>

                <button onClick={handleDeclineClick} className="ml-4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                    Decline
                </button>
            </div>
        </>
    );
}

export default PendingRestaurant;
