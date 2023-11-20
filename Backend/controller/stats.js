const prisma = require("../model/index");

const calculateStats = async (req, res) => {
  try {
    const restaurantReservations = await prisma.reservation.findMany({
      include: {
        restaurant: true,
      },
    });

    const restaurantReviews = await prisma.review.findMany({
      include: {
        restaurant: true,
      },
    });
    const restaurant = await prisma.restaurant.findMany();

    const userCount = await prisma.user.count();
    const restaurantCount = await prisma.restaurant.count();

    const calculateMonthlyGrowth = async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
    
      const monthlyGrowthData = [];
    
      // Loop through each month of four 6-month periods
      for (let i = 0; i <  6; i++) {
        const targetDate = new Date(currentYear, currentMonth - i, 1);
        const targetYear = targetDate.getFullYear();
        const targetMonth = targetDate.getMonth() + 1;
    
        // Fetch restaurants created in the specific month using Prisma
        const restaurantsThisMonth = await prisma.restaurant.findMany({
          where: {
            createdAt: {
              gte: new Date(targetYear, targetMonth - 1, 1), // Start of the month
              lt: new Date(targetYear, targetMonth, 1), // Start of the next month
            },
          },
        });
        console.log(restaurantsThisMonth)
        // Format data for this month
        const formattedData = {
          month: targetDate.toLocaleString('en-US', { month: 'short' }),
          restaurantsAdded: restaurantsThisMonth.length,
        };
    console.log(restaurantsThisMonth.length)
        // Add data for this month to the array
        monthlyGrowthData.unshift(formattedData);
      }
    
      return monthlyGrowthData;
    };
    // Function to calculate active restaurants
    const calculateActiveAndBannedCounts = () => {
      const counts = restaurant.reduce(
        (acc, restaurant) => {
          if (restaurant.status === "Approved") {
            if (restaurant.isBanned) {
              acc.bannedCount++;
            } else {
              acc.activeCount++;
            }
          }
          return acc;
        },
        { activeCount: 0, bannedCount: 0 }
      );
    
      return counts;
    };

    // Function to calculate total customers From Reservations
    const calculateTotalCustomersFromReservations = () => {
      const uniqueCustomers = new Set();

      restaurantReservations.forEach((reservation) => {
        if (reservation.customerId) {
          uniqueCustomers.add(reservation.customerId);
        }
      });

      return uniqueCustomers.size;
    };

    const calculateReviewStats = () => {
        let totalReviews = 0;
        let totalRating = 0;
        let premiumCount = 0;
        let basicCount = 0;
        let approvedReservations = 0;
        let declinedReservations = 0;
      
        restaurantReviews.forEach((review) => {
          if (review.rating && !isNaN(review.rating)) {
            totalRating += review.rating;
            totalReviews++;
          }
        });
      
        restaurantReservations.forEach((reservation) => {
          if (reservation.restaurant && reservation.restaurant.accountType === 'PREMIUM') {
            premiumCount++;
          } else if (reservation.restaurant && reservation.restaurant.accountType === 'BASIC') {
            basicCount++;
          }
      
          if (reservation.status === 'Approved') {
            approvedReservations++;
          } else if (reservation.status === 'Declined') {
            declinedReservations++;
          }
        });
      
        const averageReviewRating = totalReviews > 0 ? totalRating / totalReviews : 0;
        const totalPremiumReservations = premiumCount;
        const totalBasicReservations = basicCount;
        const totalApprovedReservations = approvedReservations;
        const totalDeclinedReservations = declinedReservations;
      
        const premiumPercentage = totalPremiumReservations + totalBasicReservations > 0 ?
          (totalPremiumReservations / (totalPremiumReservations + totalBasicReservations)) * 100 :
          0;
      
        const approvedToDeclinedRatio = totalDeclinedReservations > 0 ?
          totalApprovedReservations / totalDeclinedReservations :
          totalApprovedReservations > 0 ? Infinity : 0;
      
        return {
          totalReviews,
          averageReviewRating: averageReviewRating.toFixed(2),
          premiumPercentage: premiumPercentage.toFixed(2),
          approvedToDeclinedRatio: approvedToDeclinedRatio.toFixed(2),
          totalPremiumReservations,
          totalBasicReservations,
          totalApprovedReservations,
          totalDeclinedReservations,
        };
      };
      const calculatePaymentHistory = async () => {
        try {
          const currentDate = new Date();
          const lastMonth = new Date();
          lastMonth.setMonth(currentDate.getMonth() - 1); // Assuming last month means the month before the current one
      
          const paymentHistory = await prisma.payment.findMany({
            where: {
              createdAt: {
                gte: lastMonth.toISOString(), // Filter payments created after lastMonth
                lt: currentDate.toISOString(), // Filter payments created before currentDate
              },
            },
          });
      
          return paymentHistory;
        } catch (error) {
          console.error('Error fetching payment history:', error);
          throw error;
        }
      };
      

    const monthlyGrowth = await calculateMonthlyGrowth();
    const activeRestaurants = calculateActiveAndBannedCounts();
    const totalCustomersWithReservations = calculateTotalCustomersFromReservations();
    const reviewStats = calculateReviewStats();
    const premiumPayments = await calculatePaymentHistory();

    res.status(200).json({
      monthlyGrowth,
      activeRestaurants,
      totalCustomersWithReservations,
      ...reviewStats,
      userCount,
      restaurantCount,
      premiumPayments
    });
  } catch (error) {
    console.error("Error calculating statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};


// ... existing code for other calculations

// Calculate premium payments


module.exports = { calculateStats };
