const cron = require('node-cron')
const { reservation, user, restaurant } = require("../model/index");
const axios = require('axios');


cron.schedule('*/10 * * * * *', async () => {

    console.log('Daily task is running')
    try {
        const consumedReservations = await reservation.findMany({
            where: {
                status: 'Approved',
                canReview: false,
                OR: [
                    {
                        date: {
                            lte: new Date()
                        },
                        time: {
                            lte: new Date()
                        },
                    },

                ]
            },
        });

        console.log(new Date())

        if (consumedReservations.length > 0) {
            for (const thisReservation of consumedReservations) {
                await reservation.update({
                    where: { id: thisReservation.id },
                    data: { canReview: true },
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