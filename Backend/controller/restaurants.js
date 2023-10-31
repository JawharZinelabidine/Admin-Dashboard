const { restaurant } = require("../model/index");


module.exports = {
    createRestaurant: async (req, res) => {
        const { name, category, description, main_image, menu_images, phone_number, reservation_quota,
            latitude, longtitude, opening_time, closing_time, ownerId } = req.body
        console.log(new Date(opening_time))


        try {
            const business = await restaurant.create({
                data: {
                    name: name, category: category, description: description, main_image: main_image,
                    menu_images: menu_images, phone_number: phone_number, reservation_quota: reservation_quota,
                    latitude: latitude, longtitude: longtitude, opening_time: new Date(opening_time), closing_time: new Date(closing_time),
                    ownerId: ownerId
                }
            })

            res.status(201).json(business);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}