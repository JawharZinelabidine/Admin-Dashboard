const { payment } = require("../model/index");
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

    }


}