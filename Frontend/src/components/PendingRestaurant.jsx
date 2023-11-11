import React from 'react'

function PendingRestaurant({ restaurant }) {
    return (
        <>
            <span className="text-gray-600">{restaurant.name}</span>
            <span className="ml-auto font-semibold">{restaurant.owner.fullname}</span>
            {/* <button class="ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Accept
            </button>
            <button class="ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Decline
            </button> */}
        </>
    )
}

export default PendingRestaurant
