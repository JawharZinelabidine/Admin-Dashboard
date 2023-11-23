import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchPremiumRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurants/premium');
        if (response.status === 200) {
          setRestaurants(response.data);
        }
      } catch (error) {
        console.error('Error fetching premium restaurants:', error);
      }
    };

    fetchPremiumRestaurants();
  }, []);

  return (
    <div className="bg-gray-800 p-4 shadow-md rounded-md transition duration-300 ease-in-out transform">
      <h2 className="text-lg font-semibold mb-2 text-white">Payment History</h2>
      <div className="max-h-80 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Payment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="px-6 py-4 whitespace-nowrap">{restaurant.restaurantName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{restaurant.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{restaurant.paymentCreatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
