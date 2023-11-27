import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import customAxios from "../services/axiosInterceptor";
import startIcon from "../assets/img/star-icon.svg";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [sortValue, setSortValue] = useState("");

  const getRestaurants = async () => {
    try {
      const params = new URLSearchParams([["sortBy", sortValue]]);
      const { data } = await axios.get(
        "http://localhost:3000/api/restaurants",
        { params }
      );

      setRestaurants(data);

      const restaurantsWithOwners = await Promise.all(
        Array.isArray(data)
          ? data.map(async (restaurant) => {
            const ownerResponse = await axios.get(
              `http://localhost:3000/api/owners/${restaurant.ownerId}`
            );
            const owner = ownerResponse.data;
            return { ...restaurant, owner };
          })
          : []
      );

      setRestaurants(restaurantsWithOwners);
    } catch (error) {
      console.log(error);

      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear();
      }
    }
  };

  const toggleBanStatus = async (id, type) => {
    try {
      const response = await customAxios.post(
        `http://localhost:3000/api/restaurants/${type}/${id}`
      );

      if (response.status === 200) {
        getRestaurants();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBanRestaurant = async (id, isBanned) => {
    try {
      await toggleBanStatus(id, isBanned ? "unban" : "ban");

      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, isBanned: !isBanned }
          : restaurant
      );
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeReviews = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurants/reviews/${id}`
      );

      if (response.status === 200) {
        const fetchedReviews = response.data.reviews;
        setReviews(fetchedReviews);
        setSelectedRestaurant(id);
        toggleModal();
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    getRestaurants();
  }, [sortValue]);

  const handleSelect = (value) => {
    console.log("Selected sort:", value);
    setSortValue(value);
  };

  return (
    <>
      <Navbar />
      <div className="flex-grow min-h-screen text-white bg-gray-900 w-full">
        <div className="py-4 mr-2 flex items-center justify-end">
          <label className="mr-2">Sort by:</label>
          <select
            className="border border-gray-300 rounded-md bg-gray-800 text-white px-2 py-1"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="date_desc">Most Recent</option>
            <option value="date_asc">Oldest</option>
            <option value="rating_desc">Highest Rated</option>
            <option value="rating_asc">Lowest Rated</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white shadow-md rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">Restaurant Name</th>
                <th className="px-4 py-2 text-left">Owner Name</th>
                <th className="px-4 py-2 text-left">Owner Email</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-semibold">{restaurant.name}</span>
                        <div className="flex items-center ml-2">
                          <img
                            src={startIcon}
                            alt="Star Icon"
                            className="w-4 h-4 mr-1"
                          />
                          <span className="text-blue-500 text-xs font-semibold">
                            {restaurant.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <span className="text-blue-500">
                        <Link
                          to="#"
                          onClick={() => handleSeeReviews(restaurant.id)}
                        >
                          See Reviews
                        </Link>
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    {restaurant.owner ? restaurant.owner.fullname : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {restaurant.owner ? restaurant.owner.email : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-full border-none cursor-pointer"
                      onClick={() =>
                        handleBanRestaurant(restaurant.id, restaurant.isBanned)
                      }
                    >
                      {restaurant.isBanned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && selectedRestaurant && (
        <div className="modal-custom bg-gray-900 bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="modal-content-custom p-4 bg-white rounded-md w-80">
            {(reviews ?? []).length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="mb-4">
                  <h3 className="text-xl font-semibold">
                    {review.review_title}
                  </h3>
                  <p>{review.review_body}</p>
                  <p>
                    Rating: {review.rating}{" "}
                    <span className="text-yellow-500">★</span>
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full border-none cursor-pointer"
              onClick={toggleModal}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantList;
