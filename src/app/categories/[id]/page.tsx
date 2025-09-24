import GetProductByCategory from "@/api/productByCategory.api";

import GetSubcategoriesOnCategory from "@/api/subCategoryOnCategory.api";

import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product.type";
import { SubCategoryType } from "@/types/subCategory.type";
import React from "react";

export default async function SelectedCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const SubCategories = await GetSubcategoriesOnCategory(id);

  const CategoryProducts = await GetProductByCategory(id);

  if (CategoryProducts.results === 0)
    return (
      <h1 className="font-bold text-3xl flex justify-center items-center h-screen">
        No available products
      </h1>
    );

  return (
    <>
      <div className="container w-[80%] mx-auto mt-12">
        <ul className="flex flex-wrap gap-6 items-center">
          {SubCategories.data.map(
            (subCategory: SubCategoryType, index: number) => (
              <React.Fragment key={subCategory._id}>
                {index !== 0 && (
                  <li className="flex items-center h-8">
                    <Separator orientation="vertical" />
                  </li>
                )}
                <li className="font-bold text-2xl hover:text-gray-500">
                  <span>{subCategory.name}</span>
                </li>
              </React.Fragment>
            )
          )}
        </ul>
      </div>

      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {CategoryProducts.data.map((currentProduct: ProductType) => (
            <SingleProduct product={currentProduct} key={currentProduct.id} />
          ))}
        </div>
      </div>
    </>
  );
}
