const { user, restaurant } = require("../model/index");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { sendingMail } = require("../utils/mailing");
require("dotenv").config();

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
      const verifyToken = crypto.randomBytes(32).toString("hex");

      const owner = await user.create({
        data: {
          fullname,
          email,
          password: hashpassword,
          role: "OWNER",
          verifyToken,
        },
      });
      const verificationLink = `http://localhost:5173/owners/verify/${verifyToken}`;
      await sendingMail({
        from: process.env.EMAIL,
        to: owner.email,
        subject: "Email Verification",
        text: `Click the following link to verify your email: ${verificationLink}`,
      });

      res.status(201).json({ message: "User registered successfully. Please check your email for verification instructions." });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.params;
    try {
      const owner = await user.findFirst({
        where: { verifyToken: token },
      });

      if (!owner) {
        return res.status(404).json({ error: "Invalid verification token" });
      }

      await user.update({
        where: { id: owner.id },
        data: {
          isVerified: true,
          verifyToken: null,
        },
      });

      res.status(200).json({ message: "Email verified successfully. You can now log in.", owner: owner.id, });



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
      if (!owner) return res.status(410).json({ error: "Email doesn't exist" });
      const passwordMatch = await bcrypt.compare(password, owner.password);
      if (!passwordMatch)
        return res.status(411).json({ error: "unvalid password" });

      if (!owner.isVerified) {
        const verifyToken = crypto.randomBytes(32).toString("hex");
        await user.update({
          where: { id: owner.id },
          data: {
            verifyToken,
          },
        });
        const verificationLink = `http://localhost:5173/owners/verify/${verifyToken}`;
        await sendingMail({
          from: process.env.EMAIL,
          to: owner.email,
          subject: "Email Verification",
          text: `Click the following link to verify your email: ${verificationLink}`,
        });

        return res.status(401).json({
          error:
            "Account not verified. Another verification email has been sent. Please check your email for instructions.",
        });
      }
      else {
        const token = jwt.sign({ ownerId: owner.id, role: owner.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const payload = JSON.parse(atob(base64));

        const myRestaurant = await restaurant.findFirst({
          where: {
            ownerId: owner.id,
          },
        });
        if (!myRestaurant) {
          res.status(201).json({ message: "User hasn't created a restaurant", owner: owner.id })
        }
        else return res.status(201).json({ message: "owner successfully logged in", owner: owner.id });
      }
    }
    catch (error) {
      res.status(500).send(error);
      console.log(error);
    }

  },
  checkNotification: async (req, res) => {
    const id = req.params.id

    try {
      const { hasNotification } = await user.findUnique({
        where: {
          id: +id
        }
      })
      console.log(hasNotification)
      res.status(200).send(hasNotification)

    } catch (error) {

      console.log(error)
      res.status(500).json({ message: 'Failed to retrieve notification status' })

    }

  },
  removeNotification: async (req, res) => {
    const id = req.params.id

    try {
      const { hasNotification } = await user.update({
        where: {
          id: +id
        },
        data: {
          hasNotification: false
        }
      })
      console.log(hasNotification)
      res.status(200).send(hasNotification)

    } catch (error) {

      console.log(error)
      res.status(500).json({ message: 'Failed to update notification status' })

    }

  },
}
