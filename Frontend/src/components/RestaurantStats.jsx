import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

const RestaurantStats = ({
  totalPremiumReservations,
  totalBasicReservations,
  totalApprovedReservations,
  totalDeclinedReservations,
}) => {
  const pieData = [
    {
      id: 'Premium',
      label: 'Premium',
      value: totalPremiumReservations,
    },
    {
      id: 'Basic',
      label: 'Basic',
      value: totalBasicReservations,
    },
  ];

  const barData = [
    {
      id: 'Approved',
      Approved: totalApprovedReservations,
    },
    {
      id: 'Declined',
      Declined: totalDeclinedReservations,
    },
  ];

  return (
    <div className="bg-gray-800 p-6 shadow-md rounded-md grid grid-cols-2 md:grid-cols-2 gap-8 transition duration-300 ease-in-out transform ">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Reservation Types</h2>
        <div className="h-64">
          <ResponsivePie
            data={pieData}
            colors={['#FF6B6B', '#81E6D9']} // Red and Green colors
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableRadialLabels={false}
            enableSliceLabels={true}
            arcLinkLabelsTextColor="#FFF"
            sliceLabel="value"
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#FFFFFF" // Label color
            sliceLabelsFormat={(value) => `${value}`} // Number format
            tooltip={({ id, value }) => (
              <strong className="text-white">{id}: {value}</strong>
            )}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemTextColor: '#FFFFFF',
                itemWidth: 100,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'circle',
              },
            ]}
          />
        </div>
        <p className="text-lg mt-4 text-white">
          Premium: {totalPremiumReservations} | Basic: {totalBasicReservations}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Reservation Status</h2>
        <div className="h-64">
          <ResponsiveBar
            data={barData}
            keys={['Approved', 'Declined']}
            colors={['#F48FB1', '#90CDF4']} // Pink and Blue colors
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Reservations',
              legendPosition: 'middle',
              legendOffset: 36,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Counts',
              legendPosition: 'middle',
              legendOffset: -40,
              tickTextColor: '#FFFFFF', // Axis font color
            }}
            enableGridY={false}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            tooltip={({ id, value }) => (
              <strong className="text-white">{id}: {value}</strong>
            )}
  
          />
        </div>
        <p className="text-lg mt-4 text-white">
          Approved: {totalApprovedReservations} | Declined: {totalDeclinedReservations}
        </p>
      </div>
    </div>
  );
};

export default RestaurantStats;

