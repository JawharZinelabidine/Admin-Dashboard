const prisma = require("../model/index");



module.exports = {
    createCustomer: async (req, res) => {
        try {
            await prisma.user.findMany()

            res.status(201).json('success!');
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}