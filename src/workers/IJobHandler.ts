export interface IJobHandler {
  execute(data: unknown): Promise<void>
}