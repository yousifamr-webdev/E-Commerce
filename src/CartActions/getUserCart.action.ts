"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login to access your cart");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
    
    
    const payload = await res.json()
    return payload;
}
