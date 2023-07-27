const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');

//register
const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "filled can't be empty!",
    });
  }

  try {
    const registers = await prisma.register.create({
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
      message: "user register successfully!",
      registers,
    });

      const exists = await registers.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "email already exists!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




//login

const login = async(req,res)=>{

    const {email, password }= req.body;

    if (!email || !password){
        return res.status(500).json({
            success:false,
            message:"filled must be filled",
        })
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Email must be valid!",
        });
      }

      try {
        const user = await register.findOne({ email }).select("+password");
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "user doesnot found",
          });
        }
        const isMatch = await prisma.register.comparePassword(password);
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Invalid credentials",
          });
        }
        const token = user.getJwtToken();
        return res.status(200).json({
          success: true,
          message: "login successfull",
          user,
          token,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
    


module.exports = {register,login};










module.exports = { register };
