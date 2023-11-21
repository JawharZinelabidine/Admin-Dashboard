import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const ReviewStats = ({ totalReviews, averageReviewRating }) => {
  const data = [
    {
      id: 'Total Reviews',
      label: 'Total Reviews',
      value: totalReviews,
    },
    {
      id: 'Average Rating',
      label: 'Average Rating',
      value: averageReviewRating,
    },
  ];

  return (
    <div className="bg-gray-800 p-4 shadow-md rounded-md transition duration-300 ease-in-out transform ">
      <h2 className="text-lg font-semibold mb-2 text-white">Review Stats</h2>
      <div style={{ height: '300px' }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.6}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          colors={['#FFA8E2', '#97E3D5']}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          enableRadialLabels={false}
          enableSliceLabels={true}
          sliceLabel={(slice) => `${slice.id}: ${slice.value}`}
          arcLinkLabelsTextColor={"#FFFFFF"}

        />
      </div>
    </div>
  );
};

export default ReviewStats;
