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

// create port 
const port= process.env.PORT;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}.`);
});


