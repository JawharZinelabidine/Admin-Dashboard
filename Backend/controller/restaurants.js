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
  getOne:async(req,res)=>{
    const restaurantID=req.params.id
    try{
        const restaurants = await prisma.restaurant.findUnique({
            where:{
                id: parseInt(restaurantID)
            }
        })
        res.status(200).json(restaurants);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
        
    },

    createRestaurant: async (req, res) => {
        const { name, category, description, main_image, menu_images, phone_number, reservation_quota,
            latitude, longtitude, opening_time, closing_time, ownerId } = req.body
        console.log(new Date(opening_time))


        try {
            const business = await restaurant.create({
                data: {
                    name: name, category: category, description: description, main_image: main_image,
                    menu_images: menu_images, phone_number: phone_number, reservation_quota: reservation_quota,
                    latitude: latitude, longtitude: longtitude, opening_time: new Date(opening_time), closing_time: new Date(closing_time),
                    ownerId: ownerId
                }
            })

            res.status(201).json(business);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    


    updloadRestaurantImages: async (req, res) => {
      try {
        const restaurantId = req.params.id;
        console.log(req.body);

    
        const mainImage = await uploadToCloudinary(req.body.main_image);
            console.log(req.body.main_image)
        const menuImages = await Promise.all(req.body.menu_images.map((image) => uploadToCloudinary(image)));
        
        console.log(req.body);
    
        let extraImages = [];
        if (req.body.extra_images && req.body.extra_images.length > 0) {
          extraImages = await Promise.all(
            req.body.extra_images.map((extraImage) => uploadToCloudinary(extraImage))
          );
        }
    
        const business = await restaurant.update({
          where: {
            id: restaurantId,
          },
          data: {
            menuImages: { set: menuImages },
            extraImages: { set: extraImages },
            mainImage: mainImage.secure_url,
          },
        });
    
        res.status(201).json(business);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    }
    
}
