const prisma = require("../model/index");

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
        
    }
  }


