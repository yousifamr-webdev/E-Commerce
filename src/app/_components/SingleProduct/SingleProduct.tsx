"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ProductType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";
import AddProductToWishlist from "@/api/addToWishlist.api";
import RemoveProductFromWishlist from "@/api/removeFromWishlist.api";
import { toast } from "sonner";
import Image from "next/image";

export default function SingleProduct({
  product,
  wishlistIds,
  setWishlistIds,
}: {
  product: ProductType;
  wishlistIds?: string[];
  setWishlistIds?: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);


  const isInWishlist = wishlistIds?.includes(product.id) ?? false;

  async function handleWishAction(productId: string) {

    if (!wishlistIds || !setWishlistIds) return;

    setIsLoading(true);
    try {
      if (isInWishlist) {
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        await RemoveProductFromWishlist(productId);
        toast.success("Product was removed from your wishlist", {
          position: "top-center",
        });
      } else {
        setWishlistIds((prev) => [...prev, productId]);
        const res = await AddProductToWishlist(productId);
        toast.success(res.message, { position: "top-center" });
      }
    } catch {
      toast.error("An unexpected error has occurred", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
      <div className="p-4">
        <Card className="gap-4">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-col gap-2"
          >
            <CardHeader>
              <CardTitle>
                <Image
                  width={500}
                  height={500}
                  src={product.imageCover}
                  alt="Product image"
                />
              </CardTitle>
              <CardDescription className="text-emerald-500">
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="font-bold">
              <p className="line-clamp-1">{product.title}</p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full items-center">
                <span>{product.price} EGP</span>
                <span className="flex gap-0.5 items-center">
                  <i className="fas fa-star text-yellow-500"></i>
                  {product.ratingsAverage}
                </span>
              </div>
            </CardFooter>
          </Link>

          <div className="flex items-center px-4 gap-3 w-full">
            <div className="w-full">
              <AddBtn id={product.id} />
            </div>
            <div>
              <button
                disabled={isLoading || !setWishlistIds}
                onClick={() => handleWishAction(product.id)}
                className={`border-2 rounded-full size-8 flex items-center justify-center cursor-pointer disabled:cursor-default disabled:border-gray-500 disabled:text-gray-500
      ${
        isInWishlist
          ? "border-red-500 text-red-500 hover:border-red-700 hover:text-red-700"
          : "border-primary text-primary hover:border-gray-500 hover:text-gray-500"
      }`}
              >
                <i
                  className={`fa-heart ${
                    isInWishlist ? "fa-solid" : "fa-regular"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
