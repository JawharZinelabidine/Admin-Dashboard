import Navbar from "./Navbar";

import React, { useEffect } from "react";

import axios from "../services/axiosInterceptor";

import { Link } from "react-router-dom";
import StatisticsChart from "./Statistics";

function Dashboard() {
  const fetchRestaurants = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/admin/restaurants"
      );
    } catch (error) {
      console.log(error);
      if (
        (error && error.response.status === 403) ||
        (error && error.response.status === 401)
      ) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchRestaurants();
  });

  return (
    <>
      <Navbar />

      <main className="p-6  space-y-28">
        <div>
          <StatisticsChart />
        </div>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-gray-800 shadow-lg rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2l1.146 1.146a2 2 0 002.708 0L12 2zM3 10a9 9 0 0 1 9 9 1 1 0 0 0 2 0 9 9 0 0 1 9-9 1 1 0 0 0 2 0 11 11 0 0 0-15-10.294V3a1 1 0 1 0-2 0v2.706A11 11 0 0 0 3 10z"
                />
              </svg>
            </div>

            <div>
              <div>
                <Link to="/RestaurantList" className="block text-gray-500">
                  Restaurants
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center p-8 bg-gray-800 shadow-lg rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>

            <div>
              <span className="block text-gray-500">Ban Restaurants</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
