import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import customAxios from "../services/axiosInterceptor";

const BannedRestaurant = () => {
  const [bannedRestaurants, setBannedRestaurants] = useState([]);
  

  const fetchBannedRestaurants = async () => {
    try {
      const response = await customAxios.get(
        "http://localhost:3000/api/restaurants/ban"
      );
      setBannedRestaurants(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching banned restaurants:", error);
    }
  };
  useEffect(() => {
    fetchBannedRestaurants();
  }, []);

  const handleUnbanRestaurant = async (id) => {
    try {
  
      await customAxios.post(`http://localhost:3000/api/restaurants/${id}`);
      
      setBannedRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="flex-grow min-h-screen text-white bg-gray-900 w-full">
      <Navbar />
      <main className="p-6 space-y-28">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between"></div>
        <section className="flex flex-col row-span-3 bg-gray-800 shadow-lg rounded-lg">
          <div className="row-span-3 bg-gray-800 shadow-lg rounded-lg">
            <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
              <span>Ban List History</span>
            </div>
  
            <div className="p-6">
              {bannedRestaurants.length > 0 ? (
                bannedRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-full"
                      onClick={() => handleUnbanRestaurant(restaurant.id)}
                    >
                      Unban
                    </button>
                  </div>
                ))
              ) : (
                <p>No banned restaurants found.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  </>
  
  );
};

export default BannedRestaurant;
