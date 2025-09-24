"use client";
import GetLoggedUserWishlist from "@/api/getUserWishlist.api";
import RemoveProductFromWishlist from "@/api/removeFromWishlist.api";
import { WishlistProductType } from "@/types/wishlistProduct.type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddBtn from "../_components/AddBtn/AddBtn";
import Image from "next/image";

export default function Wishlist() {
  const [products, setProducts] = useState<WishlistProductType[]>([]);
  const [wishlistLoading, setwishlistLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removeLoading, setremoveLoading] = useState(false);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await GetLoggedUserWishlist();
        if (res.status === "success") {
          setProducts(res.data);
        } else {
          setError("Failed to load wishlist.");
        }
      } catch {
        setError("An error occurred while fetching your data.");
      } finally {
        setwishlistLoading(false);
      }
    }
    fetchWishlist();
  }, [removeLoading]);

  async function handleRemove(productId: string) {
    setremoveLoading(true);
    const res = await RemoveProductFromWishlist(productId);
    if (res.status === "success") {
      toast.success("Product was removed from your wishlist", {
        position: "top-center",
      });
    } else {
      toast.error("Couldn't remove product", { position: "top-center" });
    }
    setremoveLoading(false);
  }

  if (wishlistLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <h1 className="text-center text-3xl font-bold my-12 min-h-screen">
        {error}
      </h1>
    );

  if (products.length === 0)
    return (
      <h1 className="text-center text-3xl font-bold my-12 min-h-screen">
        Wishlist is empty
      </h1>
    );

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto my-12 min-h-screen">
      {/* Horizontal scroll for small screens */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden sm:flex">
        <table className="min-w-[700px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <Image
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.title}
                    width={500}
                    height={500}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-[250px]">
                    <h1 className="font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </h1>
                    <span className="text-gray-700">{product.brand.name}</span>
                    <p className="text-gray-500 my-2">{product.description}</p>
                    <div className="flex justify-between w-full items-center text-xs sm:text-md">
                      <span>Ratings: {product.ratingsQuantity}</span>
                      <span className="flex gap-0.5 items-center">
                        <i className="fas fa-star text-yellow-500"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.quantity > 0 ? (
                    <span>{product.quantity} Left</span>
                  ) : (
                    <span>Sold Out</span>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4 relative">
                  <button
                    disabled={removeLoading}
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-[15px] right-[15px] size-6 hover:border-gray-500 hover:text-gray-500 hover:border-2 hover:rounded-sm disabled:cursor-default text-primary font-semibold cursor-pointer disabled:text-gray-500 disabled:border-transparent"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <AddBtn id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout for <640px */}
      <div className="block sm:hidden mt-6 space-y-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <div className="flex gap-4">
              <Image
                src={product.imageCover}
                className="w-1/3 object-cover rounded"
                alt={product.title}
                width={500}
                height={500}
              />
              <div className="flex-1 w-2/3">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </h1>
                  <button
                    disabled={removeLoading}
                    onClick={() => handleRemove(product.id)}
                    className="size-6.5 hover:border-gray-500 hover:text-gray-500 hover:border-2 hover:rounded-sm disabled:cursor-default text-primary font-semibold cursor-pointer disabled:text-gray-500 disabled:border-transparent"
                  >
                    <i className="fa-solid fa-xmark fa-sm"></i>
                  </button>
                </div>

                <p className="text-gray-700 text-sm">{product.brand.name}</p>
                <p className="text-gray-500 my-2 text-sm">
                  {product.description}
                </p>

                <div className="flex justify-between mb-1">
                  <p className="text-gray-900 font-semibold ">
                    {product.price} EGP
                  </p>
                  {product.quantity > 0 ? (
                    <span className="text-gray-400 text-sm">
                      {product.quantity} Left
                    </span>
                  ) : (
                    <span>Sold Out</span>
                  )}
                </div>
                <div className="flex justify-between w-full items-center text-xs">
                  <span>Ratings: {product.ratingsQuantity}</span>
                  <span className="flex gap-0.5 items-center">
                    <i className="fas fa-star text-yellow-500"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm flex-col">
                  <AddBtn id={product.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
