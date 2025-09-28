"use client";
import AddToCart from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const { data: session } = useSession();
  const context = useContext(CartContext)
  if (!context) throw new Error("Context undefined")
  
  const { numberOfCartItem, setnumberOfCartItem } = context;

  async function checkAddProduct(id: string) {
   
    if (!session) {
         return toast.error("You must be logged in to perform this action.", {
           position: "top-center",
         });
       }
   
   
   
    const res = await AddToCart(id);



    if (res.status === "success") {
      toast.success("Product added successfully", { position: "top-center" });
      setnumberOfCartItem(numberOfCartItem + 1);
    } else {
      toast.error("Couldn't add product", {
        position: "top-center",
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        className="w-full cursor-pointer"
      >
        Add To Cart
      </Button>
    </>
  );
}
