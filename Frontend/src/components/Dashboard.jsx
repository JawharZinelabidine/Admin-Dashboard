import React, { useState, useEffect } from "react";
import Summary from "./Summary.jsx";
import RestaurantStats from "./RestaurantStats.jsx";
import CustomerStats from "./CustomerStats.jsx";
import ReviewStats from "./ReviewStats.jsx";
import MonthlyGrowth from "./MonthlyGrowth.jsx";
import axios from "../services/axiosInterceptor.js";
import PaymentHistory from "./PaymentHistory.jsx";
import Navbar from "./Navbar.jsx";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/stats`);
        if (response.status === 200) setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching reservation rate:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Summary
                numberOfReviews={dashboardData.totalReviews}
                numberOfRestaurants={dashboardData.restaurantCount}
                numberOfBannedRestaurants={
                  dashboardData.activeRestaurants.bannedCount
                }
                totalReservations={
                  dashboardData.totalApprovedReservations +
                  dashboardData.totalDeclinedReservations
                }
              />
            </div>

            <div className="md:col-span-2">
              <RestaurantStats
                totalPremiumReservations={
                  dashboardData.totalPremiumReservations
                }
                totalBasicReservations={dashboardData.totalBasicReservations}
                totalApprovedReservations={
                  dashboardData.totalApprovedReservations
                }
                totalDeclinedReservations={
                  dashboardData.totalDeclinedReservations
                }
              />
            </div>
            <CustomerStats
              userCount={dashboardData.userCount}
              activeCustomers={dashboardData.totalCustomersWithReservations}
            />
            <ReviewStats
              totalReviews={dashboardData.totalReviews}
              averageReviewRating={dashboardData.averageReviewRating}
            />

            <MonthlyGrowth monthlyGrowth={dashboardData.monthlyGrowth} />
            <PaymentHistory monthlyGrowth={dashboardData.PaymentHistory} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
