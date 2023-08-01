const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');


//register
const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
  console.log(req.body)
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Fields can't be empty!",
      });
    }

        if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Email must be valid!",
        });
      }
      if (password.length < 5) {
        return res.status(400).json({
          success: false,
          message: "password must have 5 characters long!",
        });
      }
  
    try {

      const exists = await prisma.users.findUnique( {where:{email }});
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "email already exists!",
        });
      }
  
      const user = await prisma.users.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
      });
  
      res.status(200).json({
        success: true,
        message: "User registered successfully!",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = register;