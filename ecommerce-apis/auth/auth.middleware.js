import jwt from "jsonwebtoken";
import {User} from "../user/user.model.js";


export const isSeller=async(req,res,next)=>{

    try {
         //?phase1
    
        // extract token from headers 
        const authorization= req?.headers?.authorization;
        const splittedArray=authorization?.split(" ");
        const token= splittedArray?.length===2 && splittedArray[1];

        // if not token, terminate
        if (!token){
            throw Error("Unathourised");
        };

        // decrypt token using JsonWebTokenError.verify(token, secret key)
        const userData=jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        
        // find user from email decrypted from token 
        const user= await User.findOne({email:userData.email});
        // if not User, terminate
        if(!user){
            throw new Error("Unauthorised");
        }
        // if user role is not seller, terminate
        if (user.role!=="seller"){
            throw new Error("Unauthorised.");
        }
        //add user to req.userInfo
        req.userInfo= user;
        next();
    } catch (error) {
        return res.status(401).send({message:"Unauthourised."})
    }
};

// buyer role check 
export const isBuyer=async(req,res,next)=>{

    try {
         //?phase1
    
        // extract token from headers 
        const authorization= req?.headers?.authorization;
        const splittedArray=authorization?.split(" ");
        const token= splittedArray?.length===2 && splittedArray[1];

        // if not token, terminate
        if (!token){
            throw Error("Incorrect token...");
        };

        // decrypt token using JsonWebTokenError.verify(token, secret key)
        const userData=jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        
        // find user from email decrypted from token 
        const user= await User.findOne({email:userData.email});
        // if not User, terminate
        if(!user){
            throw new Error("User not exist...");
        }
        // if user role is not seller, terminate
        if (user.role!=="buyer"){
            throw new Error("User is not buyer");
        }
        //add user to req.uerInfo
        req.userInfo= user;
        next();
    } catch (error) {
        return res.status(401).send({message:"Unauthourised....."})
    }
};

// just logged in user 
export const isUser=async(req,res,next)=>{

    try {
         //?phase1
    
        // extract token from headers 
        const authorization= req?.headers?.authorization;
        const splittedArray=authorization?.split(" ");
        const token= splittedArray?.length===2 && splittedArray[1];

        // if not token, terminate
        if (!token){
            throw Error("Unathourised");
        };

        // decrypt token using JsonWebTokenError.verify(token, secret key)
        const userData=jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        
        // find user from email decrypted from token 
        const user= await User.findOne({email:userData.email});
        // if not User, terminate
        if(!user){
            throw new Error("Unauthorised");
        }
    
        //add user to req.uerInfo
        req.userInfo= user;
        next();
    } catch (error) {
        return res.status(401).send({message:"Unauthourised."})
    }
};