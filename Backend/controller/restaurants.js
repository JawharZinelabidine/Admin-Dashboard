const prisma = require("../model/index");
const { restaurant } = require("../model/index");
const uploadToCloudinary = require("./helpers/cloudinary");

module.exports = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await prisma.restaurant.findMany();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  getOne: async (req, res) => {
    const ownerId = parseInt(req.params.id);
    try {
      const restaurant = await prisma.restaurant.findFirst({
        where: {
          ownerId: 2,
        },
      });
      if (restaurant) {
        res.status(200).json(restaurant);
      } else {
        res.status(404).json({ error: "Restaurant not found for the specified ownerId" });
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
      ownerId
    } = req.body;
    console.log(req.body);
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
        ownerId: +ownerId,
      },
    });
    res.status(201).json(createdRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
},



updloadRestaurantImages: async (req, res) => {
  try {
      const restaurantId = req.params.id;
      const {
          mainImage,
          menuImages,
          extraImages,
      } = req.body;
      console.log(menuImages);

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

      const business = await restaurant.update({
          where: {
              id: parseInt(restaurantId),
          },
          data: {
              menu_images: menuImagesUrls,
              extra_images: extraImageUrls,
              main_image: mainImageUrl,
          },
      });

      res.status(201).json(business);
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
},
deleteImageByProperty: async (req, res) => {
  try {
    const { id: restaurantId, property, imageUrl } = req.body;

    if (!restaurantId || !property || !imageUrl) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    let deleteQuery = {};

    switch (property) {
      case "main_image":
        deleteQuery = { main_image: "" };
        break;
      case "menu_images":
        deleteQuery = { menu_images: { delete: imageUrl } };
        break;
      case "extra_images":
        deleteQuery = { extra_images: { delete: imageUrl } };
        break;
      default:
        return res.status(400).json({ error: "Invalid property" });
    }

    const restaurant = await prisma.restaurant.update({
      where: {
        id: parseInt(restaurantId),
      },
      data: deleteQuery,
    });

    if (restaurant) {
      res.status(200).json(restaurant);
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
    const { restaurantId, property, oldImageUrl, newImageFile } = req.body;

    if (!restaurantId || !property || !oldImageUrl || !newImageFile) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const newImageUrl = await uploadToCloudinary(newImageFile);

    if (!newImageUrl) {
      return res.status(500).json({ error: "Failed to upload new image" });
    }

    let updatedProperty = [];

    switch (property) {
      case "main_image":
        updatedProperty = newImageUrl;
        break;
      case "menu_images":
      case "extra_images":
        const restaurant = await prisma.restaurant.findUnique({
          where: {
            id: parseInt(restaurantId),
          },
        });

        if (restaurant) {
          const oldImageIndex = restaurant[property].indexOf(oldImageUrl);

          if (oldImageIndex !== -1) {
            // Replace old image URL with new URL at the same index
            restaurant[property][oldImageIndex] = newImageUrl;
            updatedProperty = restaurant[property];
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

    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id: parseInt(restaurantId),
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
}

}


