import { z } from "zod";

// Making a scheme for the product form
const bulletPointSchema = z.object({
  id: z.number(),
  text: z.string(),
});
export const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    bulletPoints: z.array(bulletPointSchema).optional(),
    keywords: z.array(z.string()).optional(),
  });

export type FormValues = z.infer<typeof schema>;
