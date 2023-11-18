import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import customAxios from "../services/axiosInterceptor";

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

  const handleBanRestaurant = async (id) => {
    try {
      const response = await customAxios.post(
        `http://localhost:3000/api/restaurants/ban/${id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        getRestaurants();
      }
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
 
  <div className="my-4">
    <label className="mr-2">Sort by:</label>
    <select
      className="border border-gray-300 rounded-md px-2 py-1"
      onChange={(e) => handleSelect(e.target.value)}
    >
      <option value="date_desc">Most Recent</option>
      <option value="date_asc">Oldest</option>
      <option value="rating_desc">Highest Rated</option>
      <option value="rating_asc">Lowest Rated</option>
    </select>
  </div>

  <table className="p-6 space-y-28">
    <thead>
      <tr>
        <th className="px-4 py-2">Restaurant Name</th>
        <th className="px-4 py-2">Owner Name</th>
        <th className="px-4 py-2">Owner Email</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {restaurants.map((restaurant) => (
        <tr key={restaurant.id}>
          <td className="px-4 py-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{restaurant.name}</span>
              <span className="text-blue-500">
                <Link onClick={() => handleSeeReviews(restaurant.id)}>
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
              onClick={() => handleBanRestaurant(restaurant.id)}
            >
              Ban
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {modal && selectedRestaurant && (
    <div className="modal-custom">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content-custom p-4">
        {(reviews ?? []).length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <h3 className="text-xl font-semibold">{review.review_title}</h3>
              <p>{review.review_body}</p>
              <p>
                Rating: {review.rating}{" "}
                <span style={{ color: "gold" }}>★</span>
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
