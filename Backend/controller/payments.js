const { payment, restaurant } = require("../model/index");
const axios = require('axios');
require('dotenv').config();
const stripe = require('stripe')(process.env.CLIENT_SECRET)


module.exports = {

    paymentIntent: async (req, res) => {
        try {
            const intent = await stripe.paymentIntents.create({
                amount: 10000,
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true
                }
            })

            res.json({ paymentIntent: intent.client_secret })
        }
        catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }

    },

    setPremium: async (req, res) => {
        const id = req.userId
        try {


            const myRestaurant = await restaurant.update({
                where: {
                    ownerId: id
                },
                data: {
                    accountType: 'PREMIUM'
                }
            })

            const myPayment = await payment.create({
                data: {
                    restaurant_name: myRestaurant.name
                }

            })

            res.status(204).json({ message: 'Premium account created', payment: myPayment })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })

        }

    },

    setBasic: async (req, res) => {
        const id = req.userId
        try {

            await restaurant.update({
                where: {
                    ownerId: id
                },
                data: {
                    accountType: 'BASIC'
                }
            })

            res.status(204).json({ message: 'Basic account created' })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }


    },
}