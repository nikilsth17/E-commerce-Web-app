import { Product } from "./product.model.js";
import { convertDollarToCents } from "../utilis.js";
import { addValidationSchema } from "./product.validation.js";
import mongoose from "mongoose";

// =============     add product ========================================== 
export const addProduct= async(req,res)=>{
    //? phase 2
    //extract product from req.body
    const newProduct=req.body;
    // validate product using Joi
    try {
        await addValidationSchema.validateAsync(newProduct);
    } catch (error) {
            // if validate finally, terminate
        return res.status(400).send({message:error.message});
    }

    //add sellerId
    newProduct.sellerId=req.userInfo._id;

    // convert price to paisa or cent 
    const priceInPaisa= convertDollarToCents(newProduct.price);       //OR const priceInPaisa= newProduct.price*100;
    newProduct.price= priceInPaisa;

    // create new product
    await Product.create(newProduct);
    
    // send response 
    return res.status(201).send({message:"Product is added successfully."});
};

// ========================   delete a product ========================================

export const deleteProduct=async(req,res)=>{
    // extract id from params 
    const productId= req.params.id;
    // validate id for mongo id validity
    const isValidMongoId= mongoose.Types.ObjectId.isValid(productId);
    // if not valid mongoId Deadline, terminate
    if (!isValidMongoId){
        return res.status(401).send({message:"Invalid mongoId.."});
    }
    // find product 
    const product = await Product.findOne({_id:productId});        //or findById(productId)
    // if not product, terminate
    if (!product){
        return res.status(404).send({message:"product doesnot exists....."});
    }
    // check for product owernship
    // userInfo id must match with product's sellerId
    const isOwnerOfProduct= product.sellerId.equals(req.userInfo._id);
    // if no match, not allowed to delete
    if (!isOwnerOfProduct){
        return res.status(403).send({message:"You r not owner of this product."});
    }
    // delete product 
    await Product.deleteOne({_id:productId});
    //send response 
    return res.status(200).send({message:"Product is delete successfully."});
};

//===============  get the product details =============================

export const getProductDetails=async(req,res)=>{
    const productId= req.params.id;
    const isValidMongoId= mongoose.Types.ObjectId.isValid(productId);
    if (!isValidMongoId){
        return res.status(400).send({message:"Invalid mongoId..."});
    }
    const product= await Product.findById(productId);
    if (!product){
        return res.status(404).send({message:"Product doesnot exists.."});
    }
    return res.status(200).send(product);
};