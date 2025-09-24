"use server";

export default async function GetSubcategoriesOnCategory(categoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data;
}
