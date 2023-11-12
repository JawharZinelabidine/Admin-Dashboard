import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurantId, setShowRestaurantDetails } from "../features/restaurantSlice";

function PendingRestaurant({ restaurant }) {
    const dispatch = useDispatch();
    const { showRestaurantDetails } = useSelector(state => state.restaurant);
    const handleRestaurantClick = () => {
        dispatch(setRestaurantId(restaurant.id))
        dispatch(setShowRestaurantDetails(!showRestaurantDetails));
    };

    return (
        <>
            <span className="text-gray-600" onClick={handleRestaurantClick} style={{ cursor: 'pointer' }}>
                {restaurant.name}
            </span>
            <span className="ml-auto font-semibold">{restaurant.owner.fullname}</span>

        </>
    );
}

export default PendingRestaurant;
