const prisma = require("../model/index");

module.exports = {
  getCustomers: async (req, res) => {
    try {
      const customers = await prisma.user.findMany();

      res.status(201).json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
