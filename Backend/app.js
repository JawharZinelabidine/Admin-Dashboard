const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
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

app.use('/api/users', usersRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})