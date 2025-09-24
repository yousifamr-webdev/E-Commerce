"use server";


import { resetCodeSchemaType } from "@/app/schema/resetCode.schema";


export default async function verifyResetCode(
  formValues: resetCodeSchemaType
) {

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode: formValues.resetCode }),
    }
  );

  const payload = await res.json();
  return payload;
}
