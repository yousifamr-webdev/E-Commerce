"use server";

export default async function GetProductByCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
    {
      method: "GET",
    }
  );
  const payload = await res.json();
  return payload;
}
