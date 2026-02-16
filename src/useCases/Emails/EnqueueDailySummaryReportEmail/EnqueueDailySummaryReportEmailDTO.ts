export interface EnqueueDailySummaryReportEmailDTO {
  email: string;
  name: string;
  date: string;
  tasksCompleted: number;
  tasksPending: number;
}
