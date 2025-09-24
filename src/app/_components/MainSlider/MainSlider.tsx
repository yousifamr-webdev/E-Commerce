"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Img1 from "../../../assests/img1.jpg"
import Img2 from "../../../assests/img2.jpg"
import Img3 from "../../../assests/img3.jpg"
import Img4 from "../../../assests/img4.jpg"
import Img5 from "../../../assests/img5.jpg"




export default function MainSlider() {
  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col lg:flex-row lg:flex-wrap mt-10">
        <div className="w-full lg:w-3/4">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 6000 }}
            loop={true}
          >
            <SwiperSlide>
              <Image
                alt="productImage"
                src={Img1}
                className="w-full object-cover h-[200px] md:h-[400px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                alt="productImage"
                src={Img2}
                className="w-full object-cover h-[200px] md:h-[400px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                alt="productImage"
                src={Img3}
                className="w-full object-cover h-[200px] md:h-[400px]"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full lg:w-1/4 flex lg:flex-col">
          <Image
            alt="productImage"
            src={Img4}
            className="w-1/2 lg:w-full object-cover h-[100px] md:h-[200px]"
          />
          <Image
            alt="productImage"
            src={Img5}
            className="w-1/2 lg:w-full object-cover h-[100px] md:h-[200px]"
          />
        </div>
      </div>
    </>
  );
}
