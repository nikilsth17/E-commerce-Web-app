import express from "express";
import { isBuyer, isSeller, isUser } from "../auth/auth.middleware.js";
import { addProduct, deleteProduct, getProductDetails } from "./product.service.js";
import { addValidationSchema, buyerProductListValidationSchema, paginationValidationSchema } from "./product.validation.js";
import { Product } from "./product.model.js";
import mongoose from "mongoose";




const router= express.Router();
//add product
router.post("/product/add",isSeller,addProduct);

// delete product 
router.delete("/product/delete/:id",isSeller,deleteProduct);

// get product details
router.get("/product/details/:id",isUser,getProductDetails);

// get products seller point of view 
router.post("/product/seller/all",isSeller,async(req,res)=>{
    const paginationDetails= req.body;
    try {
        await paginationValidationSchema.validateAsync(paginationDetails);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
    //calculate skip
    const skip= (paginationDetails.page-1)*paginationDetails.limit;


    //extract searchText    
    const searchText= paginationDetails?.searchText;

    let match={}
    match.sellerId=req.userInfo._id;
    if (searchText){
        match.name={$regex:searchText,$options:"i"};
    }
    //start find query
    const products= await Product.aggregate([
        {
            $match:match,
        },
        {
            $sort:{
                createdAt:-1,
            },
        },
        {
            $skip:skip,
        },
        {
            $limit:paginationDetails.limit,
        },
        {
            $project:{
                name:1,
                price:1,
                company:1,
                description:1,
                category:1,
                image:1,
            }
        }
    ]);

    //total products
    const totalMatchingProduct= await Product.find({
        sellerId:req.userInfo._id,
    }).count();
 
    //page calculation
    const totalPage=Math.ceil(totalMatchingProduct/paginationDetails.limit);
    return res.status(200).send({products,totalPage});

});


// get product buyer point of view 
router.post("/product/buyer/all",isBuyer,async(req,res)=>{
    const input= req.body;
    try {
        await buyerProductListValidationSchema.validateAsync(input);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }


    const skip = (input.page-1)*input.limit;

// extract searchtext================
    const searchText= input?.searchText;
    let minPrice= input?.minPrice;
    let maxPrice= input?.maxPrice;
    let category= input?.category;

    let match={}
    if (searchText){
        match.name= {$regex:searchText,$options:"i"};
    }

    if (minPrice){
        match.price={$gte:minPrice};
    }
    if (maxPrice){
        match.price={...match.price,$lte:maxPrice};
    }
    if (category?.length>0){
        match.category={ $in:category};
    }
    const products= await Product.aggregate([
        {
            $match:match,
        },
        {
            $skip:skip,
        },
        {
            $limit:input.limit,
        },
        {
            $project:{
                name:1,
                price:1,
                company:1,
                description:1,
                image:1,
            }
        }
    ]);

    //calculate total page
    const totalProduct= await Product.find(match).count();
    const totalPage= Math.ceil(totalProduct/input.limit);
    return res.status(200).send({products,totalPage});
})

//edit product
router.put("/product/edit/:id",isSeller,async(req,res)=>{
    const productId= req.params.id;
    const newValues= req.body;
    //validate id from mongoid validity
    const isValidMongoId=mongoose.Types.ObjectId.isValid(productId);

    if (!isValidMongoId){
        return res.status(400).send({message:"Invalid mongoId.."});

    }

    //validate newvalues from req.body
    try {
        await addValidationSchema.validateAsync(newValues);
    } catch (error) {
        return res.status(404).send({message:error.message});
    }

    //check for product existence using productId
    const product= await Product.findOne({_id:productId});
    if (!product){
        return res.status(400).send({message:"Product not exist.."});
    }

    //check if userinfo is owner of product
    const isOwnerOfProduct= product.sellerId.equals(req.userInfo._id);
    if(!isOwnerOfProduct){
        return res.status(403).send({message:"You arenot owner of this product."});
    }

    //update product
    await Product.updateOne({_id:productId},newValues);
    return res.status(200).send({message:"the product is successfully edited.."});
})


//get latest product
router.get("/product/latest",isBuyer,async(req,res)=>{
    const product= await Product.aggregate([
        {
            $match:{}
        },
        {
            $sort:{createdAt:-1},
        },
        {
            $limit:6,
        },
        {
            $project:{
                name:1,
                description:1,
                company:1,
                price:1,
                image:1,
            },
        }
    ])
    return res.status(200).send(product);
})
export default router;