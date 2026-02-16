import z from "zod";

export const enqueueResetPasswordEmailSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  code: z.string().min(1),
})