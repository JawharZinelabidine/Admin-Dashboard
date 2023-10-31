const { reservation } = require("../model/index");

module.exports = {

    sendReservationRequest: async (req, res) => {
        const { date, time, guest_number } = req.body
        const { customerId, restaurantId } = req.params
        try {

            const request = await reservation.create({
                data: {
                    date: new Date(date), time: new Date(time), guest_number: guest_number, customerId: +customerId, restaurantId: +restaurantId
                }
            })

            res.status(201).json(request);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);

        }

    },

    fetchReservationRequests: async (req, res) => {

        const { customerId, restaurantId } = req.params

        try {

            const requests = await reservation.findMany({
                where: {
                    customerId: +customerId,
                    restaurantId: +restaurantId
                }
            })

            res.status(200).json(requests);


        } catch (error) {

            console.error(error);
            res.status(500).send(error);

        }


    }




}
