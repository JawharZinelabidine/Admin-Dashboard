import React from "react";
import { ResponsivePie } from "@nivo/pie";

const CustomerStats = ({ userCount, activeCustomers }) => {
  const inactiveCustomers = userCount - activeCustomers;

  const data = [
    {
      id: "Active Customers",
      label: "Active Customers",
      value: activeCustomers,
    },
    {
      id: "Inactive Customers",
      label: "Inactive Customers",
      value: inactiveCustomers,
    },
  ];

  return (
    <div className="bg-gray-800 p-4 shadow-md rounded-md transition duration-300 ease-in-out transform">
      <h2 className="text-lg font-semibold mb-2 text-white">Customer Stats</h2>
      <div style={{ height: "300px" }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          colors={["#F48FB1", "#90CDF4"]}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableRadialLabels={false}
          enableSliceLabels={true}
          sliceLabel={(slice) => `${slice.id}: ${slice.value}`}
          arcLinkLabelsTextColor={"#FFFFFF"}
        />
      </div>
    </div>
  );
};

export default CustomerStats;
