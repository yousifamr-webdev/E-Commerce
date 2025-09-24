import * as z from "zod";

export const resetCodeSchema = z.object({
  resetCode: z.string().min(6, "Code must be at least 6 digits")
 
});

export type resetCodeSchemaType = z.infer<typeof resetCodeSchema>;
