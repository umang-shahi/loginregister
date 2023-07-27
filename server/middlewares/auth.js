const jwt = require("jsonwebtoken");


//authentication

const auth = async(req,res,next)=>{
    try {
          let token = req?.headers?.authorization?.replace("Bearer","");

          if(!token){
            return res.status(401).json({
                success:false,
                message:"please login at first!"
            })
          }
      const decodedData = jwt.verify(token,process.env.JWT_SECRET)
      const user = await register.findById(decodedData.id);
      if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found!"
        })
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
            return res.status(500),json({
                success:false,
                message: error.message
            })
        }
    }
}


module.exports = auth;