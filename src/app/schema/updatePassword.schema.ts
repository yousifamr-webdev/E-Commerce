import * as z from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("This field can't be empty")
      .min(6, "Min length is 6 chars")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    password: z
      .string()
      .nonempty("This field can't be empty")
      .min(6, "Min length is 6 chars")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    rePassword: z
      .string()
      .nonempty("This field can't be empty")
      .min(6, "Min length is 6 chars")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
  });

export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
