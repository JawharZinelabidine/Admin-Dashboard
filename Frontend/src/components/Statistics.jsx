import React, { useState, useEffect } from "react";
import axios from "axios";

const StatisticsChart = () => {
  const [reservationRate, setReservationRate] = useState(null);
  

  useEffect(() => {
    const fetchReservationRate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/restaurants/reservation`
        );
        if (response.status === 200) setReservationRate(response.data);
      } catch (error) {
        console.error("Error fetching reservation rate:", error);
      }
    };

    fetchReservationRate();
  }, []);

  return (
    <section class="grid gap-6 my-6 md:grid-cols-3">
      <div class="p-6 bg-white shadow rounded-2xl">
        <dl class="space-y-2">
          <dt class="text-sm font-medium text-gray-500">
            Reservation Requests for basic restaurants
          </dt>

          <dd class="text-5xl font-light md:text-6xl">
            {reservationRate?.basicReservationRate ?? "0.0"}%
          </dd>
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
        </dl>
      </div>

      <div class="p-6 bg-white shadow rounded-2xl">
        <dl class="space-y-2">
          <dt class="text-sm font-medium text-gray-500">
            Reservation Requests for Premium restaurants
          </dt>

          <dd class="text-5xl font-light md:text-6xl">
            {reservationRate?.premiumReservationRate ?? "0.0"}%
          </dd>

          <dd class="flex items-center space-x-1 text-sm font-medium text-red-500">
            <svg
              class="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            ></svg>
          </dd>
        </dl>
      </div>
      <div class="p-6 bg-white shadow rounded-2xl">
        <dl class="space-y-2">
          <dt class="text-sm font-medium text-gray-500">
            NumberOf Restaurants{" "}
          </dt>
          <dd class="text-5xl font-light md:text-6xl">
            {reservationRate?.totalRestaurantNumber ?? 0}
          </dd>
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
        </dl>
      </div>
    </section>
  );
};

export default StatisticsChart;
