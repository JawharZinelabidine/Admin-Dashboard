import React from 'react';

function PendingRestaurant({ restaurant }) {

    const handleRestaurantClick = () => {
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
