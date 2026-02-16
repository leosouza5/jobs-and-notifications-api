import z from "zod";

export const enqueueDailySummaryReportEmailSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  date: z.string().min(1),
  tasksCompleted: z.number().int().nonnegative(),
  tasksPending: z.number().int().nonnegative(),
});
