import mongoose from "mongoose";

export const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        minlength:2,
        maxlength:55,
    },
    image:{
        type:String,
        required:false,
        trim: true,
    },
    description:{
        type:String,
        required:true,
        trim: true,
        minlength:100,
        maxlength:1000,
    },
    company:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    category:{
        type:String,
        required:true,
        trim:true,
        enum:["glocery","clothing","kitchen","electronics","bakery","furniture"],
    },
    freeShipping:{
        type:Boolean,
        default:false,
    },
    sellerId:{
        type:mongoose.ObjectId,
        required:true,
        ref:"User",
    },
    quantity:{
        type:Number,
        min:0,
        required:true,
    },
    color:{
        type:[String],
        required:false,
    },
    inStock:{
        type:Boolean,
        default:true,
    },
},
{
        timestamps:true,
}
   
    
);


export const Product= mongoose.model("Product",productSchema);