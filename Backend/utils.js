const cron = require('node-cron')
const { restaurant } = require("./model/index")


cron.schedule('00 00 * * *', async () => {

    console.log('Daily task is running')
    // Fetch the rows from the database
    try {
        const restaurants = await restaurant.findMany();

        // Iterate over the rows
        for (const aRestaurant of restaurants) {
            const oldDate = { ...aRestaurant.daily_quotas };

            // Iterate over the keys in the JSON object
            for (const key in oldDate) {
                if (new Date(key) <= new Date()) {
                    // Check if the key represents a past date
                    // If it does, update the value (or perform any other operation)
                    delete oldDate[key]
                }
            }

            await restaurant.updateMany({
                where: { id: aRestaurant.id },
                data: {
                    daily_quotas: oldDate
                }
            })
            console.log('success!')
        }
    } catch (error) {
        console.log('failed', error)
    }


})
