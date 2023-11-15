const express = require('express')
const cors = require('cors')
const adminRouter = require('./routes/admin')
const customersRouter = require('./routes/customers')
const ownersRouter = require('./routes/owners')
const restaurantsRouter = require('./routes/restaurants')
const reservationsRouter = require('./routes/reservations')
const reviewsRouter = require('./routes/reviews')
const messagesRouter = require('./routes/messages')
const paymentsRouter = require('./routes/payments')
const prisma = require("./model/index");
var bodyParser = require('body-parser');
const app = express()

const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



const connect = async () => {
    try {
        await prisma.$connect()
        console.log("connected successfully!")
    }
    catch (error) {
        console.log(error, 'not connected')
    }
}

connect()



socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});


app.use('/api/admin', adminRouter)
app.use('/api/customers', customersRouter)
app.use('/api/owners', ownersRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/reservations', reservationsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/payments', paymentsRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})