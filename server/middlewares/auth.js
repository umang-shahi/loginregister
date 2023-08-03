const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// authentication

const auth = async(req,res,next)=>{
    try {
          let token = req.headers.authorization;
          const formattedToken = token.replace(/^Bearer\s/, '');
          

          if(!formattedToken){
            return res.status(401).json({
                success:false,
                message:"please login at first!"
            })
          }

      
      const decodedData = jwt.verify(formattedToken,process.env.secretKey )

      const user = await prisma.users.findById(decodedData.id);


    
     
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found!",
        });
      }

      req.user = user;
   
     next();




        
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({
                success:false,
                message: "Token Expired!"
            })
        }else{
            return res.status(500).json({
                success:false,
                message: error.message
            })
        }
    }
}


module.exports = auth;


//authorization(admin role)

const isAuthAdmin = (req,res,next)=>{
    if(!req.user){

    return res.status(401).json({
      success: false,
      message: "You must be Authenticate to access this resource!",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: `${req.user.role} is not authorize to access this resource!`,
    });
  }

  next();
};

module.exports = isAuthAdmin;