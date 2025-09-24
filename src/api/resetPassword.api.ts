"use server";


import {

  resetPasswordSchemaType,
} from "./../app/schema/resetPassword.schema";

export default async function setNewPassword(
  formValues: resetPasswordSchemaType
) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formValues.email,
        newPassword: formValues.newPassword,
      }),
    }
  );

  const payload = await res.json();
  return payload;
}
