import * as z from "zod"


export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("This field can't be empty")
      .min(2, "")
      .max(10, ""),
    email: z
      .email()
      .nonempty("This field can't be empty")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z
      .string()
      .nonempty("This field can't be empty")
      .min(6, "Min length is 6 chars")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    rePassword: z.string().nonempty("This field can't be empty"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
  });


export type registerSchemaType = z.infer<typeof registerSchema>