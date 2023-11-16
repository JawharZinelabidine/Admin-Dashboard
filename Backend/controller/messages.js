const { message } = require("../model/index");
const axios = require('axios');
require('dotenv').config();


module.exports = {

    ownerSend: async (req, res) => {
        const id = req.userId
        const customerId = req.params.customerId
        const msg = req.body.message
        try {

            const messageSent = await message.create({
                data: {
                    message: msg,
                    restaurantId: id,
                    customerId: +customerId,
                    sender: 'restaurant'

                }
            })

            res.status(201).json(messageSent)

        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: error })

        }

    },

    customerSend: async (req, res) => {
        const id = req.userId
        const restaurantId = req.params.restaurantId
        const msg = req.body.message
        try {

            const messageSent = await message.create({
                data: {
                    message: msg,
                    customerId: id,
                    restaurantId: +restaurantId,
                    sender: 'customer'

                }
            })
            res.status(201).json(messageSent)

        }
        catch (error) {
            console.log(error)

            res.status(500).json({ error: error })

        }

    },

    getRestaurantConversations: async (req, res) => {

        const id = req.userId
        try {

            const conversations = await message.groupBy({
                by: ['customerId', 'createdAt'],
                where: {
                    restaurantId: id
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            res.status(200).json(conversations)


        } catch (error) {
            console.log(error)
            res.status(500)

        }
    },
    getCustomerConversations: async (req, res) => {

        const id = req.userId
        try {

            const conversations = await message.groupBy({
                by: ['restaurantId', 'createdAt'],
                where: {
                    customerId: id
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })




            res.status(200).json(conversations)



        } catch (error) {
            console.log(error)
            res.status(500)

        }
    },

    getRestaurantMessages: async (req, res) => {

        const id = req.userId
        const customerId = req.params.customerId
        try {

            const messages = await message.findMany({
                where: {
                    restaurantId: id,
                    customerId: +customerId
                }
            })

            res.status(200).json(messages)

        } catch (error) {
            console.log(error)
            res.status(500).send('Couldnt get messages')

        }
    },

    getCustomerMessages: async (req, res) => {

        const id = req.userId
        const restaurantId = req.params.restaurantId
        try {

            const messages = await message.findMany({
                where: {
                    customerId: id,
                    restaurantId: restaurantId
                }
            })

            res.status(200).json(messages)

        } catch (error) {
            console.log(error)
            res.status(500).send('Couldnt get messages')

        }
    }

}