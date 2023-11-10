const { user, restaurant } = require("../model/index");

module.exports = {
  getPendingRestaurants: async (req, res) => {
    try {
      const restaurants = await restaurant.findMany({
        where: {
          status: "Pending",
        },
      });
      if (restaurants) res.status(200).json(restaurants);
      else
        res
          .status(404)
          .json({ error: "Restaurants not found with pending status" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  getVerfiedOwners: async (req, res) => {
    try {
      const owners = await user.findMany({
        where: {
          isVerified: true,
        },
      });
      if (owners) res.status(200).json(owners);
      else res.status(404).json({ error: "active owners accounts not found" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
