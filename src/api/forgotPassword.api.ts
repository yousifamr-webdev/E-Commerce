"use server";


import { forgotPasswordSchemaType } from "@/app/schema/forgotPassword.schema";


export default async function forgotPasswordResetCode(
  formValues: forgotPasswordSchemaType
) {

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ email: formValues.email }), 
    }
  );

  const payload = await res.json();
  return payload;
}
