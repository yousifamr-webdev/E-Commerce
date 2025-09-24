import getAllBrands from "@/api/allBrands.api";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const { data } = await getAllBrands();

  return (
    <>
      <div className="container w-[80%] mx-auto my-10 h-min-screen">
        <div className="flex flex-wrap">
          {data.map((brand: CategoryType) => (
            <div key={brand._id} className="p-2 w-full md:w-1/2 lg:w-1/4 xl:w-1/5 my-8">
              <div className="text-center hover:text-gray-500 p-0.5">
                <Link href={`/brands/${brand._id}`}>
                  <Image
                    alt="productImage"
                    src={brand.image}
                    className="w-full object-cover"
                    width={500}
                    height={500}
                  />
                </Link>
                <Link
                  href={`/brands/${brand._id}`}
                  className="text-center font-bold"
                >
                  {brand.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
