import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import nike from "../assets/nike.png";

const HeroSection = () => {
  return (
    <Swiper
      // spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div
          style={{
            display: "flex",
            flexDirection: {xs:"column",md:"column",lg:"row"},
    
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <Typography
            component="div"
            style={{textAlign:"left", display: "flex", flexDirection: "column", gap: 10 }}
          >
            <Box className="arrival-typo">#New Arrival</Box>
            <Box className="h6-typo">New Winter Collection</Box>
            <Box className="h4-typo">
              Find the new collection in this <br />
              winter Season
            </Box>
            <button>Discover Now</button>
          </Typography>

          <img src={nike}></img>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div
          style={{
            display: "flex",
            textAlign: "left",
            justifyContent: "center",
            alignItems: "center",
            flexWrap:"wrap",
            flexDirection: {xs:"column",md:"column",lg:"row"},
          }}
        >
          <Typography
            component="div"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <Box className="arrival-typo">#New Arrival</Box>
            <Box className="h6-typo">New Winter Collection</Box>
            <Box className="h4-typo">
              Find the new collection in this <br />
              winter Season
            </Box>
            <button>Discover Now</button>
          </Typography>

          <img src={nike}></img>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div
          style={{
            display: "flex",
            textAlign: "left",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: {xs:"column",md:"column",lg:"row"},
            flexWrap:"wrap"

          }}
        >
          <Typography
            component="div"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <Box className="arrival-typo">#New Arrival</Box>
            <Box className="h6-typo">New Winter Collection</Box>
            <Box className="h4-typo">
              Find the new collection in this <br />
              winter Season
            </Box>
            <button>Discover Now</button>
          </Typography>
          <img src={nike}></img>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div
          style={{
            display: "flex",
            textAlign: "left",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: {xs:"column",md:"column",lg:"row"},
            flexWrap:"wrap"
          }}
        >
          <Typography
            component="div"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <Box className="arrival-typo">#New Arrival</Box>
            <Box className="h6-typo">New Winter Collection</Box>
            <Box className="h4-typo">
              Find the new collection in this <br />
              winter Season
            </Box>
            <button>Discover Now</button>
          </Typography>
          
          <img src={nike}></img>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSection;
