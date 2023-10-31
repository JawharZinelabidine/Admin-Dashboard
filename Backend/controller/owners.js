const { user } = require("../model/index");
const bcrypt = require("bcrypt");



module.exports = {
    createOwner: async (req, res) => {
        const { fullname, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const owner = await user.create({
                data: {
                    fullname: fullname, email: email, password: hashedPassword, role: "OWNER"
                }
            })

            res.status(201).json(owner);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}


