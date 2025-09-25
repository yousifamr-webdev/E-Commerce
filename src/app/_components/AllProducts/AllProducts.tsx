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
  const [page, setpage] = useState(1)

  async function fetchProducts(params?:string) {
    const p = await getProducts(params);
    setProducts(p);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
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
      <ul className="flex justify-center items-center gap-3 mt-8">
        <li
          onClick={() => {
            fetchProducts("?page=1");
            setpage(1)
            window.scrollTo({ top: 500, behavior: "smooth" });

                 }}
          className={`cursor-pointer px-4 py-2 rounded-full text-white font-medium shadow-md transition-all duration-200 hover:bg-emerald-600 active:scale-95 ${page === 1 ? "bg-emerald-500":"bg-gray-200" }`} >
          1
        </li>
        <li
          onClick={() => {
            fetchProducts("?page=2");
            setpage(2)
            window.scrollTo({ top: 500, behavior: "smooth" });
          }}
          className={`cursor-pointer px-4 py-2 rounded-full  text-gray-800 font-medium shadow-md transition-all duration-200 hover:bg-emerald-500 hover:text-white active:scale-95 ${page === 2 ? "bg-emerald-500" : "bg-gray-200"}  `}
        >
          2
        </li>
      </ul>
    </div>
  );
}
