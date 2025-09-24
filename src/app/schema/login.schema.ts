import * as z from "zod";

export const loginSchema = z.object({
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
});

export type loginSchemaType = z.infer<typeof loginSchema>;
