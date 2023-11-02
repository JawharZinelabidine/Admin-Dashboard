const express = require('express')
const cors = require('cors')
const adminRouter = require('./routes/customers')
const customersRouter = require('./routes/customers')
const ownersRouter = require('./routes/owners')
const restaurantsRouter = require('./routes/restaurants')
const reservationsRouter = require('./routes/customers')
const reviewsRouter = require('./routes/customers')
const messagesRouter = require('./routes/customers')
const paymentsRouter = require('./routes/customers')
const prisma = require("./model/index");


const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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