import express from "express";
import { registerUser,loginUser } from "./user.service.js";
import { updateUserValidationSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { isUser } from "../auth/auth.middleware.js";
import { Product } from "../product/product.model.js";


const router= express.Router();

//register user
router.post("/user/register",registerUser);

//login user
router.post("/user/login",loginUser);

//edit user== password
router.put("/user/edit",isUser,async(req,res)=>{
    const updateValue= req.body;

    try {
        await updateUserValidationSchema.validateAsync(updateValue);
    } catch (error) {
        return res.status(404).send({message:error.message});
    }

    const userId= req.userInfo._id;

    const hashedPassword= await bcrypt.hash(updateValue.password,8);

    await User.updateOne({_id:userId},{
        $set:{
            password:hashedPassword,
            gender:updateValue.gender,
            firstName:updateValue.firstName,
            lastName:updateValue.lastName,
            location:updateValue.location,
        },
    });

    return res.status(200).send({message:"Profile is updated successfully."});
});

// delete user
router.delete("/user/delete/account",isUser,async(req,res)=>{
    const user= req.userInfo;
    if (user.role==="seller"){
        await Product.deleteMany({sellerId:user._id});
    };

    await User.deleteOne({_id:user._id});
    return res.status(200).send({message:"Your account has been permanently deleted.."});

})





export default router;

