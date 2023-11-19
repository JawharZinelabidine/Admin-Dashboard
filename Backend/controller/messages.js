const { message } = require("../model/index");
require('dotenv').config();
const authenticateSocket = require('../middlwares/authenticateSocket.js')
const io = require("socket.io")(8900, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.137.69:8081"],
    },
});


io.use((socket, next) => {
    authenticateSocket(socket, next);
});

let users = [];

const addUser = (userId, socketId) => {

    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
};


io.on('connection', (socket) => {
    //when ceonnect
    console.log('a user connected', socket.id);

    //take userId and socketId from user
    socket.on("addUser", () => {
        addUser(socket.userId, socket.id);
        io.emit("getUsers", users)
    });


    //send message
    socket.on('sendMessage', ({ receiverId, text }) => {
        const user = getUser(receiverId)
        console.log(users)
        if (user) {
            console.log(user.socketId)
            io.to(user.socketId).emit("getMessage", {
                senderId: socket.userId,
                text
            });
        }



    })

    // //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
    });



});

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
            res.status(500).json({ error: "couldn't send message" })

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

            res.status(500).json({ error: "couldn't send message" })

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
                    restaurantId: +restaurantId
                }
            })

            res.status(200).json(messages)

        } catch (error) {
            console.log(error)
            res.status(500).send('Couldnt get messages')

        }
    },



}