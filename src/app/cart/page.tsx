"use client";
import clearCart from "@/CartActions/clearCartItem.action";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import RemoveItemFromCart from "@/CartActions/removeCartItem.action";
import UpdateCartQuantity from "@/CartActions/updateCartQuantity.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "@/types/cartProduct.type";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function Cart() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [totalPrice, settotalPrice] = useState(0);
  const [cartId, setcartId] = useState("");

  const context = useContext(CartContext);
  if (!context) throw new Error("Context undefined");
  const { numberOfCartItem, setnumberOfCartItem } = context;

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        setcartId(res.cartId);
        settotalPrice(res.data.totalCartPrice);
        setProducts(res.data.products);
      }
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  async function deleteProduct(id: string) {
    setGlobalLoading(true);
    const res = await RemoveItemFromCart(id);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Product was removed successfully", {
        position: "top-center",
      });
      getUserCart();
      let sum = 0;
      res.data.products.forEach((p: CartProductType) => (sum += p.count));
      setnumberOfCartItem(sum);
    } else toast.error("Couldn't remove product", { position: "top-center" });
    setGlobalLoading(false);
  }

  async function updateProduct(id: string, count: number, sign: string) {
    setcurrentId(id);
    setGlobalLoading(true);
    setloadingUpdate(true);
    const res = await UpdateCartQuantity(id, count);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Product quantity was updated", { position: "top-center" });
      setnumberOfCartItem(numberOfCartItem + (sign === "+" ? 1 : -1));
      getUserCart();
    } else toast.error("Failed to update quantity", { position: "top-center" });
    setloadingUpdate(false);
    setGlobalLoading(false);
  }

  async function clear() {
    setGlobalLoading(true);
    const res = await clearCart();
    if (res.message === "success") {
      setProducts([]);
      toast.success("Cart was cleared", { position: "top-center" });
      setnumberOfCartItem(0);
    } else toast.error("Failed to clear cart", { position: "top-center" });
    setGlobalLoading(false);
  }

  if (products.length === 0)
    return (
      <h1 className="text-center text-3xl font-bold my-12 min-h-screen">
        Cart is empty
      </h1>
    );

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto my-12 min-h-screen">
      {/* ---------- Desktop Table (≥640px) ---------- */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden sm:flex">
        <table className="min-w-[700px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
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
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                    width={500}
                    height={500}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {/* - */}
                    <button
                      disabled={globalLoading}
                      onClick={() =>
                        updateProduct(
                          product.product.id,
                          product.count - 1,
                          "-"
                        )
                      }
                      className="disabled:bg-gray-300 inline-flex items-center justify-center p-1 me-3 h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 18 2">
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    {product.product.id === currentId && loadingUpdate ? (
                      <div className="fa-solid fa-spin fa-spinner"></div>
                    ) : (
                      <span>{product.count}</span>
                    )}

                    {/* + */}
                    <button
                      disabled={globalLoading}
                      onClick={() =>
                        updateProduct(
                          product.product.id,
                          product.count + 1,
                          "+"
                        )
                      }
                      className="disabled:bg-gray-300 inline-flex items-center justify-center p-1 ms-3 h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 18 18">
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price * product.count} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={globalLoading}
                    onClick={() => deleteProduct(product.product.id)}
                    className="text-red-500 font-semibold hover:underline disabled:text-gray-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards (<640px) ---------- */}
      <div className="block sm:hidden mt-6 space-y-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <div className="flex gap-4">
              <Image
                src={product.product.imageCover}
                className="w-1/3 object-cover rounded"
                alt={product.product.title}
                width={500}
                height={500}
              />
              <div className="flex-1 w-2/3">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </h1>
                  <button
                    disabled={globalLoading}
                    onClick={() => deleteProduct(product.product.id)}
                    className="size-6 hover:text-red-500 disabled:text-gray-500"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <p className="mt-2 text-gray-900 font-semibold">
                  {product.price * product.count} EGP
                </p>

                {/* Quantity controls */}
                <div className="flex items-center mt-2">
                  <button
                    disabled={globalLoading}
                    onClick={() =>
                      updateProduct(product.product.id, product.count - 1, "-")
                    }
                    className="disabled:bg-gray-300 inline-flex items-center justify-center p-1 me-3 h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>

                  {product.product.id === currentId && loadingUpdate ? (
                    <div className="fa-solid fa-spin fa-spinner"></div>
                  ) : (
                    <span>{product.count}</span>
                  )}

                  <button
                    disabled={globalLoading}
                    onClick={() =>
                      updateProduct(product.product.id, product.count + 1, "+")
                    }
                    className="disabled:bg-gray-300 inline-flex items-center justify-center p-1 ms-3 h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 18 18">
                      <path
                        stroke="currentColor"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Cart Actions ---------- */}
      <div className="flex justify-end my-6 gap-3">
        <Button
          disabled={globalLoading}
          onClick={clear}
          className="bg-red-500 hover:bg-red-600"
        >
          Clear Cart
        </Button>

        <AlertDialog>
          <AlertDialogTrigger className="bg-blue-600 rounded-md text-sm font-medium hover:bg-blue-700 text-white py-2 px-4">
            CheckOut
            <Badge className="h-5 min-w-5 rounded-full px-1 ms-2 font-semibold bg-gray-200 text-black">
              {totalPrice} EGP
            </Badge>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Choose your payment method :</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-col gap-3">
              <Link href={`/checkout/cashPayment/${cartId}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  (COD) Cash on delivery
                </Button>
              </Link>
              <Link href={`/checkout/onlinePayment/${cartId}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Pay with Creditcard
                </Button>
              </Link>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
