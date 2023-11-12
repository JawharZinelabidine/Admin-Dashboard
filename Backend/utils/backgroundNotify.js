const cron = require('node-cron')
const { reservation, user, restaurant } = require("../model/index");
const axios = require('axios');
const moment = require('moment-timezone');


cron.schedule('*/10 * * * * *', async () => {

    const now = moment().utcOffset('120');
    const zone = now.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    console.log('Daily task is running', zone)

    try {
        console.log()
        const consumedReservations = await reservation.findMany({
            where: {
                status: 'Approved',
                canReview: 'Pending',
                OR: [
                    {
                        date: {
                            lte: zone
                        },
                        time: {
                            lte: zone
                        },
                    },

                ]
            },
        });


        if (consumedReservations.length > 0) {
            console.log(zone)

            for (const thisReservation of consumedReservations) {
                await reservation.update({
                    where: { id: thisReservation.id },
                    data: {
                        canReview: 'Yes',
                        notification: true
                    },
                });


                const { expoToken } = await user.findUnique({
                    where: {
                        id: thisReservation.customerId
                    }
                })
                const { name } = await restaurant.findUnique({
                    where: {
                        id: thisReservation.restaurantId
                    }
                })
                const title = `Leave a review for ${name}`;
                const body = `We hope you enjoyed your time at ${name}. Leave a review to let them know!`;
                const route = 'Review'
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
                    console.log('notification sent!')

                } catch (notificationError) {
                    console.error('Failed to send notification:', notificationError);
                }


            }


        }

        else console.log('No consumed reservations!')

    }
    catch (error) {
        console.log('scheduled task failed', error)

    }


})