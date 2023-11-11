const { restaurant } = require("../model/index");
const uploadToCloudinary = require("../helpers/CloudinaryUpload");

module.exports = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await restaurant.findMany();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  getOne: async (req, res) => {
    const id = req.userId
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
      const latitude = 222.558;
      const longtitude = 856.258;
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

      } = req.body;
      const id = req.userId
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
          latitude: latitude,
          longtitude: longtitude,
          ownerId: id,
        },
      });
      res.status(201).json(createdRestaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
