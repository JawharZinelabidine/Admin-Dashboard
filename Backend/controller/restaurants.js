const prisma = require("../model/index");
const { restaurant } = require("../model/index");

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
      
        const mainImage = await cloudinary.uploader.upload(req.files.main_image.path);
   

      
       const menuImages = req.files.menu_images.map(async (image) => {
         const result = await cloudinary.uploader.upload(image.path);
         return result.secure_url;
       });
   
   
       const extraImages = req.files.extra_images.map(async (image) => {
         const result = await cloudinary.uploader.upload(image.path);
         return result.secure_url;
       });
   
      const business = await restaurant.create({
        where: {
          id:restaurantId
        },
          data: {
            menuImages: { set: menuImages },
            extraImages: { set: extraImages },
            mainImage: mainImage.secure_url,
          }
      })

      res.status(201).json(business);
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

}
