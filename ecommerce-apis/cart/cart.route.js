import express from "express";
import { isBuyer } from "../auth/auth.middleware.js";
import { quantityValidationSchema, updateQuantitySchema } from "./cart.validation.js";
import mongoose from "mongoose";
import { Product } from "../product/product.model.js";
import Cart from "./cart.model.js";



const router= express.Router();



//===========================get cart data    ============================
router.post("/cart/add/:id",isBuyer,async(req,res)=>{
    const productId= req.params.id;

    const ownerId= req.userInfo._id;
    const quantityData= req.body;


    // validate quantityData
    try {
        await quantityValidationSchema.validate(quantityData);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }

    //validate product id
    const isValidMongoId= mongoose.Types.ObjectId.isValid(productId);
    if (!isValidMongoId){
        return res.status(400).send({message:"Mongo id is invalid"});
    }

    //check product existence for this productId
    const product= await Product.findOne({_id:productId});
    if(!product){
        return res.status(400).send({message:"Product doesnot exists..."});
    }

    const cart= await Cart.findOne({
        ownerId,
        "productList.productId":productId,
    });
    if (cart){
        await Cart.updateOne({
            ownerId,"productList.productId":productId
        },
        {
            $inc:{
                "productList.$.quantity":quantityData.quantity,
            }
        })
    }
    else{
        await Cart.updateOne({ownerId:ownerId},
            {
                // push that product to cart 
                $push:{
                    productList:{
                        productId:productId,
                        quantity:quantityData.quantity,
                    },
                },
            },
            {
                upsert:true,
            });
    }

    return res.status(200).send({message:"Item is added to cart successfully."});
})


//================count cart item======================================
router.get("/cart/count",isBuyer,async(req,res)=>{
    const ownerId= req.userInfo._id;
    const cart= await Cart. findOne({ownerId});
    let count=0;
    if(!cart){
        count=0;
    }
    count = cart?.productList.length || 0;
    return res.status(200).send({count});
});


//------------------------ get cart data ==================================
router.get("/cart/data",isBuyer,async(req,res)=>{
    const ownerId=req.userInfo._id;
    const cartData= await Cart.aggregate([
        {
            $match:{
                ownerId:ownerId,
            },
        },
        {
            $unwind:"$productList",
        },
        {   
            $lookup:{
                from:"products",
                localField:"productList.productId",
                foreignField:"_id",
                as:"productDetails",
            }
        },
        {
            $project:{
                _id:0,
                productId:"$productList.productId",
                orderQuantity:"$productList.quantity",
                availableQuantity:{$first:"$productDetails.quantity"},
                image:{$first:"$productDetails.image"},
                name:{$first:"$productDetails.name"},
                company:{$first:"$productDetails.company"},
                price:{$first:"$productDetails.price"},  
            },
        },
        {
            $project:{
                productId:1,
                orderQuantity:1,
                availableQuantity:1,
                image:1,
                name:1,
                company:1,
                price:1,
                total:{
                    $multiply:["$price","$orderQuantity"]
                },

            }
        }
    ]);

    // const subTotal= cartData.reduce((total,item)=>{
    //     return total+item.total;
    // },0);
            // ========  OR-=============
    let subTotal=0;
    cartData.forEach((item)=>{
        subTotal= subTotal+item.total;
    })

    //fixed subtotal to 2 decimal place
    subTotal= subTotal.toFixed(2);
    // discount=> 5%
    const grandTotal=(0.95* subTotal).toFixed(2);

    return res.status(200).send({cartData,subTotal,grandTotal});
})



// -------------------remove item from cart----------------------------------- 
router.put("/cart/remove-item/:id",isBuyer,async(req,res)=>{
    const productId= req.params.id;
    const ownerId= req.userInfo._id;


    //validate productId
    const isValidProductId= mongoose.Types.ObjectId.isValid(productId); 
    if(!isValidProductId){
        return res.status(400).send({message:"Invalid MongoId....."});
    }

    //.check for product existence for this productId
    const product= await Product.findOne({_id:productId});
    if (!product){
        return res.status(404).send({message:"Product not exist...."});
    }

    await Cart.updateOne({
        ownerId:ownerId,
    },
    {
        $pull:{
            productList:{
                productId:productId,
            },
        },
    });

    return res.status(200).send({message:"Item is removed from cart."});
});



// update item quantity
router.put("/cart/update/quantity/:id",isBuyer,async(req,res)=>{
    const productId= req.params.id;
    const ownerId= req.userInfo._id;
    const optionData= req.body;
    //validate option data
    try {
        await updateQuantitySchema.validate(optionData);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }

    const isValidProductId= mongoose.Types.ObjectId.isValid(productId);
    if(!isValidProductId){
        return res.status(400).send({message:"invalid product id."});
    }


//check product avaliable quantity=======================
    const product = await Product.findOne({_id:productId})
    if (!product){
        return res.status(400).send({message:"Product doesnot exist.."});
    }

//provide product quantity
    const availableQuantity= product.quantity;

//find product order quantity from cart
    const cart = await Cart.findOne({ownerId:ownerId});
    if (!cart){
        return res.status(400).send({message:"Something went wrong.."});
    }

    const matchedCartProduct=cart.productList.filter((item)=>{
        return String(item.productId)=== productId;
    });
    const oldOrderQuantity= matchedCartProduct[0].quantity;
    const newOrderQuantity= 
        optionData.option===
            "increase"?
                oldOrderQuantity+1:
                oldOrderQuantity-1;

    if (newOrderQuantity>availableQuantity){
        return res.status(403).send({message:"Order quantity cant be greater than avaliable quantity."})
    }

    if (newOrderQuantity<1){
        return res.status(403).send({message:"Order quantity cant be less than 1."})
    }


//update quantity product ================================
    await Cart.updateOne({
        ownerId:ownerId,
        "productList.productId":productId,
    },
    {
        $inc:{
            "productList.$.quantity":optionData.option==="increase"?1:-1,
        }
    });

    return res.status(200).send({message:"Item quantity is successfully updated.."});

})
export default router;