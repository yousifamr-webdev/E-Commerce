"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function RemoveItemFromCart(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please login to do this action");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

    const payload = await res.json()
    return payload;


}
