"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function AddToCart(id: string) {
try{  const token = await getMyToken();

if (!token) {
  throw new Error("Please login to be able to do this action");
}

const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
  method: "POST",
  headers: {
    token,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ productId: id }),
});

const payload = await res.json();
return payload;}catch(err){return err}
}
