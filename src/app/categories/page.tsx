
import getAllCategories from "@/api/allCategories.api";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const { data } = await getAllCategories();

  return (
    <>
      <div className="container w-[80%] mx-auto my-10 h-min-screen">
        <div className="flex flex-wrap">
          {data.map((category: CategoryType) => (
            <div key={category._id} className="p-2 w-full md:w-1/2 lg:w-1/4 xl:w-1/5 my-8">
              <div className="text-center hover:text-gray-500 p-0.5">
                <Link href={`/categories/${category._id}`}>
                  <Image
                    alt="productImage"
                    src={category.image}
                    className="w-full object-cover h-[200px]"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
