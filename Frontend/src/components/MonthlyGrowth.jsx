import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const MonthlyGrowth = ({ monthlyGrowth }) => {
  const adaptedData = [
    {
      id: 'Restaurants Added',
      data: monthlyGrowth.map(({ month, restaurantsAdded }) => ({
        x: month,
        y: restaurantsAdded,
      })),
    },
  ];

  return (
    <div className="bg-gray-800 p-4 shadow-md rounded-md transition duration-300 ease-in-out transform ">
      <h2 className="text-lg font-semibold mb-2 text-white">Monthly Growth</h2>
      <div className="bg-white rounded-md p-4" style={{ height: '300px' }}>
        <ResponsiveLine
          data={adaptedData}
          margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Restaurants Added',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'category10' }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MonthlyGrowth;
