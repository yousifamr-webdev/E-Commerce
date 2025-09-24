"use server";


export default async function getAllOrders(userId:string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
  );
  const data = await response.json();
  console.log(data)

  return data;
}
