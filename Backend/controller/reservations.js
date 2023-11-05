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

    fetchPendingReservationRequests: async (req, res) => {

        const { restaurantId } = req.params

        try {

            const requests = await reservation.findMany({
                where: {
                    restaurantId: +restaurantId,
                    status: "Pending"
                }
            })

            res.status(200).json(requests);


        } catch (error) {

            console.error(error);
            res.status(500).send(error);

        }


    },

    fetchResolvedReservationRequests: async (req, res) => {

        const { restaurantId } = req.params

        try {

            const requests = await reservation.findMany({
                where: {
                    restaurantId: +restaurantId,
                    OR: [
                        { status: "Approved" },
                        { status: "Rejected" }
                    ]
                }
            })

            res.status(200).json(requests);


        } catch (error) {

            console.error(error);
            res.status(500).send(error);

        }


    },

    approveReservation: async (req, res) => {
        const { reservationId } = req.params

        try {

            const approved = await reservation.update({
                where: {
                    id: +reservationId
                },
                data: {
                    status: "Approved"
                }
            })
            res.status(200).json(approved)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }


    },

    rejectReservation: async (req, res) => {
        const { reservationId } = req.params

        try {

            const rejected = await reservation.update({
                where: {
                    id: +reservationId
                },
                data: {
                    status: "Rejected"
                }
            })
            res.status(200).json(rejected)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }


    },


    fetchUpcomingReservations: async (req, res) => {
        const { customerId } = req.params

        try {
            const upcoming = await reservation.findMany({
                where: {
                    customerId: +customerId,
                    date: {
                        gte: new Date().toISOString()
                    }
                }
            })

            res.status(200).json(upcoming)
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    },

    fetchExpiredReservations: async (req, res) => {
        const { customerId } = req.params

        try {
            const expired = await reservation.findMany({
                where: {
                    customerId: +customerId,
                    date: {
                        lte: new Date().toISOString()
                    }
                }
            })
            res.status(200).json(expired)
        }
        catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    }


}
