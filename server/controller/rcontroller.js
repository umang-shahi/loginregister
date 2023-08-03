const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const bcrypt = require("bcryptjs");


//register
const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;

   
 
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role  ) {
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

      //salt generation and hash password
      const salt =  await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt)

      //for confirmPassword
      const seccPassword = await bcrypt.hash(confirmPassword,salt)
  

      //create user
      const user = await prisma.users.create({
        data: {
          firstName: firstName,
          lastName:lastName,
          email: email,
          password: secPassword,
          confirmPassword: seccPassword,
          role: role,
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