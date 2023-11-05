const prisma = require("../model/index");
const { user } = require("../model/index");
const bcrypt = require("bcrypt");

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



    createCustomers: async (req, res) => {
        const { fullname, email, password } = req.body;
        try {
            const checkemail = await user.findUnique({
                where: { email },
            });
            if (checkemail) {
                return res.status(400).json({ error: "Email already exists" });
            }
            const hashpassword = await bcrypt.hash(password, 10);
            const customer = await user.create({
                data: {
                    fullname,
                    email,
                    password: hashpassword,
                    role: "CUSTOMER",
                },
            });
            res.status(201).json(customer);
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }


    },


    customerSignin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const customer = await user.findUnique({
                where: { email },
            });
            console.log(customer);
            if (!customer)
                return res.status(410).json({ error: "Email doesn't exist" });
            const passwordMatch = await bcrypt.compare(password, customer.password);
            if (!passwordMatch)
            return res.status(411).json({ error: "unvalid password" });
            return res.status(201).json({ meesage: "customer successfully logged in" });
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
}

