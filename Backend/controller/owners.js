const prisma = require("../model/index");
const { user } = require("../model/index");
const bcrypt = require("bcrypt");

module.exports = {
    getOwners: async (req, res) => {
        try {
            const owners = await user.findMany();
            res.status(200).json(owners);

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    createOwner: async (req, res) => {
        const { fullname, email, password } = req.body;
        try {
            const checkemail = await user.findUnique({
                where: { email },
            });
            if (checkemail) {
                return res.status(400).json({ error: "Email already exists" });
            }
            const hashpassword = await bcrypt.hash(password, 10);
            const owner = await user.create({
                data: {
                    fullname,
                    email,
                    password: hashpassword,
                    role: "OWNER",
                },
            });
            res.status(201).json(owner);
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
    signin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const owner = await user.findUnique({
                where: { email },
            });
            console.log(owner);
            if (!owner)
                return res.status(410).json({ error: "Email doesn't exist" });
            const passwordMatch = await bcrypt.compare(password, owner.password);
            if (!passwordMatch)
                return res.status(411).json({ error: "unvalid password" });
            return res.status(201).json({ meesage: "owner successfully logged in" });
        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
};