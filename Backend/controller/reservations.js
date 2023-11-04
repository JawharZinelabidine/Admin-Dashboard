const { reservation, restaurant } = require("../model/index");

module.exports = {

    sendReservationRequest: async (req, res) => {
        const { date, time, guest_number } = req.body
        const { customerId, restaurantId } = req.params
        try {

            if (!date || !time || !guest_number) {

                return res.status(422).send('missing information')

            }

            const thisRestaurant = await restaurant.findUnique({
                where: { id: +restaurantId }
            })
            const reservations = await reservation.findMany({
                where: {
                    date: new Date(date),
                    restaurantId: +restaurantId,
                    status: 'Approved'
                }
            })

            const spotsTaken = reservations.reduce((total, el) => total + el.guest_number, 0)

            if (spotsTaken + guest_number < thisRestaurant.reservation_quota) {
                const request = await reservation.create({
                    data: {
                        date: new Date(date), time: new Date(time), guest_number: guest_number, customerId: +customerId, restaurantId: +restaurantId
                    }
                })

                res.status(201).json(request);

            } else {
                const remaining = thisRestaurant.reservation_quota - spotsTaken
                res.status(400).json(remaining)
            }



            // if (!thisRestaurant.daily_quotas) {
            //     thisRestaurant = await restaurant.update({
            //         where: { id: +restaurantId },
            //         data: { daily_quotas: { [date]: thisRestaurant.reservation_quota } }
            //     })

            // }

            // if (thisRestaurant.daily_quotas && !thisRestaurant.daily_quotas[date]) {
            //     thisRestaurant = await restaurant.update({
            //         where: { id: +restaurantId },
            //         data: { daily_quotas: { ...thisRestaurant.daily_quotas, [date]: thisRestaurant.reservation_quota } }
            //     })
            // }

            // console.log(thisRestaurant)

            // if (thisRestaurant.daily_quotas[date]) {
            //     const dailyQuota = thisRestaurant.daily_quotas[date]


            //     if (dailyQuota >= guest_number) {
            //         const request = await reservation.create({
            //             data: {
            //                 date: new Date(date), time: new Date(time), guest_number: guest_number, customerId: +customerId, restaurantId: +restaurantId
            //             }
            //         })

            //         res.status(201).json(request);

            //     } else {
            //         res.status(400).send('Daily quota exceeded for this date')
            //     }
            // } else {
            //     res.status(404).send('Daily quota information not set for this date')
            // }

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

            const thisReservation = await reservation.findUnique({
                where: {
                    id: +reservationId
                }
            })

            const guestNumber = thisReservation.guest_number

            const thisRestaurant = await restaurant.findUnique({
                where: { id: thisReservation.restaurantId }
            })

            const reservations = await reservation.findMany({
                where: {
                    date: thisReservation.date,
                    restaurantId: thisReservation.restaurantId,
                    status: 'Approved'
                }
            })

            const spotsTaken = reservations.reduce((total, el) => total + el.guest_number, 0)

            if (spotsTaken + guestNumber < thisRestaurant.reservation_quota) {
                const approved = await reservation.update({
                    where: {
                        id: +reservationId
                    },
                    data: {
                        status: "Approved"
                    }
                })

                res.status(201).json(approved);

            } else {
                res.status(400).send('Daily quota exceeded for this date')
            }




            // const date = thisReservation.date.toISOString().slice(0, 10)
            // console.log(date)
            // if (thisRestaurant.daily_quotas[date] >= guestNumber) {

            //     const approved = await reservation.update({
            //         where: {
            //             id: +reservationId
            //         },
            //         data: {
            //             status: "Approved"
            //         }
            //     })

            //     thisRestaurant.daily_quotas[date] -= guestNumber

            //     await restaurant.update({
            //         where: {
            //             id: thisRestaurant.id
            //         },
            //         data: {
            //             daily_quotas: thisRestaurant.daily_quotas
            //         }

            //     })

            //     res.status(200).json(approved)

            // }

            // else {
            //     res.status(400).send('Daily quota exceeded for this date')
            // }

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
