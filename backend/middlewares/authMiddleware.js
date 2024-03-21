
const jwt = require('jsonwebtoken');
// const { secretKey } = require('../config');
const User = require('../models/user');
const asyncHandler = require('express-async-handler')


const authMiddleware = asyncHandler(async(req,res,next)=>{  
  let token; 
 
 token =req.cookies.jwt; 

  if (token) {
   

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
           req.user= await User.findById(decoded.userId).select('-password');
           next();
   
   
  } catch (error) {
    res.status(401);
        throw new Error("Not authorized,invaild token");
  }
}else{
  res.status(401); 
  throw new Error("Not authorized,no token");
}

});


const isAdmin = asyncHandler(async (req, res, next) => {
  let token; 
  token =req.cookies.jwt; 
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  req.user= await User.findById(decoded.userId)
  const { email} = req.user;

  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
  throw new Error("You are not an admin");
  } else {
  next(); 
  }
  });

module.exports = authMiddleware,isAdmin;

// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// // const asyncHandler = require('express-async-handler')

//  const protect = asyncHandler(async(req,res,next)=>{  
//  let token; 
 
//  token =req.cookies.jwt; 
//  if(token){
//     try{
//            const decoded = jwt.verify(token,process.env.JWT_SECRET);
//            req.user= await User.findById(decoded.userId).select('-password');
//            next();

//     } catch (error){ 
//         res.status(401);
//         throw new Error("Not authorized,invaild token");
//     }
// } else{
//     res.status(401); 
//     throw new Error("Not authorized,no token");
// }
//  });

//  const isAdmin = asyncHandler(async (req, res, next) => {
//     let token; 
//     token =req.cookies.jwt; 
//     const decoded = jwt.verify(token,process.env.JWT_SECRET);
//     req.user= await User.findById(decoded.userId)
//     const { email} = req.user;

//     const adminUser = await User.findOne({ email });
//     if (adminUser.role !== "admin") {
//     throw new Error("You are not an admin");
//     } else {
//     next(); 
//     }
//     });


//     module.exports = protect,isAdmin;
