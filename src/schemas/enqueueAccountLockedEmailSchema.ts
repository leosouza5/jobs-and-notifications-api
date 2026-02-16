import z from "zod";

export const enqueueAccountLockedEmailSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
});
