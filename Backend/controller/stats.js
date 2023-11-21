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
    
      const monthlyGrowthData = [];
    
    
      for (let i = 0; i <  6; i++) {
        const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const targetYear = targetDate.getFullYear();
        const targetMonth = targetDate.getMonth() + 1;
    
        
        const restaurantsThisMonth = await prisma.restaurant.findMany({
          where: {
            createdAt: {
              gte: new Date(targetYear, targetMonth - 1, 1), 
              lt: new Date(targetYear, targetMonth, 1),
            },
          },
        });
        console.log(restaurantsThisMonth)
        
        const formattedData = {
          month: targetDate.toLocaleString('en-US', { month: 'short' }),
          restaurantsAdded: restaurantsThisMonth.length,
        };
    console.log(restaurantsThisMonth.length)
        
        monthlyGrowthData.unshift(formattedData);
      }
    
      return monthlyGrowthData;
    };
   
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
          lastMonth.setMonth(currentDate.getMonth() - 1); 
      
          const paymentHistory = await prisma.payment.findMany({
            where: {
              createdAt: {
                gte: lastMonth.toISOString(), 
                lt: currentDate.toISOString(), 
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


const calculateRestaurantHistoryStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const restaurantHistoryStats = [];

    for (let i = 0; i < 6; i++) {
      const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;

      const restaurantsThisMonth = await prisma.restaurant.findMany({
        where: {
          createdAt: {
            gte: new Date(targetYear, targetMonth - 1, 1),
            lt: new Date(targetYear, targetMonth, 1), 
          },
        },
      });

      const approvedCount = restaurantsThisMonth.filter(
        (restaurant) => restaurant.status === 'Approved'
      ).length;

      const declinedCount = restaurantsThisMonth.filter(
        (restaurant) => restaurant.status === 'Declined'
      ).length;

      const formattedData = {
        month: targetDate.toLocaleString('en-US', { month: 'long' }),
        Approved: approvedCount,
        Declined: declinedCount,
      };

      restaurantHistoryStats.unshift(formattedData);
    }
    res.status(200).json(restaurantHistoryStats)
  } catch (error) {
    console.error('Error calculating restaurant history stats:', error);
    throw error;
  }
};



module.exports = { calculateStats,calculateRestaurantHistoryStats };
