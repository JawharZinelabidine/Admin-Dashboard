const { user, restaurant } = require("../model/index");
const { sendingMail } = require("../utils/mailing");

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
  reviewRestaurantRequest: async (req, res) => {
    const { restaurantId, decision } = req.body;

    try {
      const requestedRestaurant = await restaurant.findUnique({
        where: {
          id: restaurantId,
          status: "Pending",
        },
      });

      if (!requestedRestaurant) {
        return res.status(404).json({ error: "Pending restaurant not found" });
      }
      const updatedRestaurant = await restaurant.update({
        where: { id: restaurantId },
        data: {
          status: decision === "approve" ? "Approved" : "Declined",
        },
      });

      const owner = await user.findUnique({
        where: { id: requestedRestaurant.ownerId },
      });

      const subject = decision === "approve" ? "Restaurant Approved" : "Restaurant Declined";
      const message = decision === "approve"
        ? "Congratulations! Your restaurant request has been approved."
        : "We regret to inform you that your restaurant request has been declined.";

      await sendingMail({
        from: process.env.EMAIL,
        to: owner.email,
        subject,
        text: message,
      });

      res.status(200).json({ message: "Restaurant request reviewed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
