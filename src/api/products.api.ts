"use server"


export default async function getProducts(params?:string) {
  const urlParams = params || ""  
  
  const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${urlParams}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const { data } = await response.json();
    
    
    return data;
}
