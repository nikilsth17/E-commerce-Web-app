import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { SiMinutemailer } from "react-icons/si";
import { MdLocalPhone } from "react-icons/md";
import { PiInstagramLogoLight } from "react-icons/pi";
import { IoLogoGithub } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container spacing={4} padding={{xs:2,md:5,lg:5}}>
        <Grid item xs={12} md={4}>
          <Typography>NepMart</Typography>
          <Typography>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia
          </Typography>
          <div style={{display:"flex",flexDirection:"row",gap:10,margin:10}}>
            <Avatar className="avatar" sx={{ backgroundColor: "#dbcc8f",width:50,height:50 }}>
              <PiInstagramLogoLight color="black" />
            </Avatar>
            <Avatar className="avatar" sx={{ backgroundColor: "#dbcc8f",width:50,height:50 }}>
              <IoLogoGithub color="black" />
            </Avatar>
            <Avatar  sx={{ backgroundColor: "#dbcc8f",width:50,height:50 }}>
              <FaLinkedin color="black" />
            </Avatar>
            <Avatar sx={{ backgroundColor: "#dbcc8f",width:50,height:50 }}>
              <CiFacebook color="black" />
            </Avatar>
          </div>
        </Grid>
        <Grid item xs={6} md={2}>
          <h3>MENU</h3>
          <ul>
            <li>Shop</li>
            <li>About</li>
            <li>Journal</li>
            <li>Contact Us</li>
          </ul>
        </Grid>
        <Grid item xs={6} md={2} sx={{}}>
          <h3>HELP</h3>
          <ul>
            <li>Shipping information</li>
            <li>Terms and Conditions</li>
            <li>Privacy policy</li>
            <li>Contact Us</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <h3>HAVE A QUESTIONS?</h3>
          <Box sx={{justifyContent:"center",alignItems:"center"}}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <SlLocationPin size={24} />
              <Typography sx={{ alignItems: "center", textAlign: "left" }}>
                Bhulankhel-5, Madhyapur Thimi,Bhaktapur, Nepal
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                marginTop: 2,
              }}
            >
              <SiMinutemailer size={24} />
              <Typography sx={{ alignItems: "center", textAlign: "left" }}>
                nikillawo7@gmail.com
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                marginTop: 2,
              }}
            >
              <MdLocalPhone size={24} />
              <Typography sx={{ alignItems: "center", textAlign: "left" }}>
                +977 9823525431
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid sx={{display:"flex",textAlign:"center",alignItems:"center",justifyContent:"center"}}>
        <Typography variant="h6" sx={{ color: "#CCCCCC" }}>
          Copyright &copy; 2023 Nepmart | This template is made by Nikil
          Shrestha
        </Typography>
      </Grid>
    </div>
  );
};

export default Footer;
