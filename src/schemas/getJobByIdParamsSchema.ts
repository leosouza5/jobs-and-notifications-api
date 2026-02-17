import z from "zod";

export const getJobByIdParamsSchema = z.object({
  jobId: z.uuid(),
});
