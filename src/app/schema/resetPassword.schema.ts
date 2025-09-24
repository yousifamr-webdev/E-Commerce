import * as z from "zod"


export const resetPasswordSchema = z
  .object({

    email: z
      .email()
      .nonempty("This field can't be empty")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    newPassword: z
      .string()
      .nonempty("This field can't be empty")
      .min(6, "Min length is 6 chars")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),

  })




export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>