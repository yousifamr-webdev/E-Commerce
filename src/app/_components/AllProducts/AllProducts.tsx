"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getProducts from "@/api/products.api";
import GetLoggedUserWishlist from "@/api/getUserWishlist.api";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default function AllProducts() {
  const { status } = useSession();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const p = await getProducts();
      setProducts(p);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      const w = await GetLoggedUserWishlist();
      setWishlistIds(w.data.map((item: { id: string }) => item.id));
    })();
  }, [status]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container w-[90%] md:w-[80%] mx-auto my-12">
      <div className="flex flex-wrap">
        {products.map((currentProduct) => (
          <SingleProduct
            key={currentProduct.id}
            product={currentProduct}
            wishlistIds={wishlistIds}
            setWishlistIds={setWishlistIds}
          />
        ))}
      </div>
    </div>
  );
}
