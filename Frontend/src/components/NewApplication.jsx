import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import PendingRestaurant from './PendingRestaurant';
import RestaurantDetails from './RestaurantDetails';
import OwnerDetails from "./OwnerDetails"
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurantId, setShowRestaurantDetails } from "../features/restaurantSlice";
import { setOwnerId, setShowOwnerDetails } from "../features/ownerSlice"

function NewApplication() {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const { showRestaurantDetails } = useSelector(state => state.restaurant);
  const { showOwnerDetails } = useSelector(state => state.owner);
  const handleClick = () => {
    if (showRestaurantDetails) {
      dispatch(setRestaurantId(null))
      dispatch(setShowRestaurantDetails(!showRestaurantDetails));
    }
    if (showOwnerDetails) {
      dispatch(setOwnerId(null))
      dispatch(setShowOwnerDetails(!showOwnerDetails));
    }
  };

  const fetchRestaurants = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/admin/restaurants");
      setRestaurants(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);
  return (
    <>
      < Navbar />
      <div className="flex-grow min-h-screen text-white bg-gray-900 w-full">
        <main className="p-6  space-y-28" >
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between ">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Restaurants statistiques</h2>
            </div>
          </div>
          <section className="flex flex-col row-span-3 bg-gray-800 shadow-lg rounded-lg">
            <div className="row-span-3 bg-gray-800 shadow-lg rounded-lg">
              <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                <span>Restaurants applications</span>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
                <ul className="p-6 space-y-6">
                  {restaurants.map(restaurant => (
                    <li className="flex" key={restaurant.id}> < PendingRestaurant restaurant={restaurant} fetchRestaurants={fetchRestaurants} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
        {showRestaurantDetails && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-800 bg-opacity-75 absolute inset-0" />
            <RestaurantDetails />
            <button
              className="absolute top-0 right-0 p-4 cursor-pointer"
              onClick={handleClick}
            >
              Close
            </button>
          </div>
        )}
        {showOwnerDetails && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-gray-800 bg-opacity-75 absolute inset-0" />
            <OwnerDetails />
            <button
              className="absolute top-0 right-0 p-4 cursor-pointer"
              onClick={handleClick}
            >
              Close
            </button>
          </div>
        )}
      </div >
    </>
  );
}

export default NewApplication;

