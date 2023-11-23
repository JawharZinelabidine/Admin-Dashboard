import React, { useState, useEffect } from "react";
import axios from "../services/axiosInterceptor";
import Navbar from "./Navbar";
import { ResponsiveBar } from "@nivo/bar";

function History() {
  const [restaurants, setRestaurants] = useState([]);
  const [barData, setBarData] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/admin/history"
      );
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/stats/historyStats"
      );
      setBarData(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRestaurants();
  }, []);

  return (
    <div className="flex-grow min-h-screen text-white bg-gray-900 w-full">
      <Navbar />
      <main className="p-6 space-y-8">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Restaurants statistics</h2>
          </div>
        </div>
        <section className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1 bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="font-semibold border-b border-gray-100 pb-4">
              <span>Restaurants History</span>
            </div>
            <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr
                      key={restaurant.id}
                      className="border-b border-gray-400"
                    >
                      <td className="px-4 py-2">{restaurant.name}</td>
                      <td className="px-4 py-2 text-right">
                        {restaurant.status === "Approved" ? (
                          <span className="text-green-500">Approved</span>
                        ) : (
                          <span className="text-red-500">Declined</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex-1 bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Restaurants statistics
            </h2>
            <div
              className="flex justify-center items-center rounded-md"
              style={{ height: "400px", backgroundColor: "white" }}
            >
              {barData && (
                <ResponsiveBar
                  data={barData}
                  keys={["Approved", "Declined"]}
                  indexBy="month"
                  colors={["#F48FB1", "#90CDF4"]} //
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Month",
                    legendPosition: "middle",
                    legendOffset: 32,
                    truncateTickAt: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: "middle",
                    legend: "Status",
                    legendOffset: -40,
                    truncateTickAt: 0,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                  tooltip={({ id, value }) => (
                    <strong className="text-black">
                      {id}: {value}
                    </strong>
                  )}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default History;
