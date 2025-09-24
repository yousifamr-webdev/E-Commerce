import * as z from "zod"


export const updateInfoSchema = z.object({
  name: z.string().nonempty("This field can't be empty").min(2, "").max(10, ""),
  email: z
    .email()
    .nonempty("This field can't be empty")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),

  phone: z.string().regex(/^01[0125][0-9]{8}$/),
});



export type updateInfoSchemaType = z.infer<typeof updateInfoSchema>;