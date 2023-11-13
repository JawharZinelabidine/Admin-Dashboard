
import Navbar from './Navbar';

import React, { useEffect } from 'react';

import axios from "../services/axiosInterceptor";

import { Link } from 'react-router-dom';

function Dashboard() {

  const fetchRestaurants = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/admin/restaurants");
    } catch (error) {
      console.log(error);
      if (error && error.response.status === 403 || error && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    fetchRestaurants()
  })

  return (
    <>
      < Navbar />
      <div className="flex-grow min-h-screen text-white bg-gray-900 w-full">

        <main className="p-6  space-y-28">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between ">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Restaurants statistiques</h2>
            </div>

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
                <span className="block text-2xl font-bold">62</span>
                <span className="block text-gray-500">Restaurants</span>
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
                <span className="block text-2xl font-bold">6.8</span>
                <span className="block text-gray-500">Average mark</span>
              </div>
            </div>
            <div className="flex items-center p-8 bg-gray-800 shadow-lg rounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
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
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <div>
                <span className="inline-block text-2xl font-bold">9</span>
                <span className="inline-block text-xl text-gray-500 font-semibold">
                  (14%)
                </span>
                <span className="block text-gray-500">
                  Underperforming students
                </span>
              </div>
            </div>
            <div className="flex items-center p-8 bg-gray-800 shadow-lgrounded-lg">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-2xl font-bold">83%</span>
                <span className="block text-gray-500">Finished homeworks</span>
              </div>
            </div>
          </section>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
            <div className="row-span-3 bg-gray-800 shadow-lg rounded-lg">
              <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                <span>Restaurants and ratings</span>
                {/* Refer here for full dropdown menu code: https://tailwindui.com/components/application-ui/elements/dropdowns */}
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
                <ul className="p-6 space-y-6">
                  <li className="flex items-center">
                    <span className="text-gray-600">reservi</span>
                    <span className="ml-auto font-semibold">9.3</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
