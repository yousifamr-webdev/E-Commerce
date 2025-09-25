"use client";
import GetProductByCategory from "@/api/productByCategory.api";

import GetSubcategoriesOnCategory from "@/api/subCategoryOnCategory.api";

import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product.type";
import { SubCategoryType } from "@/types/subCategory.type";
import React, { useEffect, useState } from "react";

export default function SelectedCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isFilter, setIsFilter] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [CategoryProducts, setCategoryProducts] = useState<ProductType[]>([]);
  const [SubCategories, setSubCategories] = useState([]);
const [isLoading, setisLoading] = useState(true)


  async function fetchProductsInCategory() {

setisLoading(true)

    const { id } = await params;

    const SubCategoriesRes = await GetSubcategoriesOnCategory(id);

    const CategoryProductsRes = await GetProductByCategory(id);





    if (CategoryProductsRes.results === 0) {
      return (
        <h1 className="font-bold text-3xl flex justify-center items-center h-screen">
          No available products
        </h1>
      );
    } else {

      setCategoryProducts(CategoryProductsRes.data);
      setSubCategories(SubCategoriesRes.data);
      setisLoading(false)
    }
  }
  useEffect(() => {
    fetchProductsInCategory();
  }, []);

  const filtered = CategoryProducts.filter((product: ProductType) =>
    product.subcategory.some((sub) => sub._id === targetId)
  );

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
}



  return (
    <div className="min-h-screen">
      <div className="container w-[80%] mx-auto mt-12">
        <ul className="flex flex-wrap  gap-2 items-center">
          <li
            onClick={() => {
              setIsFilter(false);
              setTargetId("");
            }}
            className={`cursor-pointer px-4 py-2 rounded-full font-medium shadow-md transition-all duration-200 hover:bg-emerald-600 hover:text-white active:scale-95 ${
              isFilter == false
                ? "bg-emerald-500 text-white"
                : "bg-gray-200 text-primary"
            }`}
          >
            All
          </li>
          {SubCategories.map((subCategory: SubCategoryType, index: number) => (
            <React.Fragment key={subCategory._id}>
              <li
                onClick={() => {
                  setIsFilter(true);
                  setTargetId(subCategory._id);
                }}
                className={`cursor-pointer px-4 py-2 rounded-full font-medium shadow-md transition-all duration-200 hover:bg-emerald-600 hover:text-white active:scale-95 ${
                  targetId === subCategory._id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-primary"
                }`}
              >
                <span>{subCategory.name}</span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {isFilter ? (
            filtered.length === 0 ? (
              <div className="flex justify-center items-center text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                
                  No available products
                </h1>
              </div>
            ) : (
              filtered.map((currentProduct: ProductType) => (
                <SingleProduct
                  product={currentProduct}
                  key={currentProduct.id}
                />
              ))
            )
          ) : (
            CategoryProducts.map((currentProduct: ProductType) => (
              <SingleProduct product={currentProduct} key={currentProduct.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
