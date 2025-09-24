"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function GetLoggedUserWishlist() {
  
  try{  const token = await getMyToken();
  
  if (!token) {
    throw new Error("Please login to be able to do this action");
  }
  
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    }
  });
  
  const payload = await res.json();
  return payload;}catch(err){return err}
  

}
