const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');



// login

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
        const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'user does not exist',
      });
    }

    if (password !== user.password) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
       
      const payload = {
        id: user.id, 
        role: user.role
      };

      const secretKey = 'your_secret_key';

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });


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
    

module.exports = login;











