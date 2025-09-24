
import React from "react";
import GetProductDetails from "@/api/productDetails.api";
import DetailsComponent from "../../_components/DetailsComponent/DetailsComponent";

import { ProductType } from "@/types/product.type";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import GetProductByCategory from "@/api/productByCategory.api";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await GetProductDetails(id);

  if (!data) return <h1>No available products</h1>;

  const RelatedProducts = await GetProductByCategory(data.category._id);

  return (
    <>
      <DetailsComponent data={data} />

      <div className="container w-[90%] md:w-[80%] mx-auto my-12">
        <h1 className="text-gray-500 font-semibold text-3xl text-center md:text-start">
          Related Products:
        </h1>
        <div className="flex flex-wrap">
          {RelatedProducts.data.map((currentProduct: ProductType) => (
            <SingleProduct product={currentProduct} key={currentProduct.id} />
          ))}
        </div>
      </div>
    </>
  );
}
