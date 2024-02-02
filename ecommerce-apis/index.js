import express from "express";
import { db_connnect } from "./db_connect.js";
import userRoutes from "./user/user.route.js";
import productRoutes from "./product/product.route.js";
import cors  from "cors";
import cartRoutes from "./cart/cart.route.js";

const app= express();
app.use(cors({origin:"*"}));

app.use(express.json());

await db_connnect();
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);



//allow cors
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//     );

//     if (req.method==="OPTIONS"){
//         res.header("Access-Control-Expose-Headers","accessToken,refreshToken,");
//         res.header(
//             "Access-Control-Allow-Methods",
//             "PUT,POST,PATCH,DELETE,GET,OPTIONS"
//         );
//         return res.status(200).json({});
//     }
//     return next;
// })

// create port 
const port= process.env.PORT;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}.`);
});


