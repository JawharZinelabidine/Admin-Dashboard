import React from 'react';

const Summary = ({
  numberOfRestaurants,
  numberOfReviews,
  totalReservations,
  numberOfBannedRestaurants,
  premiumCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-800 rounded-md p-4 shadow-md">
     
      <div className="bg-gray-700 hover:bg-gray-600 rounded-md p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 text-white">Restaurants</h3>
        <p className="text-xl text-white">{numberOfRestaurants}</p>
      </div>

     
      <div className="bg-gray-700 hover:bg-gray-600 rounded-md p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 text-white">Reviews</h3>
        <p className="text-xl text-white">{numberOfReviews}</p>
      </div>

    
      <div className="bg-gray-700 hover:bg-gray-600 rounded-md p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 text-white">Banned Restaurants</h3>
        <p className="text-xl text-white">{numberOfBannedRestaurants}</p>
      </div>

    
      <div className="bg-gray-700 hover:bg-gray-600 rounded-md p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 text-white">Premium Restaurants</h3>
        <p className="text-xl text-white">{premiumCount}</p>
      </div>

      <div className="bg-gray-700 hover:bg-gray-600 rounded-md p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 text-white">Reservations</h3>
        <p className="text-xl text-white">{totalReservations}</p>
      </div>
    </div>
  );
};

export default Summary;
