import React,{useState,useEffect} from "react";
import "./RestaurantList.css";
import axios from "axios";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    try {
      const { data: restaurantData } = await axios.get("http://localhost:3000/api/restaurants");
      console.log("Restaurant Data:", restaurantData);
  
      const ownersPromises = restaurantData.map(async (restaurant) => {
        try {
          const ownerResponse = await axios.get(`http://localhost:3000/api/owners/${restaurant.ownerId}`);
          const owner = ownerResponse.data;
          return { ...restaurant, owner };
        } catch (ownerError) {
          console.error("Error fetching owner:", ownerError);
          return { ...restaurant, owner: null }; 
        }
      });
  
      const restaurantsWithOwners = await Promise.all(ownersPromises);
      console.log("Restaurants with Owners:", restaurantsWithOwners);
  
      setRestaurants(restaurantsWithOwners);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
  
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        localStorage.clear();
      
      }
    }
  };
  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Restaurant Name</th>
          <th>Owner Name</th>
          <th>Owner Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {restaurants.map((restaurant) => (
  <tr key={restaurant.id}>
  
    <td>{restaurant.name}</td>
    <td>{restaurant.owner ? restaurant.owner.fullname : "N/A"}</td>
    <td>{restaurant.owner ? restaurant.owner.email : "N/A"}</td>
    <td>
      <button>Ban</button>
    </td>
  </tr>
))}
      </tbody>
    </table>
  );
  
};

export default RestaurantList;
