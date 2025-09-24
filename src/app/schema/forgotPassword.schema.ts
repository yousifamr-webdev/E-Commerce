import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email().nonempty("This field can't be empty").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
 
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
