"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { CategoryType } from "@/types/category.type";
import Link from "next/link";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {

  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <h1 className="text-slate-500 font-semibold my-2">
          Shop Popular Categories
        </h1>
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 2 }, // phones
            640: { slidesPerView: 3 }, // small tablets
            768: { slidesPerView: 4 }, // tablets
            1024: { slidesPerView: 5 }, // small desktops
            1280: { slidesPerView: 7 }, // large desktops
          }}
        >
          {data.map((category: CategoryType) => (
            <SwiperSlide key={category._id} className="text-center">
              <Link href={`/categories/${category._id}`}>
                <Image
                  alt="productImage"
                  src={category.image}
                  className="w-full object-cover h-[100px] md:h-[150px]"
                  width={500}
                  height={500}
                />
              </Link>
              <Link
                href={`/categories/${category._id}`}
                className="text-center font-bold"
              >
                {category.name}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
