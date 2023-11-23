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
const statsRouter = require('./routes/stats')
const prisma = require("./model/index");
var bodyParser = require('body-parser');


const app = express()



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


app.use('/api/admin', adminRouter)
app.use('/api/customers', customersRouter)
app.use('/api/owners', ownersRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/reservations', reservationsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/stats', statsRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})



