
const { restaurant, reservation, user } = require("../model/index");
const uploadToCloudinary = require("./helpers/cloudinary");


module.exports = {
  getRestaurants : async (req, res) => {
    try {
      const { sortBy } = req.query;
      let sortOption;
      switch (sortBy) {
        case "date_asc":
          sortOption = { createdAt: 'asc' };
          break;
        case "date_desc":
          sortOption = { createdAt: 'desc' }; 
          break;
        case "rating_asc":
          sortOption = { rating: 'asc' }; 
          break;
          case "rating_desc":
            sortOption = { rating: 'desc' }; 
            break;
        default:
          sortOption = { createdAt: 'asc' };
      }
  
      const restaurants = await restaurant.findMany({
        where: {
          status: "Approved",
          isBanned: false,
        },
        orderBy: sortOption,
      });
  
      res.status(200).json(restaurants);
  
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  
  getOne: async (req, res) => {
    const id = req.userId;

    try {
      const resto = await restaurant.findFirst({
        where: {
          ownerId: id,
        },
      });
      if (resto) {
        res.status(200).json(resto);
      } else {
        res
          .status(404)
          .json({ error: "Restaurant not found for the specified ownerId" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  createRestaurant: async (req, res) => {
    try {
      const id = req.userId;
      const {
        name,
        description,
        phoneNumber,
        categories,
        City,
        openingTime,
        closingTime,
        reservationQuota,
        mainImage,
        menuImages,
        extraImages,
        lat,
        lng,
      } = req.body;
      const mainImageUrl = await uploadToCloudinary(mainImage);
      const menuImageUrls = await Promise.all(
        menuImages.map((menuImage) => uploadToCloudinary(menuImage))
      );

      let extraImageUrls = [];
      if (extraImages && extraImages.length > 0) {
        extraImageUrls = await Promise.all(
          extraImages.map((extraImage) => uploadToCloudinary(extraImage))
        );
      }

      const createdRestaurant = await restaurant.create({
        data: {
          name,
          description,
          phone_number: parseInt(phoneNumber),
          category: categories,
          City,
          opening_time: openingTime,
          closing_time: closingTime,
          reservation_quota: parseInt(reservationQuota),
          main_image: mainImageUrl,
          menu_images: menuImageUrls,
          extra_images: extraImageUrls,
          latitude: +lat,
          longtitude: +lng,
          ownerId: id,
        },
      });

      try {
        await user.update({
          where: {
            email: "admin@admin.com",
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log("Failed to change admin notification status:", error);
        res.status(500).send("Failed to change admin notification status");
      }

      res.status(201).json(createdRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updloadRestaurantImages: async (req, res) => {
    try {
      const { mainImage, menuImages, extraImages } = req.body;
      const id = req.userId;
      const resto = await restaurant.findFirst({
        where: {
          ownerId: id,
        },
      });
      if (!resto) {
        res
          .status(404)
          .json({ error: "Restaurant not found for the specified ownerId" });
      }
      const mainImageUrl = await uploadToCloudinary(mainImage);
      console.log(mainImageUrl);

      let menuImagesUrls = [];
      if (menuImages && menuImages.length > 0) {
        menuImagesUrls = await Promise.all(
          menuImages.map((image) => uploadToCloudinary(image))
        );
      }

      let extraImageUrls = [];
      if (extraImages && extraImages.length > 0) {
        extraImageUrls = await Promise.all(
          extraImages.map((extraImage) => uploadToCloudinary(extraImage))
        );
      }

      const restaurantItem = await restaurant.update({
        where: {
          id: parseInt(resto.id),
        },
        data: {
          menu_images: menuImagesUrls,
          extra_images: extraImageUrls,
          main_image: mainImageUrl,
        },
      });

      res.status(201).json(restaurantItem);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  deleteImageByProperty: async (req, res) => {
    try {
      const { property, imageUrl } = req.body;

      if (!property || !imageUrl) {
        return res.status(400).json({ error: "Invalid parameters" });
      }

      const id = req.userId;
      const resto = await restaurant.findFirst({
        where: {
          ownerId: id,
        },
      });
      if (!resto) {
        res
          .status(404)
          .json({ error: "Restaurant not found for the specified ownerId" });
      }

      let deleteQuery = {};
      let updatedProperty = [];

      switch (property) {
        case "main_image":
          deleteQuery = { main_image: "" };
          break;
        case "menu_images":
        case "extra_images":
          if (resto) {
            updatedProperty = resto[property].filter(
              (elem) => elem !== imageUrl
            );
            deleteQuery = {
              [property]: updatedProperty,
            };
          } else {
            return res.status(404).json({ error: "Restaurant not found" });
          }
          break;
        default:
          return res.status(400).json({ error: "Invalid property" });
      }

      const restaurantItem = await restaurant.update({
        where: {
          id: resto.id,
        },
        data: deleteQuery,
      });

      if (restaurantItem) {
        res.status(200).json(restaurantItem);
      } else {
        res.status(404).json({ error: "Restaurant not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateImageByProperty: async (req, res) => {
    try {
      const { property, oldImageUrl, newImageFile } = req.body;

      if (!property || !oldImageUrl || !newImageFile) {
        return res.status(400).json({ error: "Invalid parameters" });
      }
      const id = req.userId;
      const resto = await restaurant.findFirst({
        where: {
          ownerId: id,
        },
      });
      if (!resto) {
        res
          .status(404)
          .json({ error: "Restaurant not found for the specified ownerId" });
      }

      const newImageUrl = await uploadToCloudinary(newImageFile);

      if (!newImageUrl) {
        return res.status(500).json({ error: "Failed to upload new image" });
      }

      let updatedProperty = [];
      console.log("newImageUrl ", newImageUrl, "\n oldImageUrl ", oldImageUrl);

      switch (property) {
        case "main_image":
          resto[property] = newImageUrl;
          updatedProperty = resto[property];
          break;
        case "menu_images":
        case "extra_images":
          if (resto) {
            const oldImageIndex = resto[property].indexOf(oldImageUrl);

            if (oldImageIndex !== -1) {
              resto[property][oldImageIndex] = newImageUrl;
              updatedProperty = resto[property];
            } else {
              return res.status(404).json({ error: "Old image URL not found" });
            }
          } else {
            return res.status(404).json({ error: "Restaurant not found" });
          }
          break;
        default:
          return res.status(400).json({ error: "Invalid property" });
      }

      const updateQuery = {
        [property]: updatedProperty,
      };

      const updatedRestaurant = await restaurant.update({
        where: {
          id: resto.id,
        },
        data: updateQuery,
      });

      if (updatedRestaurant) {
        res.status(200).json(updatedRestaurant);
      } else {
        res.status(404).json({ error: "Restaurant not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateRestaurantInformation: async (req, res) => {
    try {
      const {
        description,
        phoneNumber,
        categories,
        openingTime,
        closingTime,
        reservationQuota,
      } = req.body;
      console.log(req.body);
      const id = req.userId;
      const resto = await restaurant.findFirst({
        where: {
          ownerId: id,
        },
      });
      if (!resto) {
        res
          .status(404)
          .json({ error: "Restaurant not found for the specified ownerId" });
      }
      const updatedInfo = await restaurant.update({
        where: {
          id: resto.id,
        },
        data: {
          description,
          phone_number: parseInt(phoneNumber),
          category: categories,
          opening_time: openingTime,
          closing_time: closingTime,
          reservation_quota: parseInt(reservationQuota),
        },
      });
      res.status(201).json(updatedInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateRating: async (req, res) => {
    const { rating } = req.body;
    const restaurantId = req.params.restaurantId;
    const reservationId = req.params.id;

    const thisRestaurant = await restaurant.findUnique({
      where: {
        id: +restaurantId,
      },
    });
    const newRatingCount = thisRestaurant.rating_count + 1;
    const newTotalRating = thisRestaurant.rating + rating;
    let newRating;

    if (thisRestaurant.rating_count > 0) {
      newRating = Math.min(
        5,
        Math.max(1, newTotalRating / newRatingCount)
      ).toFixed(1);
    } else newRating = rating;

    try {
      await restaurant.update({
        where: {
          id: +restaurantId,
        },
        data: {
          rating: +newRating,
          rating_count: newRatingCount,
        },
      });

      await reservation.update({
        where: {
          id: +reservationId,
        },
        data: {
          canReview: "Done",
        },
      });

      res.status(204).send("Rating updated!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Couldn't update rating");
    }
  },
  banRestaurantById: async (req, res) => {
    const restaurantId = req.params.id;

    try {
      const foundRestaurant = await restaurant.findUnique({
        where: {
          id: parseInt(restaurantId),
        },
      });

      if (!foundRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      if (foundRestaurant.isBanned) {
        return res
          .status(400)
          .json({ message: "Restaurant is already banned" });
      }

      await restaurant.update({
        where: {
          id: parseInt(restaurantId),
        },
        data: {
          isBanned: true,
        },
      });

      return res
        .status(200)
        .json({ message: "Restaurant banned successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getBannedRestaurants: async (req, res) => {
    try {
      const bannedRestaurants = await restaurant.findMany({
        where: {
          isBanned: true,
        },
      });

      return res.status(200).json(bannedRestaurants);
    } catch (error) {
      console.error("Error fetching banned restaurants:", error);

      return res.status(500).json({ message: "Internal server error" });
    }
  },
  unbanRestaurant: async (req, res) => {
    const restaurantId = req.params.id;
    try {
      const existingRestaurant = await restaurant.findUnique({
        where: {
          id: parseInt(restaurantId),
        },
      });
      if (!existingRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      if (!existingRestaurant.isBanned) {
        return res.status(400).json({ message: "Restaurant is not banned" });
      }
      await restaurant.update({
        where: {
          id: parseInt(restaurantId),
        },
        data: {
          isBanned: false,
        },
      });
  
      return res.status(200).json({ message: 'Restaurant unbanned successfully' });
    } catch (error) {
      console.error('Error unblocking restaurant:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  getReviewByRestaurantID :async (req, res) => {
   
    const restaurantId = req.params.id
    
    try {
      const restaurantData = await restaurant.findUnique({
        where: {
            id: +restaurantId,
        },
        include: {
            Review: true,
        },
    });
    const reviews= restaurantData.Review;
    if (reviews.length === 0) {
      return res.status(200).json({ message: 'No reviews found for this restaurant' });
    }
      res.status(200).json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }, 
  calculateReservationRate: async (req, res) => {
    try {

    const restaurantReservations = await reservation.findMany({
      include: {
        restaurant: true,
      },
    });
 
    const restaurants = await restaurant.findMany({
      where: {
        status: "Approved",
        isBanned: false,
      },
        }); 
    
    const premiumReservations = restaurantReservations.filter(
      (reservation) => reservation.restaurant && reservation.restaurant.accountType === 'PREMIUM'
    );
    const basicReservations = restaurantReservations.filter(
      (reservation) => reservation.restaurant && reservation.restaurant.accountType === 'BASIC'
    );

    const approvedPremiumReservations = premiumReservations.filter(
      (reservation) => reservation.status === 'Approved'
    );
    const approvedBasicReservations = basicReservations.filter(
      (reservation) => reservation.status === 'Approved'
    );
      const premiumReservationRate =
        approvedPremiumReservations.length === 0
          ? 0
          : (approvedPremiumReservations.length / premiumReservations.length) * 100;
  
      const basicReservationRate =
        approvedBasicReservations.length === 0
          ? 0
          : (approvedBasicReservations.length / basicReservations.length) * 100;

  
      res.status(200).json({
        premiumReservationRate: premiumReservationRate.toFixed(2),
        basicReservationRate: basicReservationRate.toFixed(2),
        totalRestaurantNumber:restaurants.length ?? 0,
      });
    } catch (error) {
      console.error('Error calculating reservation rate:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
};
