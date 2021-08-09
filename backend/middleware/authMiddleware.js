import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user =await User.findById(decoded.id).select("-password") 
      next()
    } catch (error) {
        console.error(error)
        res.status(401) 
        throw new Error('Not authorised token failed')
        
    }
  }
  if (!token){
      res.send(401)
      throw new Error('Not authorized, no token')
  }
  
});


const admin = asyncHandler( async(req, res, next) => {
if (req.user && req.user.isAdmin == true){
  next()
}else{
  res.status(401)
  throw new Error('Not authorised as an admin')
}
})

export { protect, admin };
