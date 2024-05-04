import { Card, CardContent, ListItem, Typography } from "@mui/material";
import React from "react";
import { getRandomId } from "../utilis/randomIdGenerate";
import electronicsImage from "../assets/categories/electronics.jpg"
import kitchenImage from "../assets/categories/kitchen.jpeg"
import sportsImage from "../assets/categories/sports.jpeg"
import menImage from "../assets/categories/men.jpeg"
import womenImage from "../assets/categories/women.jpeg"
import healthImage from "../assets/categories/beauty.jpeg"
import homeImage from "../assets/categories/home.jpeg"
import groceriesImage from "../assets/categories/groceries.jpeg"

const category = [
  { name: "Electronics",image:electronicsImage },
  { name: "Kitchen tools", image: kitchenImage },
  { name: "Sports and outdoor",image:sportsImage },
  { name: "Men's fashion", image:menImage },
  { name: "Women's fashion",image:womenImage },
  { name: "Health and beauty",image:healthImage },
  { name: "Home and lifestyle",image:homeImage },
  { name: "Groceries and Pets", image:groceriesImage },
];

const Categories = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        gap: 10,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >

      {category?.map((category) => {
        return (
          <Card key={getRandomId()} sx={{ width:{xs:200,md:180,lg:180}, height: {xs:225,md:200,lg:200} }}>
            <CardContent>
            <img
                src={category.image}
                alt={category.name}
                style={{width: "100%", height: "20vh", }}
              />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Categories;
