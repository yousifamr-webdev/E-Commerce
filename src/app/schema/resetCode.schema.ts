import * as z from "zod";

export const resetCodeSchema = z.object({
  resetCode: z.string().min(1, "Input can't be empty")
 
});

export type resetCodeSchemaType = z.infer<typeof resetCodeSchema>;
