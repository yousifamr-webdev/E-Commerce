"use server"

import getMyToken from "@/utilities/getMyToken"

export default async function UpdateCartQuantity(id:string, count:number) {
    

    const token = await getMyToken();
    if(!token) throw new Error("Please login to do this action")

const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "PUT",
        headers: {
            token, "Content-Type": "application/json"
        },
        body: JSON.stringify({count})
      
  }
);

    const payload = await res.json()
    return payload
    
}