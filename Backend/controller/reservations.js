const { reservation, restaurant, user } = require("../model/index");
const axios = require('axios');

module.exports = {

    sendReservationRequest: async (req, res) => {
        const { date, time, guest_number } = req.body
        const { restaurantId } = req.params
        const id = req.userId
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
            console.log(spotsTaken)

            if (spotsTaken + guest_number <= thisRestaurant.reservation_quota) {
                const request = await reservation.create({
                    data: {
                        date: new Date(date), time: new Date(time), guest_number: guest_number, customerId: id, restaurantId: +restaurantId
                    }
                })

                res.status(201).json(request);

                if (request) {
                    try {

                        await user.update({
                            where: {
                                id: thisRestaurant.ownerId
                            },
                            data: {
                                hasNotification: true
                            }
                        })

                    } catch (error) {
                        console.log('Failed to change notification status:', error)


                    }

                }

            } else {
                const remaining = thisRestaurant.reservation_quota - spotsTaken
                res.status(400).json(remaining)
            }

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
                    date: {
                        gte: new Date().toISOString()
                    },
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
                        { status: "Declined" }
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

            if (spotsTaken + guestNumber <= thisRestaurant.reservation_quota) {
                const approved = await reservation.update({
                    where: {
                        id: +reservationId
                    },
                    data: {
                        status: "Approved"
                    }
                })

                if (approved) {
                    const { expoToken } = req.params
                    const title = 'Reservation approved!';
                    const body = `Your reservation with ${thisRestaurant.name} has been approved.`;
                    const route = 'Reservation'
                    try {
                        const { data } = await axios.post(
                            'https://exp.host/--/api/v2/push/send',
                            {
                                to: expoToken,
                                title,
                                body,
                                data: {
                                    route
                                }

                            }
                        );

                    } catch (notificationError) {
                        console.error('Failed to send notification:', notificationError);
                    }
                    try {

                        await user.update({
                            where: {
                                id: thisReservation.customerId
                            },
                            data: {
                                hasNotification: true
                            }
                        })

                    } catch (error) {
                        console.log('Failed to change notification status:', error)


                    }

                }

                res.status(201).json(approved);

            } else {
                res.status(400).send('Daily quota exceeded for this date')
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    },

    rejectReservation: async (req, res) => {
        const { reservationId } = req.params

        const thisReservation = await reservation.findUnique({
            where: {
                id: +reservationId
            }
        })

        const thisRestaurant = await restaurant.findUnique({
            where: { id: thisReservation.restaurantId }
        })

        try {

            const Declined = await reservation.update({
                where: {
                    id: +reservationId
                },
                data: {
                    status: "Declined"
                }
            })

            if (Declined) {
                const { expoToken } = req.params
                const title = 'Your reservation was declined.';
                const body = `Your reservation with ${thisRestaurant.name} has been declined.`;
                const route = 'History'
                try {
                    const { data } = await axios.post(
                        'https://exp.host/--/api/v2/push/send',
                        {
                            to: expoToken,
                            title,
                            body,
                            data: {
                                route
                            }

                        }
                    );

                } catch (notificationError) {
                    console.error('Failed to send notification:', notificationError);
                }
                try {

                    await user.update({
                        where: {
                            id: thisReservation.customerId
                        },
                        data: {
                            hasNotification: true
                        }
                    })


                } catch (error) {
                    console.log('Failed to change notification status:', error)


                }
            }


            res.status(200).json(Declined)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    },


    fetchUpcomingReservations: async (req, res) => {
        const id = req.userId
        try {
            const upcoming = await reservation.findMany({
                where: {
                    customerId: id,
                    date: {
                        gte: new Date().toISOString()
                    },
                    OR: [
                        { status: "Approved" },
                        { status: "Pending" }
                    ]

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
        const id = req.userId

        try {
            const expired = await reservation.findMany({
                where: {
                    customerId: id,

                    OR: [
                        {
                            date: {
                                lte: new Date().toISOString()
                            },
                        },
                        { status: "Declined" }
                    ]
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
