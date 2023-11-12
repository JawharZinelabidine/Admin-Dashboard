const { review, reservation } = require("../model/index");

module.exports = {
    getPendingReviews: async (req, res) => {
        const id = req.userId
        try {
            const pending = await reservation.findMany({
                where: {
                    customerId: id,
                    canReview: 'Yes'
                }
            });
            res.status(200).json(pending);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    createReview: async (req, res) => {
        const id = req.userId
        const restaurantId = req.params.restaurantId
        const { review_title, review_body, rating } = req.body
        try {
            const newReview = await review.create({
                data: {
                    review_title: review_title,
                    review_body: review_body,
                    rating: rating,
                    customerId: id,
                    restaurantId: +restaurantId
                }
            });
            res.status(201).json(newReview);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },


}