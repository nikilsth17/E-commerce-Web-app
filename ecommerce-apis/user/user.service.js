import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";
import { registerUserValidationSchema,loginUserValidationSchema } from "./user.validation.js";


//-----------register a user-------------------------
export const registerUser=async(req,res)=>{
    //extract userData from req.body
    const newUser= req.body;

    // validate data with joi
    try {
        await registerUserValidationSchema.validateAsync(newUser);
    } catch (error) {
            // if validation fail, terminate
        return res.status(400).send({message:error.message});
        
    }

    // check if user email is already exists
    const user= await User.findOne({email:newUser.email});
    // if already exists, terminate
    if (user){
        return res.status(409).send({message:"User with this email already exists."});
    }

    // hash password using bcrypt.hash()
   const hashedPassword=await bcrypt.hash(newUser.password,8);
    // replace req.body/ newUser.password with hashedPassword
    newUser.password= hashedPassword;

    // create user on db
    await User.create(newUser);
    
    // return response
    return res.status(200).send({message:"User is successfully registered."});
}

//-------------------------login user-------------------------------------------
export const loginUser=async(req,res)=>{
    const loginCredential= req.body;

    //validate login credentials
    
     
    try {
        await loginUserValidationSchema.validateAsync(loginCredential);
    } catch (error) {
            // if validation Fails, terminate
        return res.status(400).send({message:error.message});
        
    }

    // check if user with provided email exist
    const user= await User.findOne({email:loginCredential.email});

    // if not user,terminate
    if (!user){
        return res.status(404).send({message:"Invalid credentials"});
    }

    // check for password match using bcrypt.compare()
    const passwordMatch= await bcrypt.compare(
        loginCredential.password,
        user.password
    );

    // if not password Match, terminate
    if (!passwordMatch){
        return res.status(404).send({message:"Invalid credentials"});
    }

    //encrypt user information as a token using jsonwebtoken, jwt.sign(token,secret_key)
    const token=jwt.sign(
        {email:user.email},
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn:"1d",    //token limitation time
        }
    );

        //hide user password
    user.password=undefined;

    return res.status(200).send({user,token});
};