import React, { useContext, useState, useEffect } from "react";
import HomeContext from "../context/HomeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
function HomeAdds() {
  const url = "http://localhost:3000/ads/myAds";
  const [homeInfo, setHomeInfo] = useState(null);
  async function getAds() {
    try {
      const response = await axios.get(url);
      setHomeInfo(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAds();
  }, []);
  console.log(homeInfo);
  const Ads = homeInfo?.map((ad, i) => (
    <SwiperSlide key={i} className="flex justify-center items-center ">
      <img src={ad.Ad} alt="" className="h-[80%] w-[80%] " />
    </SwiperSlide>
  ));

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        loop:true
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper  .md:h-[300px] lg:h-[500px]"
    >
      {Ads}
    </Swiper>
  );
}

export default HomeAdds;
