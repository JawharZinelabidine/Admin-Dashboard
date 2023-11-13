const { user, restaurant } = require("../model/index");
const { sendingMail } = require("../utils/mailing");
require("dotenv").config();

module.exports = {
  getApprovedOrDeclinedRestaurants: async (req, res) => {
    try {
      const restaurants = await restaurant.findMany({
        select: {
          id: true,
          name: true,
          status: true,
        },
        where: {
          status: {
            in: ["Approved", "Declined"],
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getPendingRestaurants: async (req, res) => {
    try {
      const restaurants = await restaurant.findMany({
        where: {
          status: "Pending",
        },
        include: {
          owner: {
            select: {
              fullname: true,
            },
          },
        },
      });
      if (restaurants) {
        const restaurantsWithOwnerNames = restaurants.map((restaurant) => ({
          ...restaurant,
          ownerName: restaurant.owner.fullname,
        }));

        res.status(200).json(restaurantsWithOwnerNames);
      } else {
        res
          .status(404)
          .json({ error: "Restaurants not found with pending status" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  getPendingRestaurant: async (req, res) => {
    const restaurantId = req.params.id;
    try {
      const uniqueRestaurant = await restaurant.findUnique({
        where: {
          id: +restaurantId,
          status: "Pending",
        },
      });
      if (uniqueRestaurant) res.status(200).json(uniqueRestaurant);
      else res.status(404).json({ error: "pending restaurant not found" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getVerifiedOwner: async (req, res) => {
    const ownerId = req.params.id;
    try {
      const owner = await user.findUnique({
        where: {
          id: +ownerId,
          isVerified: true,
        },
      });
      if (owner) res.status(200).json(owner);
      else res.status(404).json({ error: "active owner account not found" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  reviewRestaurantRequest: async (req, res) => {
    const decision = req.body.decision;
    const restaurantId = req.params.id;
    console.log(decision);

    try {
      const requestedRestaurant = await restaurant.findUnique({
        where: {
          id: +restaurantId,
          status: "Pending",
        },
      });

      if (!requestedRestaurant) {
        return res.status(404).json({ error: "Pending restaurant not found" });
      }
      const updatedRestaurant = await restaurant.update({
        where: { id: +restaurantId },
        data: {
          status: decision === "approved" ? "Approved" : "Declined",
        },
      });
      console.log(updatedRestaurant);
      const owner = await user.findUnique({
        where: { id: +requestedRestaurant.ownerId },
      });

      const subject =
        decision === "approved" ? "Restaurant Approved" : "Restaurant Declined";
      const message =
        decision === "approved"
          ? "Congratulations! Your restaurant request has been approved."
          : "We regret to inform you that your restaurant request has been declined.";

      await sendingMail({
        from: process.env.EMAIL,
        to: owner.email,
        subject,
        text: message,
      });

      res
        .status(200)
        .json({ message: "Restaurant request reviewed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
