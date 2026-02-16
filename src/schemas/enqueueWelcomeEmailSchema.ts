import z from "zod";

export const enqueueWelcomeEmailSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
})