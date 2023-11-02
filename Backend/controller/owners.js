const prisma = require("../model/index");

module.exports = {
  getOwners: async (req, res) => {
        try {
            const owners = await prisma.user.findMany() 
            res.status(201).json(owners);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}