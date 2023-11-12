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


}